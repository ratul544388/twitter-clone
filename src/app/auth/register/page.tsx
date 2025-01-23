import { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Register",
};

const page = () => {
  return <RegisterForm className="rounded-md border px-6 py-8 shadow-md" />;
};

export default page;
