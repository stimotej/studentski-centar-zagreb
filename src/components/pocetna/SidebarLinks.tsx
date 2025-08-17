import React from "react";
import clsx from "clsx";
import DisplayHTML from "../elements/DisplayHTML";
import Spinner from "../elements/Spinner";
import CustomLink from "../elements/CustomLink";

interface SidebarLinksProps {
  items: { label?: string; title: string; link: string }[];
  emptyText?: string;
  className?: string;
  loading?: boolean;
}

const SidebarLinks: React.FC<SidebarLinksProps> = (props) => {
  return (
    <div
      className={clsx(
        "flex flex-col divide-y-[1px] divide-white/20 include-filters",
        props.className
      )}
    >
      {props.loading ? (
        <div className="py-6">
          <Spinner className="mx-auto" />
        </div>
      ) : props.items.length > 0 ? (
        props.items.map((item, index) => (
          <LinkCard
            key={index}
            label={item.label}
            title={item.title}
            link={item.link}
          />
        ))
      ) : (
        <div className="text-light mt-3">{props.emptyText}</div>
      )}
    </div>
  );
};

interface LinkCardProps {
  label?: string;
  title: string;
  link: string;
}

const LinkCard: React.FC<LinkCardProps> = (props) => {
  return (
    <CustomLink
      href={props.link}
      className="first:rounded-t-lg last:rounded-b-lg py-3 px-6 bg-[#4c5c67]"
    >
      {!!props.label && (
        <span className="upperase font-semibold text-sm text-white/60 line-clamp-1 mb-1">
          {props.label}
        </span>
      )}
      <DisplayHTML
        html={props.title}
        className="text-white line-clamp-2 font-medium leading-5"
      />
    </CustomLink>
  );
};

export default SidebarLinks;
