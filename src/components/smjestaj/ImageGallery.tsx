import { ImageGroup } from "@/features/types";
import Image from "next/image";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ImageGalleryProps {
  imageGroups: ImageGroup[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  const postCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const postsContainerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleScrollPosts = (scrollBy: number, index: number) => {
    postsContainerRefs.current[index]?.scrollBy({
      left: scrollBy,
      behavior: "smooth",
    });
  };

  return (
    <div className={props.className}>
      {props.imageGroups?.map((group, index) => (
        <div key={group.id} className="mb-12 mt-8 text-center relative">
          {group.title}
          <div
            ref={(el) => (postsContainerRefs.current[index] = el)}
            className="flex gap-6 mt-4 px-8 overflow-x-auto hide-scrollbar group"
          >
            {group.images.map((image, i) => (
              <Image
                key={image.id}
                ref={(el) => (postsContainerRefs.current[index] = el)}
                src={image.url}
                alt={group.title}
                width={500}
                height={350}
                className="w-[80vw] max-w-[500px] h-[350px] object-cover rounded-lg"
              />
            ))}
            <button
              onClick={() =>
                handleScrollPosts(
                  -((postCardRefs.current[index]?.offsetWidth || 600) + 3 * 32),
                  index
                )
              }
              className="bg-white/60 backdrop-blur-sm invisible active:shadow-md group-hover:visible opacity-0 group-hover:opacity-100 transition-[opacity,transform] shadow-lg rounded-lg py-6 px-2 absolute left-6 top-1/2 transform -translate-y-1/2"
            >
              <MdChevronLeft size={24} />
            </button>
            <button
              onClick={() =>
                handleScrollPosts(
                  (postCardRefs.current[index]?.offsetWidth || 600) + 3 * 32,
                  index
                )
              }
              className="bg-white/60 backdrop-blur-sm invisible active:shadow-md group-hover:visible opacity-0 group-hover:opacity-100 transition-[opacity,transform] shadow-lg rounded-lg py-6 px-2 absolute right-6 top-1/2 transform -translate-y-1/2"
            >
              <MdChevronRight size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
