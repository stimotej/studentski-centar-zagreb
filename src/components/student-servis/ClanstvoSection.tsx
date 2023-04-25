import Image from "next/image";
import React from "react";
import { MdCheckCircle } from "react-icons/md";
import ButtonLink from "../elements/ButtonLink";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "../shared/Card";
import UnderConstructionTag from "../shared/UnderConstructionTag";

interface DigitalnoPotpisivanjeSectionProps {
  className?: string;
}

const ClanstvoSection: React.FC<DigitalnoPotpisivanjeSectionProps> = (
  props
) => {
  return (
    <section className={props.className}>
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-1">
          <Image
            src="/slike/student-servis/clanstvo-u-student-servisu.png"
            alt="Članstvo u student servisu"
            width={400}
            height={360}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1">
          <h5 className="text-primary text-sm font-medium tracking-wider uppercase">
            ČLANSTVO U STUDENT SERVISU
          </h5>
          <h3 className="text-[38px] text-text font-semibold leading-normal">
            Uvjeti za članstvo i prijava.
          </h3>
          <p className="mt-3 text-light leading-normal">
            Omogućuje obavljanje studentskih poslova, izdavanje ugovora o djelu
            poslodavcima i isplatu naknada na žiro račun studenta. Član student
            servisa može biti student i maturant ali najdulje 3 mjeseca od
            završetka srednjoškolskog obrazovanja.
          </p>
          <div className="flex flex-col gap-8 mt-6">
            <SectionCard title="Status studenta/ice za tekuću akademsku godinu" />
            <SectionCard title="Studentska iskaznica - X-ica" />
            <SectionCard title="Osobni žiro ili tekući račun u banci na teritoriju Republike Hrvatske" />
            <SectionCard title="Osobna iskaznica" />
            <SectionCard title="Dvije male fotografije" />
            <SectionCard title="Preslika svjedodžbe završnog razreda srednje škole ili maturalne svjedodžbe" />
            <SectionCard title="Ispis moji Rezultati na <a href='https://www.postani-student.hr/'>www.postani-student.hr</a>" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface SectionCardProps {
  title: string;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  return (
    <div className="flex items-center gap-4">
      <MdCheckCircle size={24} className="text-primary" />
      <DisplayHTML
        html={props.title}
        className="text-text text-lg font-medium flex-1"
      />
    </div>
  );
};

export default ClanstvoSection;
