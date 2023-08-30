"use client";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Label from "../ui/form-label";
import Button from "../ui/button";
import Input from "../ui/form-input";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    return login(data);
  };

  const login = (data: { email: string; password: string }) => {
    setIsLoading(true);
    return signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      // @ts-ignore
    }).then(({ error }) => {
      setIsLoading(false);
      if (error) {
        toast.error(error);
      } else {
        router.refresh();
        router.push("/protected");
      }
    });
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
      <Button text="Sign in" isLoading={isLoading} />

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-gray-800">
          Sign up
        </Link>{" "}
        for free.
      </p>
    </form>
  );
}
