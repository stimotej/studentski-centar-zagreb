import React from "react";
import dayjs from "dayjs";
import DisplayHTML from "../elements/DisplayHTML";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import CustomLink from "../elements/CustomLink";
import CardImage from "../shared/CardImage";

interface PostCardProps {
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  slug: string;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  return (
    <CustomLink href={"/obavijesti/" + props.slug}>
      <CardImage
        src={props.image || "/slike/placeholder.png"}
        alt={props.title}
        priority
        className="w-full aspect-[16/10]"
      />
      <div className="flex flex-col gap-2 px-3 mt-3">
        <DisplayHTML
          html={props.title}
          className="font-medium text-lg leading-6"
        />
        <span className="text-light text-sm">
          {props.category}
          {props.date && ` | ${dayjs(props.date).format("DD.MM.YYYY.")}`}
        </span>
        <DisplayHTML
          html={clearHtmlFromString(props.excerpt)}
          className="text-sm line-clamp-5"
        />
      </div>
    </CustomLink>
  );
};

export default PostCard;
