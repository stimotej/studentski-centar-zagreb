import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "./Card";

interface InfoPostCardProps {
  title: string;
  excerpt?: string;
  content?: string;
  link?: string;
  className?: string;
}

const InfoPostCard: React.FC<InfoPostCardProps> = (props) => {
  return (
    <Card className={clsx("flex flex-col gap-3", props.className)}>
      <DisplayHTML
        html={props.title}
        className="font-semibold text-2xl line-clamp-2 text-text"
      />
      {props.link ? (
        <>
          <DisplayHTML
            html={props.excerpt || ""}
            className="line-clamp-3 text-light flex-1"
          />
          <Link
            href={props.link}
            className="text-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
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
