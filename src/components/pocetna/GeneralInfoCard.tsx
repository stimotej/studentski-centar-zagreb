import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "../shared/Card";

interface GeneralInfoCardProps {
  title: string;
  content: string;
  link: string;
}

const GeneralInfoCard: React.FC<GeneralInfoCardProps> = (props) => {
  return (
    <Card className="text-sm text-text w-full">
      <DisplayHTML
        html={props.title}
        className="uppercase tracking-wide mb-2 font-bold"
      />
      <DisplayHTML html={props.content} />
      <p className="mt-4">
        <Link
          href={props.link}
          className="text-primary flex items-center gap-1"
        >
          Saznaj više
          <MdChevronRight size={16} />
        </Link>
      </p>
    </Card>
  );
};

export default GeneralInfoCard;
