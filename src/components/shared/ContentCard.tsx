import clsx from "clsx";
import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "./Card";

interface ContentCardProps {
  image?: string;
  title: string;
  content: string;
  titleClassName?: string;
  imageClassName?: string;
  contentClassName?: string;
  action?: { title: string; href: string; isRegularLink?: boolean };
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = (props) => {
  return (
    <Card
      className={clsx(
        "text-center flex flex-col justify-between gap-6",
        props.className
      )}
    >
      {!!props.image && (
        <Image
          src={props.image}
          alt={props.title}
          width={230}
          height={230}
          className={clsx(
            "h-[150px] w-auto object-cover mx-auto",
            props.imageClassName
          )}
        />
      )}
      <div className="flex flex-col gap-2">
        <h4
          className={clsx(
            "text-sm uppercase text-text tracking-wide font-medium",
            props.titleClassName
          )}
        >
          {props.title}
        </h4>
        <DisplayHTML
          html={props.content}
          className={clsx("text-light text-sm", props.contentClassName)}
        />
      </div>
      {!!props.action && (
        <ButtonLink
          href={props.action.href}
          className="!rounded-full w-fit mx-auto"
          isRegularLink={props.action.isRegularLink}
          outlined
        >
          {props.action.title}
        </ButtonLink>
      )}
    </Card>
  );
};

export default ContentCard;
