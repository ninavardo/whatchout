import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import schema from "../validations/LoginValidation";
import { useAuth } from "../context/useAuth";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import { createToken, inputClass } from "../helpers/formHelpers";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [serverError, setServerError] = useState("");
  const from = location.state?.from || "/watchlist";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (data) => {
    setServerError("");
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const account = accounts.find(
      (item) =>
        item.username.toLowerCase() === data.username.toLowerCase() &&
        item.password === data.password,
    );

    try {
      if (account) {
        login(
          {
            username: account.username,
            firstName: account.firstName,
            email: account.email,
          },
          createToken(account.username),
        );
      } else {
        const response = await axios.post("https://dummyjson.com/auth/login", {
          username: data.username,
          password: data.password,
        });
        localStorage.setItem("refreshToken", response.data.refreshToken);
        login(
          {
            username: response.data.username,
            firstName: response.data.firstName,
            email: response.data.email,
          },
          response.data.accessToken,
        );
      }
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setServerError("Wrong username or password. Try again.");
    }
  };

  const fillDemo = () => {
    setValue("username", "emilys", { shouldValidate: true });
    setValue("password", "emilyspass", { shouldValidate: true });
  };

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Your watchlist missed you."
      eyesClosed={passwordFocused && !isVisible}
    >
      <h2 className="text-3xl font-extrabold">Log in</h2>
      <p className="mt-1 text-[#1E1B4B]/60">
        New here?{" "}
        <Link to="/register" className="font-bold text-[#FF5A36] underline underline-offset-4">
          Create an account
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <FormField id="username" label="Username" error={errors.username}>
          <input
            id="username"
            {...register("username")}
            type="text"
            placeholder="your username"
            autoComplete="username"
            className={inputClass(errors.username)}
          />
        </FormField>

        <FormField id="password" label="Password" error={errors.password}>
          <div className="relative">
            <input
              id="password"
              {...register("password", {
                onBlur: () => setPasswordFocused(false),
              })}
              onFocus={() => setPasswordFocused(true)}
              type={isVisible ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`${inputClass(errors.password)} pr-12`}
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
            >
              {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </FormField>

        {serverError && (
          <p className="rounded-2xl bg-[#FF5A36]/10 p-3 text-sm font-semibold text-[#FF5A36]">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#1E1B4B] bg-[#FF5A36] py-3.5 text-lg font-extrabold text-[#FFF7E8] shadow-[3px_3px_0_0_#1E1B4B] transition enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-[#1E1B4B]/30"
        >
          {isSubmitting && <Loader2 size={20} className="animate-spin" />}
          {isSubmitting ? "Checking..." : "Log in"}
        </button>
      </form>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-[#1E1B4B]/30 p-4 text-sm">
        <p className="text-[#1E1B4B]/70">
          Just want to look around? Use the test account from DummyJSON.
        </p>
        <button
          type="button"
          onClick={fillDemo}
          className="mt-2 cursor-pointer font-bold text-[#1E1B4B] underline decoration-[#FFD166] decoration-4 underline-offset-2"
        >
          Fill test account
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
