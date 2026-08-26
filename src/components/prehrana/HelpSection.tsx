import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Section from "../shared/Section";
import SectionTitle from "../shared/SectionTitle";
import { useUI } from "@/utils/ui";

const HelpSection = () => {
  const ui = useUI();
  return (
    <div className="flex flex-col-reverse z-[2] md:flex-row mt-28 gap-8 relative bg-gradient-to-b from-transparent to-blue-50">
      <div className="flex-1">
        <Image
          src="/slike/prehrana/pitanja_i_pomoc.png"
          alt={ui("common.questionsAndHelp")}
          width={500}
          height={370}
          className="object-contain w-full h-auto"
        />
      </div>
      <Section className="flex-1 z-[3]">
        <SectionTitle
          title={ui("common.questionsAndHelp")}
          className="!text-left"
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 [&>div>a]:text-primary [&>div>div]:mb-1 [&>div>div]:text-xs [&>div>div]:tracking-wider [&>div>div]:font-semibold [&>div>div]:text-text">
          <div>
            <div>{ui("help.email")}</div>
            <a href="mailto:prehrana@sczg.hr">prehrana@sczg.hr</a>
          </div>
          <div>
            <div>{ui("help.phone")}</div>
            <a href="tel:+385 1 4593 654">+385 1 4593 654</a>
          </div>
          <div className="col-span-2">
            <div>{ui("help.address")}</div>
            <a href="https://goo.gl/maps/XNJ98VWsZp16tKRe6">
              Studentski centar Zagreb, Savska cesta 25, 10000, Zagreb, Hrvatska
            </a>
          </div>
        </div>

        <ButtonLink
          href="mailto:prehrana@sczg.hr"
          className="!rounded-full mt-10 w-fit"
          isRegularLink
        >
          KONTAKTIRAJ NAS
        </ButtonLink>
      </Section>
      <Image
        src="/slike/pozadina-oblik-dno.svg"
        alt={ui("decor.backgroundShape")}
        width={1630}
        height={300}
        className="absolute bottom-0 z-[1]"
      />
    </div>
  );
};

export default HelpSection;
