import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import DisplayHTML from "../elements/DisplayHTML";
import Card from "../shared/Card";

interface UgovaranjePoslaSectionProps {
  className?: string;
}

const UgovaranjePoslaSection: React.FC<UgovaranjePoslaSectionProps> = (
  props
) => {
  return (
    <section className={props.className}>
      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="flex flex-col gap-3 pl-0 lg:pl-24 lg:w-2/3">
          <h5 className="text-primary text-sm font-medium tracking-wider uppercase">
            Ugovaranje posla
          </h5>
          <h3 className="text-[38px] text-text font-semibold leading-normal">
            Poslodavac je dužan popuniti obrazac ugovora te ga ovjeriti
            najkasnije u roku od 15 dana nakon obavljenog posla.
          </h3>
          <ButtonLink
            href="/dokumenti/student-servis/Zakon-o-obavljanju-studentskih-poslova.pdf"
            isRegularLink
          >
            PRAVILNIK O STUDENTSKOM ZAPOŠLJAVANJU
          </ButtonLink>
        </div>
        <div className="lg:w-1/3 lg:px-6">
          <SectionCard
            image="/slike/student-servis/ikone/potpis-ugovora.png"
            title="POTPIS UGOVORA NAKON POSLODAVCA"
            content="Student/ica potpisuje ugovor nakon što poslodavac uredno popuni i uvjeri ugovor, nikako prije.
Upozoravamo studente da nikome, nikad ništa ne <strong>potpisuju unaprijed</strong>."
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        <div className="flex-1">
          <SectionCard
            image="/slike/student-servis/ikone/isplate-naknada.png"
            title="ISPLATE NAKNADA"
            content="Isplate se obavljaju nakon što poslodavac - naručitelj posla plati račun Studentskom centru u Zagrebu. Isplate se vrše na <strong>žiro račun</strong> studente otvorenog u bilo kojoj banci na teritoriju Republike Hrvatske."
          />
        </div>
        <div className="transform lg:-translate-y-24 flex-1">
          <SectionCard
            image="/slike/student-servis/ikone/broj-ugovora.png"
            title="BROJ UGOVORA"
            content="Student, član Student servisa može podizati <strong>tijekom godine</strong> neograničen broj ugovora, ukoliko prethodno podignute redovite vraća u Student servis. Student/ica može mjesečno preuzeti tri ugovora za istog poslodavca pod uvjetom da prethodno podignute redovito vraća u Student servis."
          />
        </div>
        <div className="flex-1">
          <SectionCard
            image="/slike/student-servis/ikone/neoporezivi-primitak.png"
            title="NEOPOREZIVI PRIMITAK"
            content="Uz isplatu redovite ugovorene plaće, poslodavci imaju mogućnost dodatnog nagrađivanja radnika kroz isplatu neoporezivih primitaka, nagrada, naknada i potpora."
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
  return (
    <div>
      <Image
        src={props.image}
        alt="Student servis ikona"
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
