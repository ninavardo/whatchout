import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useNavigate } from "react-router";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import schema from "../validations/RegisterValidation";
import { useAuth } from "../context/useAuth";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";
import { createToken, inputClass } from "../helpers/formHelpers";

const Register = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { terms: false },
  });

  if (user) return <Navigate to="/watchlist" replace />;

  const passwordEvents = (name) =>
    register(name, { onBlur: () => setPasswordFocused(false) });

  const onSubmit = async (data) => {
    setServerError("");
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const taken = accounts.some(
      (item) => item.username.toLowerCase() === data.username.toLowerCase(),
    );

    if (taken) {
      setError("username", { message: "This username is already taken" });
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/users/add", {
        firstName: data.firstName,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      const newAccount = {
        id: response.data.id,
        firstName: data.firstName,
        username: data.username,
        email: data.email,
        password: data.password,
      };
      localStorage.setItem("accounts", JSON.stringify([...accounts, newAccount]));

      login(
        { username: data.username, firstName: data.firstName, email: data.email },
        createToken(data.username),
      );
      navigate("/watchlist");
    } catch (error) {
      console.log(error);
      setServerError("Could not create the account. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Join watchout."
      subtitle="Save movies, mark what you've seen, never forget a title again."
      eyesClosed={passwordFocused && !isVisible}
    >
      <h2 className="text-3xl font-extrabold">Create account</h2>
      <p className="mt-1 text-[#1E1B4B]/60">
        Already have one?{" "}
        <Link to="/login" className="font-bold text-[#06A77D] underline underline-offset-4">
          Log in
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="firstName" label="Name" error={errors.firstName}>
            <input
              id="firstName"
              {...register("firstName")}
              type="text"
              placeholder="Nina"
              autoComplete="given-name"
              className={inputClass(errors.firstName)}
            />
          </FormField>
          <FormField id="regUsername" label="Username" error={errors.username}>
            <input
              id="regUsername"
              {...register("username")}
              type="text"
              placeholder="movie_lover"
              autoComplete="username"
              className={inputClass(errors.username)}
            />
          </FormField>
        </div>

        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="you@mail.com"
            autoComplete="email"
            className={inputClass(errors.email)}
          />
        </FormField>

        <FormField id="regPassword" label="Password" error={errors.password}>
          <div className="relative">
            <input
              id="regPassword"
              {...passwordEvents("password")}
              onFocus={() => setPasswordFocused(true)}
              type={isVisible ? "text" : "password"}
              placeholder="8+ characters, 1 uppercase, 1 number"
              autoComplete="new-password"
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

        <FormField id="confirmPassword" label="Repeat password" error={errors.confirmPassword}>
          <input
            id="confirmPassword"
            {...passwordEvents("confirmPassword")}
            onFocus={() => setPasswordFocused(true)}
            type={isVisible ? "text" : "password"}
            placeholder="one more time"
            autoComplete="new-password"
            className={inputClass(errors.confirmPassword)}
          />
        </FormField>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              {...register("terms")}
              type="checkbox"
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#06A77D]"
            />
            <span>
              I promise to actually watch the movies I add, not just collect
              them.
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1.5 text-sm font-semibold text-[#E63946]">{errors.terms.message}</p>
          )}
        </div>

        {serverError && (
          <p className="rounded-2xl bg-[#E63946]/10 p-3 text-sm font-semibold text-[#E63946]">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#1E1B4B] bg-[#06A77D] py-3.5 text-lg font-extrabold text-[#FFF7E8] shadow-[3px_3px_0_0_#1E1B4B] transition enabled:hover:translate-x-0.5 enabled:hover:translate-y-0.5 enabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-[#1E1B4B]/30"
        >
          {isSubmitting && <Loader2 size={20} className="animate-spin" />}
          {isSubmitting ? "Creating..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
