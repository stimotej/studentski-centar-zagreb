import clsx from "clsx";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import DisplayHTML from "../elements/DisplayHTML";

interface PageTitleProps {
  title: string;
  subtitle?: string | React.ReactNode;
  action?: { title: string; href: string; isRegularLink?: boolean };
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <div className={clsx("mt-12", props.className)}>
      <div className="w-12 h-4 bg-primary"></div>
      <div className="mt-6">
        <DisplayHTML
          html={`<h1>${props.title}</h1>`}
          className="text-3xl lg:text-4xl xl:text-5xl leading-tight font-semibold text-text"
        />
      </div>
      {!!props.subtitle &&
        (typeof props.subtitle === "string" ? (
          <div className="mt-8">
            <DisplayHTML
              html={props.subtitle}
              className="text-light leading-relaxed"
            />
          </div>
        ) : (
          <div className="mt-8 text-light leading-relaxed">
            {props.subtitle}
          </div>
        ))}
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
