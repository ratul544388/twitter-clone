"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { register } from "@/actions/users";
import { FormError } from "@/components/form-error";
import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/hooks/use-modal-store";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { registerSchema, registerValues } from "@/lib/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { GoogleLoginButton } from "../google-login-button";
import { OrSeparator } from "../or-separator";

export const RegisterForm = ({ className }: { className?: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { isOpen, onOpen, type, onClose } = useModalStore();
  const [error, setError] = useState<string | undefined>();
  const form = useForm<registerValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(() => {
      register(values).then(({ error }) => {
        if (error) {
          return setError(error);
        }
        router.push(DEFAULT_LOGIN_REDIRECT);
        router.refresh();
        onClose();
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex w-full max-w-[480px] flex-col", className)}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold">Join Twitter Today!</h2>
          <p className="text-muted-foreground">
            Sign up to connect and share your voice.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
                    autoFocus
                    label="Enter Your Full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
                    label="Enter Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    disabled={isPending}
                    label="Enter Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      disabled={isPending}
                      label="Enter Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError error={error} />
          </div>
          <LoadingButton isLoading={isPending} className="mt-2 w-full">
            Register
          </LoadingButton>
        </div>
        <OrSeparator className="my-10"/>
        <GoogleLoginButton/>
        <div className="text-center text-sm mt-10">
          Already have an account?{" "}
          {isOpen && type === "register" ? (
            <button
              type="button"
              onClick={() => onOpen("login")}
              className="text-primary underline"
              disabled={isPending}
            >
              Login
            </button>
          ) : (
            <Link
              href="/auth/login"
              className={cn(
                "text-blue-500 underline",
                isPending && "pointer-events-none opacity-60",
              )}
            >
              Login
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
};
