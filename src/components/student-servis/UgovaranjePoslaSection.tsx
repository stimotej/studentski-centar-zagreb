import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "../shared/Card";
import { useUI } from "@/utils/ui";

interface UgovaranjePoslaSectionProps {
  className?: string;
}

const UgovaranjePoslaSection: React.FC<UgovaranjePoslaSectionProps> = (
  props,
) => {
  const ui = useUI();
  return (
    <section className={props.className}>
      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="flex flex-col gap-3 pl-0 lg:pl-24 lg:w-2/3">
          <h5 className="text-primary text-sm font-medium tracking-wider uppercase">
            {ui("ss.contractTitle")}
          </h5>
          <h3 className="text-[38px] text-text font-semibold leading-normal">
            {ui("ss.employerDuty")}
          </h3>
          <ButtonLink
            href="/dokumenti/student-servis/Zakon-o-obavljanju-studentskih-poslova.pdf"
            isRegularLink
          >
            {ui("ss.regulation")}
          </ButtonLink>
        </div>
        <div className="lg:w-1/3 lg:px-6">
          <SectionCard
            image="/slike/student-servis/ikone/potpis-ugovora.png"
            title={ui("contract.signAfterEmployer")}
            content={ui("contract.signWarning")}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        <div className="flex-1">
          <SectionCard
            image="/slike/student-servis/ikone/isplate-naknada.png"
            title={ui("contract.payments")}
            content={ui("contract.payoutsFull")}
          />
        </div>
        <div className="transform lg:-translate-y-24 flex-1">
          <SectionCard
            image="/slike/student-servis/ikone/broj-ugovora.png"
            title={ui("contract.number")}
            content={ui("contract.numberFull")}
          />
        </div>
        <div className="flex-1">
          <SectionCard
            image="/slike/student-servis/ikone/neoporezivi-primitak.png"
            title={ui("contract.taxFree")}
            content={ui("contract.taxFreeFull")}
          />
        </div>
      </div>
    </section>
  );
};

interface SectionCardProps {
  image: string;
  title: string;
  content: string;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  const ui = useUI();
  return (
    <div>
      <Image
        src={props.image}
        alt={ui("decor.ssIcon")}
        width={100}
        height={100}
      />
      <div className="h-[2px] w-16 my-4 ml-4 bg-orange-400"></div>
      <Card className="pt-1">
        <h4 className="text-xl text-text uppercase font-semibold mb-4">
          {props.title}
        </h4>
        <DisplayHTML
          html={props.content}
          className="text-light leading-relaxed"
        />
      </Card>
    </div>
  );
};

export default UgovaranjePoslaSection;
