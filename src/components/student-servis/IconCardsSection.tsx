import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface IconCardsSectionProps {
  className?: string;
}

const IconCardsSection: React.FC<IconCardsSectionProps> = (props) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-gray-200 pt-6",
        props.className
      )}
    >
      <IconCard
        image="/sczg/slike/student-servis/ikone/clanstvo.png"
        text="Članstvo studenta i poslodavaca u Student servisu."
      />
      <IconCard
        image="/sczg/slike/student-servis/ikone/vodenje-ocevidnika-clanova.png"
        text="Vođenje očevidnika članova redovnih studenata i obavljenih posredovanja."
      />
      <IconCard
        image="/sczg/slike/student-servis/ikone/obrada-trzista.png"
        text="Obrada tržišta studentskog rada i posredovanja u pronalasku posla."
      />
      <IconCard
        image="/sczg/slike/student-servis/ikone/obracun.png"
        text="Obračun i naplata studentske zarade od poslodavca u korist studenta."
      />
      <IconCard
        image="/sczg/slike/student-servis/ikone/digitalno-pretrazivanje.png"
        text="Digitalno pretraživanje tržišta rada i studentskih poslova."
      />
      <IconCard
        image="/sczg/slike/student-servis/ikone/isplata.png"
        text="Isplata punog iznosa zarade studentu, bez naknade."
      />
    </div>
  );
};

interface IconCardProps {
  image: string;
  text: string;
}

const IconCard: React.FC<IconCardProps> = (props) => {
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={props.image}
        alt="Student servis ikona"
        width={120}
        height={120}
        className="w-14 h-14 object-cover rounded-lg"
      />
      <p className="flex-1 text-sm text-light">{props.text}</p>
    </div>
  );
};

export default IconCardsSection;
