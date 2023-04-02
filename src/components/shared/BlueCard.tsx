import clsx from "clsx";
import Link from "next/link";
import React from "react";
import ButtonLink from "../elements/ButtonLink";

interface BlueCardProps {
  title?: string;
  description?: string;
  action?: { title: string; href: string; isRegularLink?: boolean };
  children?: React.ReactNode;
  className?: string;
}

const BlueCard: React.FC<BlueCardProps> = (props) => {
  return (
    <div
      className={clsx(
        "w-full bg-gradient-to-b from-primary-light to-primary text-white p-6 md:p-12 rounded-xl shadow shadow-primary/40",
        props.className
      )}
    >
      {!!props.title && (
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-bold">
          {props.title}
        </h3>
      )}
      {!!props.description && (
        <p className="mt-3 text-white/90 text-center">{props.description}</p>
      )}
      {!!props.action && (
        <ButtonLink
          href={props.action.href}
          className="!bg-black !rounded-full w-fit mt-5 mx-auto"
          isRegularLink={props.action.isRegularLink}
        >
          {props.action.title}
        </ButtonLink>
      )}
      <div>{props.children}</div>
    </div>
  );
};

export default BlueCard;
