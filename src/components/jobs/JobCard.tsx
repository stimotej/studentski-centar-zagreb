import clsx from "clsx";
import Image from "next/image";
import React from "react";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "../shared/Card";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import CustomLink from "../elements/CustomLink";

interface JobCardProps {
  title: string;
  companyName: string;
  companyPicture?: string;
  paymentRate: number;
  description: string;
  featured?: boolean;
  slug?: string;
  className?: string;
}

const JobCard: React.FC<JobCardProps> = (props) => {
  return (
    <CustomLink
      href={"/poslovi/" + props.slug}
      className={clsx(
        "w-full rounded-xl",
        props.featured && "ring-2 ring-primary",
        props.className
      )}
    >
      <Card className="rounded-xl w-full h-full">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="line-clamp-1 text-light">{props.companyName}</span>
            <span className="line-clamp-2 font-semibold">{props.title}</span>
          </div>
          <Image
            src={props.companyPicture || "/slike/company-placeholder.png"}
            alt={props.companyName}
            className="rounded-full"
            width={56}
            height={56}
          />
        </div>
        <div className="font-semibold text-primary my-4">
          {props.paymentRate}
        </div>
        <DisplayHTML
          html={clearHtmlFromString(props.description)}
          className="text-light line-clamp-3"
        />
      </Card>
    </CustomLink>
  );
};

export default JobCard;
