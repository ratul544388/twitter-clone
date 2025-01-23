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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/hooks/use-modal-store";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { registerSchema, registerValues } from "@/lib/validations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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
        className={cn("flex w-full max-w-[480px] flex-col gap-6", className)}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold">Join Twitter Today!</h2>
          <p className="text-muted-foreground">
            Sign up to connect and share your voice.
          </p>
        </div>
        <div className="flex flex-col gap-8 mt-5">
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
        </div>
        <FormError error={error} />
        <LoadingButton isLoading={isPending} className="mt-2 w-full">
          Submit
        </LoadingButton>
        <div className="mt-4 text-center text-sm">
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
            <Link href="/auth/login" className={cn("text-blue-500 underline", isPending && "pointer-events-none opacity-60")}>
              Login
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
};
