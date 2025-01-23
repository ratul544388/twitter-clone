import { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return <LoginForm className="border rounded-md px-6 py-8 shadow-md"/>
};

export default LoginPage;
