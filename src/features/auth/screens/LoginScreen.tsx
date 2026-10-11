import LoginForm from "../components/login/LoginForm";
import LoginHero from "../components/login/LoginHero";

export default function LoginScreen() {
  return (
    <>
      <div className="container py-8 md:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
        <div className="order-2 lg:order-1 min-w-0 w-full max-w-xl mx-auto lg:max-w-none">
          <LoginHero />
        </div>
        <div className="order-1 lg:order-2 min-w-0 w-full max-w-xl mx-auto lg:max-w-none">
          <LoginForm />
        </div>
      </div>
    </>
  );
}