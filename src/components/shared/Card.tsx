import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={clsx(
        "shadow-lg p-6 bg-white rounded-lg w-full",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Card;
