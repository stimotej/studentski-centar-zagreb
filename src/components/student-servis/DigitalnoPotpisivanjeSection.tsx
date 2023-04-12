import Image from "next/image";
import React from "react";
import UnderConstructionTag from "../shared/UnderConstructionTag";

interface DigitalnoPotpisivanjeSectionProps {
  className?: string;
}

const DigitalnoPotpisivanjeSection: React.FC<
  DigitalnoPotpisivanjeSectionProps
> = (props) => {
  return (
    <section className={props.className}>
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-1">
          <h5 className="text-primary text-sm font-medium tracking-wider uppercase">
            DIGITALNO POTPISIVANJE UGOVORA
          </h5>
          <h3 className="text-[38px] text-text font-semibold leading-normal">
            Izvadite i potpišite ugovor u trenu putem mobitela.
          </h3>
          <div className="flex flex-col gap-8 mt-6">
            <SectionCard
              image="/slike/student-servis/ikone/sinkronizacija.png"
              title="Sinkronizacija sa bazom podataka"
              description="Izvadite ugovor za poslodavca preko baze podataka aktivnih poslodavaca Studentskog centra u Zagrebu."
            />
            <SectionCard
              image="/slike/student-servis/ikone/potpisivanje.png"
              title="Digitalno potpisivanje"
              description="Potpišite ugovore digitalno putem mobitela kroz sigurnosni certifikat 4. razine. Brzo, jednostavno i sigurno."
            />
            <SectionCard
              image="/slike/student-servis/ikone/pohrana.png"
              title="Sinkronizacija sa bazom podataka"
              description="Svi ugovori su pohranjeni i zaštićeni vremenskim žigom. U bilo kojem trenutku pogledajte sve ugovore i statuse ugovora."
            />
          </div>
        </div>
        <div className="flex-1">
          <Image
            src="/slike/student-servis/digitalno-potpisivanje-ugovora.png"
            alt="Digitalno potpisivanje ugovora"
            width={400}
            height={360}
            className="w-full h-auto object-cover"
          />
          <UnderConstructionTag className="mx-auto mt-6" />
        </div>
      </div>
    </section>
  );
};

interface SectionCardProps {
  image: string;
  title: string;
  description: string;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-start">
        <Image
          src={props.image}
          alt="Studentski centar ikona"
          width={60}
          height={60}
        />
        <div>
          <h3 className="font-medium text-xl text-text">{props.title}</h3>
          <p className="text-light flex-1 mt-3 leading-normal">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalnoPotpisivanjeSection;
