import React from "react";
import clsx from "clsx";
import Spinner from "./Spinner";

type ButtonProps = {
  icon?: React.ReactNode;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={props.disabled || props.loading}
        className={clsx(
          "relative flex items-center gap-1 bg-primary hover:bg-primary/90 rounded-full uppercase text-white tracking-wider text-sm py-3 px-6 font-medium",
          props.disabled && "!bg-gray-200 !text-gray-600 hover:!bg-gray-200",
          props.className
        )}
      >
        {props.children}
        {props.loading && (
          <div className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center">
            <Spinner size={16} />
          </div>
        )}
        {props.icon}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
