import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
  id: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  className?: string;
};

const classes =
  "mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm";

const Input = ({
  id,
  name,
  type = "text",
  placeholder,
  autocomplete,
  required = false,
  className,
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autocomplete}
      required={required}
      className={`${classes} ${className}`}
    />
  );
};

export default Input;
