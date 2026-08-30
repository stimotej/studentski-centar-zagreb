import React from "react";
import Card from "../shared/Card";
import { useUI } from "@/utils/ui";

interface DavanjaPoslodavcaSectionProps {
  className?: string;
}

const DavanjaPoslodavcaSection: React.FC<DavanjaPoslodavcaSectionProps> = (
  props,
) => {
  const ui = useUI();
  return (
    <section className={props.className}>
      <div className="text-center">
        <h5 className="text-primary text-sm font-medium tracking-wider uppercase">
          {ui("employer.contribution")}
        </h5>
        <h3 className="text-[42px] text-text font-semibold leading-normal">
          {ui("employer.howUsed")}
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        <SectionCard
          title={ui("employer.fee")}
          amount="12,00"
          items={[ui("fee.placement"), ui("fee.collection"), ui("fee.support")]}
        />
        <SectionCard
          title={ui("employer.pension")}
          amount="5,50"
          items={[ui("fee.pension"), ui("fee.health")]}
        />
        <SectionCard
          title={ui("employer.standard")}
          amount="0,50"
          items={[
            ui("fee.standard"),
            ui("fee.projects"),
            ui("fee.scholarships"),
          ]}
        />
      </div>
    </section>
  );
};

interface SectionCardProps {
  title: string;
  amount: string;
  items: string[];
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  const ui = useUI();
  return (
    <Card className="p-0">
      <div className="border-b border-gray-200 p-6">
        <p className="font-medium tracking-wide text-primary text-lg ml-4 mb-4">
          {props.title}
        </p>
        <div className="flex flex-wrap">
          <span className="text-light">%</span>
          <span className="font-semibold text-5xl text-text">
            {props.amount}
          </span>
          <span className="mt-auto text-light"> {ui("fee.perContract")}</span>
        </div>
      </div>
      <div className="p-6">
        {props.items.map((item, index) => (
          <div key={item} className="flex items-start mb-4">
            <div className="w-[6px] h-[6px] bg-primary rounded-full mr-4 mt-2 ml-2"></div>
            <p className="text-light flex-1">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DavanjaPoslodavcaSection;
