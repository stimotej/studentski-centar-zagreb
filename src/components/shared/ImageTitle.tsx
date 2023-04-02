import clearHtmlFromString from "@/utils/clearHtmlFromString";
import Image from "next/image";
import React from "react";

interface ImageTitleProps {
  image: string;
  title: string;
}

const ImageTitle: React.FC<ImageTitleProps> = (props) => {
  return (
    <div className="relative bg-gray-400 overflow-hidden">
      <Image
        src={props.image}
        alt={clearHtmlFromString(props.title)}
        width={1920}
        height={1080}
        className="z-[1] absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-[2] bg-black/60"></div>
      <div className="z-[3] relative pb-[140px] pt-[208px] container md:max-w-[80%] mx-auto p-6 md:px-0">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl leading-tight font-semibold text-white">
          {clearHtmlFromString(props.title)}
        </h1>
      </div>
    </div>
  );
};

export default ImageTitle;
