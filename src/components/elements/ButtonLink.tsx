import React from "react";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";

type ButtonLinkProps = {
  href: LinkProps["href"];
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  isRegularLink?: boolean;
};

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  const styles = clsx(
    "flex w-fit items-center gap-1 bg-primary hover:bg-primary/90 rounded-full uppercase text-white tracking-widest text-xs py-4 px-8 font-semibold",
    props.className
  );

  if (props.isRegularLink && typeof props.href === "string") {
    return (
      <a href={props.href} className={styles}>
        {props.children}
        {props.icon}
      </a>
    );
  } else {
    return (
      <Link href={props.href} className={styles}>
        {props.children}
        {props.icon}
      </Link>
    );
  }
};

ButtonLink.displayName = "ButtonLink";
export default ButtonLink;
