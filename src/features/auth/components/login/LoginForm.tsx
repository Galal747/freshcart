"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconAlertCircle,
  IconBrandFacebook,
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
  IconLockFilled,
  IconMail,
  IconStarFilled,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSchema, LoginValues } from "../../schemas/login.schema";
import { useRouter } from "next/navigation";
import { loginAction } from "../../server/login.actions";
import { setToken } from "../../server/auth.actions";
import { authAction } from "../../slices/auth.slice";
import { toast } from "sonner";

const NETWORK_ERROR_MESSAGE =
  "We couldn't reach the server. Please check your connection and try again.";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginValues> = async function (values) {
    clearErrors("root");

    try {
      const response = await loginAction(values);

      if (response.success) {
        await setToken(response.data.token, response.data.user.email);

        dispatch(
          authAction.setAuthStates({
            isAuthenticated: true,
            userInfo: response.data.user,
          }),
        );

        toast.success(response.message);
        router.push("/");
        return;
      }

      if (response.fieldErrors) {
        for (const [key, messages] of Object.entries(response.fieldErrors)) {
          setError(key as keyof LoginValues, { message: messages?.[0] });
        }
      }

      setError("root", { message: response.message });
      toast.error(response.message);
    } catch {
      setError("root", { message: NETWORK_ERROR_MESSAGE });
      toast.error(NETWORK_ERROR_MESSAGE);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <IconBrandGoogleFilled className="text-red-500 text-lg" />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <IconBrandFacebook stroke={2} className="text-blue-600 text-lg" />

            <span className="font-medium text-gray-700">
              Continue with Facebook
            </span>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </span>
          </div>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          {errors.root?.message && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <IconAlertCircle size={18} className="mt-0.5 shrink-0" />
              <p className="font-medium">{errors.root.message}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                autoComplete="email"
                className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all ${
                  errors.email ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Enter your email"
                id="email"
                {...register("email")}
              />
              <IconMail
                stroke={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors.email && (
              <div className="mt-2 bg-red-100 text-red-800 px-3 py-1 rounded-md">
                <p>*{errors.email.message}</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                className={`w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all ${
                  errors.password ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Enter your password"
                {...register("password")}
              />
              <IconLockFilled className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <IconEyeOff stroke={2} />
                ) : (
                  <IconEye stroke={2} />
                )}
              </button>
            </div>

            {errors.password && (
              <div className="mt-2 bg-red-100 text-red-800 px-3 py-1 rounded-md">
                <p>*{errors.password.message}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Keep me signed in
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">
            New to FreshCart?
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
            >
              Create an account
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center">
            <IconLockFilled className="mr-1" />
            SSL Secured
          </div>
          <div className="flex items-center">
            <IconUsers stroke={2} className="mr-1" />
            50K+ Users
          </div>
          <div className="flex items-center">
            <IconStarFilled className="mr-1" />
            4.9 Rating
          </div>
        </div>
      </div>
    </div>
  );
}