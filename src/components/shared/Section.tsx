import clsx from "clsx";
import React from "react";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = (props) => {
  return (
    <section
      className={clsx(
        "container md:max-w-[80%] mx-auto p-6 md:px-0",
        props.className
      )}
    >
      {props.children}
    </section>
  );
};

export default Section;
