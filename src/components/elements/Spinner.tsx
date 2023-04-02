import clsx from "clsx";
import React from "react";

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner = ({ size = 24, className }: SpinnerProps) => {
  return (
    <div
      style={{ width: size, height: size, borderWidth: size / 8 }}
      className={clsx(
        "animate-spin rounded-full border-light border-r-transparent border-b-transparent",
        className
      )}
    ></div>
  );
};

export default Spinner;
