import clsx from "clsx";
import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import DisplayHTML from "../elements/DisplayHTML";

interface AboutSectionProps {
  title: string;
  content: string;
  image: string;
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex flex-col-reverse md:flex-row gap-12",
        props.className
      )}
    >
      <div className="flex-1">
        <Image
          src={props.image}
          alt={props.title}
          width={460}
          height={345}
          className="w-full h-auto object-cover rounded-lg"
        />
        <ButtonLink
          href="http://161.53.174.9/student-servis/"
          className="mt-6"
          isRegularLink
        >
          Stara web stranica
        </ButtonLink>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <DisplayHTML
          html={props.title}
          className="text-center font-bold text-3xl text-text"
        />
        <DisplayHTML html={props.content} className="text-text" />
      </div>
    </div>
  );
};

export default AboutSection;
