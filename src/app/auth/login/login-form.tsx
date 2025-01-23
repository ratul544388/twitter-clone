"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/users";
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
import { loginSchema, loginValues } from "@/lib/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const LoginForm = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const { isOpen, type, onOpen, onClose } = useModalStore();
  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values).then(({ error }) => {
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
        className={cn("flex w-full max-w-[480px] flex-col gap-6", className)}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold">Welcome back!</h2>
          <p className="text-muted-foreground">
            Log in to connect and share your thoughts.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
                    autoFocus
                    label="Enter your email"
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
        </div>
        <FormError error={error} />
        <LoadingButton isLoading={isPending} className="mt-2 w-full">
          Login
        </LoadingButton>
        <div className="mt-4 text-center text-sm">
          Do not have an account? {""}
          {isOpen && type === "login" ? (
            <button
              type="button"
              disabled={isPending}
              onClick={() => onOpen("register")}
              className="text-primary underline"
            >
              Register
            </button>
          ) : (
            <Link
              href="/auth/register"
              className={cn(
                "text-blue-500 underline",
                isPending && "pointer-events-none opacity-60",
              )}
            >
              Register
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
};
