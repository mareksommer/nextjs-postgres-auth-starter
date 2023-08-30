"use client";

import useRequest from "hooks/request";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Label from "../ui/form-label";
import Button from "../ui/button";
import Input from "../ui/form-input";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isLoading: isRegisterLoading,
    sendRequest: sendRegisterRequest,
    responseData: registerResponseData,
    errorMessage: registerError,
  } = useRequest();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    return register(data);
  };

  useEffect(() => {
    if (!registerResponseData) return;

    toast.success("Account created! Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }, [registerResponseData]);
  useEffect(() => {
    if (registerError) toast.error(registerError);
  }, [registerError]);
  useEffect(() => {
    setIsLoading(isRegisterLoading);
  }, [isRegisterLoading]);

  const register = (data: { email: string; password: string }) => {
    sendRegisterRequest("/api/auth/register", "POST", data, "registerUser");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <Label text="Email Address" htmlFor="email" />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="panic@thedis.co"
          autocomplete="email"
          required={true}
        />
      </div>
      <div>
        <Label text="Password" htmlFor="password" />
        <Input id="password" name="password" type="password" required={true} />
      </div>
      <Button text="Sign up" isLoading={isLoading} />

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-gray-800">
          Sign in
        </Link>{" "}
        instead.
      </p>
    </form>
  );
}
