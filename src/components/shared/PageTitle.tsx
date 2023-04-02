import clsx from "clsx";
import React from "react";
import ButtonLink from "../elements/ButtonLink";

interface PageTitleProps {
  title: string;
  subtitle?: string | React.ReactNode;
  action?: { title: string; href: string; isRegularLink?: boolean };
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <div className="mt-12">
      <div className="w-12 h-4 bg-primary"></div>
      <h1 className="text-3xl lg:text-4xl xl:text-5xl leading-tight font-semibold text-text mt-6">
        {props.title}
      </h1>
      {!!props.subtitle && (
        <h3 className="mt-8 text-light leading-relaxed">{props.subtitle}</h3>
      )}
      {!!props.action && (
        <ButtonLink
          href={props.action.href}
          className={clsx(
            "!rounded-full w-fit",
            props.subtitle ? "mt-6" : "mt-10"
          )}
          isRegularLink={props.action.isRegularLink}
        >
          {props.action.title}
        </ButtonLink>
      )}
    </div>
  );
};

export default PageTitle;
