import type { Post, PostsMeta } from "@/features/types";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import { restaurantsCategoryId } from "@/utils/constants";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import DisplayHTML from "../elements/DisplayHTML";
import Spinner from "../elements/Spinner";
import SectionTitle from "./SectionTitle";

interface PostSliderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  loading?: boolean;
  posts: Post<PostsMeta>[] | undefined;
}

const PostSlider: React.FC<PostSliderProps> = (props) => {
  const postCardRef = useRef<HTMLDivElement>(null);
  const postsContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollPosts = (scrollBy: number) => {
    postsContainerRef.current?.scrollBy({
      left: scrollBy,
      behavior: "smooth",
    });
  };

  return (
    <section className={clsx("relative", props.className)}>
      {!!props.title && (
        <SectionTitle title={props.title} subtitle={props.subtitle} />
      )}
      {props.loading ? (
        <div className="my-8">
          <Spinner className="mx-auto" />
        </div>
      ) : (
        <div
          ref={postsContainerRef}
          className="flex gap-8 overflow-x-auto hide-scrollbar px-8 group"
        >
          {props.posts?.map((post, index) => (
            <div key={index} ref={postCardRef}>
              <PostCard
                post={post}
                isRestaurant={post.categories.includes(restaurantsCategoryId)}
              />
            </div>
          ))}
          <button
            onClick={() =>
              handleScrollPosts(
                -((postCardRef.current?.offsetWidth || 600) * 3 + 3 * 32)
              )
            }
            className="bg-white/60 backdrop-blur-sm invisible active:shadow-md group-hover:visible opacity-0 group-hover:opacity-100 transition-[opacity,transform] shadow-lg rounded-lg py-6 px-2 absolute left-6 top-1/2 transform -translate-y-1/2"
          >
            <MdChevronLeft size={24} />
          </button>
          <button
            onClick={() =>
              handleScrollPosts(
                (postCardRef.current?.offsetWidth || 600) * 3 + 3 * 32
              )
            }
            className="bg-white/60 backdrop-blur-sm invisible active:shadow-md group-hover:visible opacity-0 group-hover:opacity-100 transition-[opacity,transform] shadow-lg rounded-lg py-6 px-2 absolute right-6 top-1/2 transform -translate-y-1/2"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
};

interface PostCardProps {
  post: Post<PostsMeta>;
  isRestaurant?: boolean;
}

const PostCard: React.FC<PostCardProps> = (props) => {
  return (
    <Link
      href={
        props.isRestaurant
          ? `/prehrana/restorani/${props.post.slug}`
          : `/smjestaj/domovi/${props.post.slug}`
      }
    >
      <Image
        src={props.post.image_url}
        alt={clearHtmlFromString(props.post.title.rendered)}
        width={350}
        height={200}
        className="rounded-lg object-cover w-[60vw] h-[30vh] max-w-[350px] min-w-[300px]"
      />
      <div className="flex flex-col gap-2 px-4 mt-4">
        <h4 className="text-text font-semibold text-xl">
          {clearHtmlFromString(props.post.title.rendered)}
        </h4>
        {props.isRestaurant ? (
          <>
            <DisplayHTML html={props.post.meta.ponuda} className="text-light" />
            {props.post.meta.restaurant_info
              .sort((a, b) => a.order - b.order)
              .map(
                (info, index) =>
                  !!info.title && (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-2 text-light"
                    >
                      <i className="material-icons">{info.icon}</i>
                      <span>{info.title}</span>
                    </div>
                  )
              )}
          </>
        ) : (
          <DisplayHTML
            html={props.post.excerpt.rendered}
            className="text-light"
          />
        )}
      </div>
    </Link>
  );
};

export default PostSlider;
