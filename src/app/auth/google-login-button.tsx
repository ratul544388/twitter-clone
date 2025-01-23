"use client";

import { loginWithGoogle } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const GoogleLoginButton = () => {
  return (
    <Button
      disabled
      type="button"
      variant="outline"
      onClick={async () => await loginWithGoogle()}
    >
      <FcGoogle className="size-4" />
      Continue with Google
    </Button>
  );
};
