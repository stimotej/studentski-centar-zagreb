import clearHtmlFromString from "@/utils/clearHtmlFromString";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import DisplayHTML from "../elements/DisplayHTML";
import Spinner from "../elements/Spinner";
import type { ObavijestiMeta, Post } from "@/features/types";
import CustomLink from "../elements/CustomLink";

interface PagePostsProps {
  className?: string;
  posts: Post<ObavijestiMeta>[] | undefined;
  isLoading?: boolean;
}

const PagePosts: React.FC<PagePostsProps> = ({
  className,
  posts,
  isLoading,
}) => {
  if (!posts && !isLoading) return null;
  return (
    <section className={className}>
      {isLoading ? (
        <div className="py-12">
          <Spinner className="mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts?.map((post) => (
            <PagePostCard
              key={post.id}
              image={post.image_url}
              title={post.title.rendered}
              excerpt={post.excerpt.rendered}
              slug={post.slug}
              date={post.date}
              featured={post.meta.featured}
            />
          ))}
        </div>
      )}
    </section>
  );
};

interface PagePostCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  featured: boolean;
}

const PagePostCard: React.FC<PagePostCardProps> = (props) => {
  return (
    <CustomLink
      href={`/obavijesti/${props.slug}`}
      className={clsx(
        "p-3 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-primary/5 flex gap-4",
        props.featured && "ring-1 ring-primary/60"
      )}
    >
      <Image
        src={props.image || "/slike/placeholder.png"}
        alt={clearHtmlFromString(props.title)}
        priority
        width={96}
        height={96}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex flex-col gap-2 flex-1">
        <DisplayHTML
          html={props.title}
          className="text-text font-medium text-lg line-clamp-2"
        />
        <DisplayHTML
          html={props.excerpt}
          className="text-light text-sm line-clamp-2"
        />
        <div className="text-light text-xs">
          {dayjs(props.date).format("DD.MM.YYYY")}
        </div>
      </div>
    </CustomLink>
  );
};

export default PagePosts;
