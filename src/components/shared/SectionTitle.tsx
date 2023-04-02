import clsx from "clsx";
import React from "react";

interface SectionTitleProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  return (
    <div className={clsx("text-center mb-6", props.className)}>
      <h2 className="text-3xl text-text font-semibold">{props.title}</h2>
      {!!props.subtitle && (
        <h3 className="text-light mt-4">{props.subtitle}</h3>
      )}
    </div>
  );
};

export default SectionTitle;
