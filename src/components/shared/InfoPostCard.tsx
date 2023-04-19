import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "./Card";
import clearHtmlFromString from "@/utils/clearHtmlFromString";

interface InfoPostCardProps {
  title: string;
  excerpt?: string;
  content?: string;
  link?: string;
  className?: string;
}

const InfoPostCard: React.FC<InfoPostCardProps> = (props) => {
  return (
    <Card
      className={clsx(
        "flex flex-col gap-3 relative",
        props.excerpt?.includes("img") && "!pb-0",
        props.className
      )}
    >
      <DisplayHTML
        html={props.title}
        className="font-semibold text-2xl line-clamp-2 text-text"
      />
      {props.link ? (
        <>
          <DisplayHTML
            html={
              props.excerpt?.includes("img")
                ? props.excerpt
                : clearHtmlFromString(props.excerpt || "") || ""
            }
            className={clsx(
              "text-light flex-1 max-h-[250px]",
              props.excerpt?.includes("img")
                ? "overflow-hidden"
                : "line-clamp-3"
            )}
          />
          <Link
            href={props.link}
            className={clsx(
              "text-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-2",
              props.excerpt?.includes("img")
                ? "absolute bottom-0 left-0 right-0 rounded-b-lg px-6 pb-4 pt-8 bg-gradient-to-t from-white from-60% to-transparent"
                : ""
            )}
          >
            Saznaj više <MdArrowRightAlt size={18} />
          </Link>
        </>
      ) : (
        <DisplayHTML
          html={props.content || ""}
          className="text-light
        "
        />
      )}
    </Card>
  );
};

export default InfoPostCard;
