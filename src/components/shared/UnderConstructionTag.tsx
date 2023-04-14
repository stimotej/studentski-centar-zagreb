import React from "react";
import clsx from "clsx";
import { MdOutlineWarning } from "react-icons/md";

interface UnderConstructionTagProps {
  className?: string;
  white?: boolean;
}

const UnderConstructionTag: React.FC<UnderConstructionTagProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 w-fit rounded-lg py-3 px-4",
        props.white
          ? "bg-white/20 text-white border-2 border-white"
          : "bg-primary/10 text-primary border-2 border-primary",
        props.className
      )}
    >
      <MdOutlineWarning size={20} />
      <span
        className={clsx(
          "font-semibold",
          props.white ? "text-white" : "text-primary"
        )}
      >
        Stranica u izradi
      </span>
    </div>
  );
};

export default UnderConstructionTag;
