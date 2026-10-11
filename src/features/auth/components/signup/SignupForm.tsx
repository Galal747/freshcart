"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signupSchema, SignupValues } from "../../schemas/signup.schema";
import { signupAction } from "../../server/signup.actions";


const FORM_FIELDS: readonly (keyof SignupValues)[] = [
  "name",
  "email",
  "password",
  "rePassword",
  "phone",
  "terms",
];

const EMAIL_EXISTS_MESSAGE =
  "An account with this email already exists. Please sign in instead.";
const PHONE_EXISTS_MESSAGE =
  "An account with this phone number already exists. Please use another one.";
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
const NETWORK_ERROR_MESSAGE =
  "We couldn't reach the server. Please check your connection and try again.";

function isFormField(key: string): key is keyof SignupValues {
  return (FORM_FIELDS as readonly string[]).includes(key);
}

function isAlreadyExistsMessage(message?: string) {
  return /already|exist|taken|registered|duplicate|in use/i.test(message ?? "");
}

function isPhoneMessage(message?: string) {
  return /phone|mobile/i.test(message ?? "");
}


function ErrorMessage({
  message,
  children,
}: {
  message?: string;
  children?: ReactNode;
}) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-center gap-2 px-3 py-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0 text-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <p className="font-medium">
        {message}
        {children}
      </p>
    </div>
  );
}


function getPasswordStrength(password: string) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[@#$%^&*!_]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  if (!password) return { percent: 0, label: "", color: "bg-gray-200" };
  if (score <= 2) return { percent: 30, label: "Weak", color: "bg-red-500" };
  if (score === 3)
    return { percent: 55, label: "Fair", color: "bg-orange-500" };
  if (score === 4)
    return { percent: 80, label: "Good", color: "bg-yellow-500" };
  return { percent: 100, label: "Strong", color: "bg-green-500" };
}


export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    formState,
    handleSubmit,
    watch,
    setError,
    getValues,
    trigger,
  } = useForm<SignupValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
  });

  const { errors, isSubmitting } = formState;
  const strength = getPasswordStrength(watch("password"));

  const handlePasswordChange = () => {
    if (getValues("rePassword")) {
      void trigger("rePassword");
    }
  };

  const handleRegister: SubmitHandler<SignupValues> = async function (values) {
    try {
      const response = await signupAction(values);

      if (response.success) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/login");
        return;
      }

      let handledOnField = false;
      let toastMessage = response.message || GENERIC_ERROR_MESSAGE;

      if (response.fieldErrors) {
        for (const [key, messages] of Object.entries(response.fieldErrors)) {
          const rawMessage = Array.isArray(messages) ? messages[0] : messages;
          if (!rawMessage) continue;

          if (isFormField(key)) {
            let fieldMessage = rawMessage;
            let type = "server";

            if (key === "email" && isAlreadyExistsMessage(rawMessage)) {
              fieldMessage = EMAIL_EXISTS_MESSAGE;
              type = "exists";
              toastMessage = EMAIL_EXISTS_MESSAGE;
            } else if (key === "phone" && isAlreadyExistsMessage(rawMessage)) {
              fieldMessage = PHONE_EXISTS_MESSAGE;
              toastMessage = PHONE_EXISTS_MESSAGE;
            }

            setError(
              key,
              { type, message: fieldMessage },
              { shouldFocus: !handledOnField },
            );
            handledOnField = true;
          }
        }
      }

      if (!handledOnField && isAlreadyExistsMessage(response.message)) {
        if (isPhoneMessage(response.message)) {
          setError(
            "phone",
            { type: "exists", message: PHONE_EXISTS_MESSAGE },
            { shouldFocus: true },
          );
          toastMessage = PHONE_EXISTS_MESSAGE;
        } else {
          setError(
            "email",
            { type: "exists", message: EMAIL_EXISTS_MESSAGE },
            { shouldFocus: true },
          );
          toastMessage = EMAIL_EXISTS_MESSAGE;
        }
        handledOnField = true;
      }

      if (!handledOnField) {
        setError("root.serverError", {
          type: "server",
          message: response.message || GENERIC_ERROR_MESSAGE,
        });
      }

      toast.error(toastMessage);
    } catch (error) {
      console.error("Signup failed:", error);
      setError("root.serverError", {
        type: "network",
        message: NETWORK_ERROR_MESSAGE,
      });
      toast.error(NETWORK_ERROR_MESSAGE);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>
        </div>

        <form
          className="space-y-5 sm:space-y-7"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ali"
              autoComplete="name"
              id="name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            <ErrorMessage message={errors.name?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              placeholder="ali@example.com"
              autoComplete="email"
              id="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <ErrorMessage message={errors.email?.message}>
              {errors.email?.type === "exists" && (
                <>
                  {" "}
                  <Link
                    href="/login"
                    className="underline font-semibold text-primary-600"
                  >
                    Sign in instead
                  </Link>
                </>
              )}
            </ErrorMessage>
          </div>

          <div className="flex bg-light flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="create a strong password"
              autoComplete="new-password"
              id="password"
              aria-invalid={!!errors.password}
              {...register("password", { onChange: handlePasswordChange })}
            />

            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                  <div
                    className={`progress h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.percent}%` }}
                  ></div>
                </div>
                <span>{strength.label}</span>
              </div>
            </div>

            <ErrorMessage message={errors.password?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm your password"
              autoComplete="new-password"
              id="rePassword"
              aria-invalid={!!errors.rePassword}
              {...register("rePassword")}
            />
            <ErrorMessage message={errors.rePassword?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="01012345678"
              autoComplete="tel"
              id="phone"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            <ErrorMessage message={errors.phone?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 mt-1 shrink-0 accent-primary-600"
                aria-invalid={!!errors.terms}
                {...register("terms")}
              />
              <label htmlFor="terms" className="ms-2 text-sm sm:text-base">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
            <ErrorMessage message={errors.terms?.message} />
          </div>

          <ErrorMessage message={errors.root?.serverError?.message} />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 w-full"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <IconUserPlus stroke={2} />
                <span>Create My Account</span>
              </>
            )}
          </button>
        </form>

        <p className="border-t pt-6 sm:pt-10 border-gray-300/30 mt-6 mb-2 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}