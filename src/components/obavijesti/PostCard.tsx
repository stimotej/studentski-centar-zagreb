import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import DisplayHTML from "../elements/DisplayHTML";

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
    <Link href={"/obavijesti/" + props.slug}>
      <Image
        src={props.image || "/slike/placeholder.png"}
        alt={props.title}
        priority
        width={355}
        height={250}
        className="object-cover w-full h-[200px] rounded-lg"
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
        <DisplayHTML html={props.excerpt} className="text-sm line-clamp-5" />
      </div>
    </Link>
  );
};

export default PostCard;
