import React from "react";
import clsx from "clsx";
import { MdSearch } from "react-icons/md";
import Spinner from "./Spinner";

type TextInputProps = {
  loading?: boolean;
  className?: string;
  errorMessage?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <div>
        <div
          className={clsx(
            "border text-sm text-text focus-within:border-primary outline-none flex items-center",
            props.type === "search"
              ? "border-gray-400 rounded-xl"
              : "border-primary/40 bg-primary/5 rounded-lg",
            props.errorMessage &&
              "border-red-500 focus-within:border-red-600 bg-red-500/5",
            props.className
          )}
        >
          {props.type === "search" ? (
            props.loading ? (
              <Spinner size={20} className="ml-3" />
            ) : (
              <MdSearch size={22} className="ml-3" />
            )
          ) : null}
          <input
            ref={ref}
            {...props}
            className={clsx(
              "outline-none py-3 px-4 rounded-xl w-full",
              props.type === "search" && "pl-r pl-1"
            )}
          />
        </div>
        {props.errorMessage ? (
          <div className="mt-1 ml-2 text-sm text-red-500">
            {props.errorMessage}
          </div>
        ) : null}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
