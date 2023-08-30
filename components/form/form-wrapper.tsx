"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {children}
    </form>
  );
}
