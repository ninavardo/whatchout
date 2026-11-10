import { boolean, object, ref, string } from "yup";

const schema = object({
  firstName: string()
    .required("Tell us your name")
    .min(2, "Name is too short"),

  username: string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and _ are allowed"),

  email: string()
    .required("Email is required")
    .email("This email doesn't look right")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "This email doesn't look right"),

  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Add at least one uppercase letter")
    .matches(/[0-9]/, "Add at least one number"),

  confirmPassword: string()
    .required("Please repeat your password")
    .oneOf([ref("password")], "Passwords don't match"),

  terms: boolean().oneOf([true], "You have to agree first"),
});

export default schema;
