import clsx from "clsx";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";

interface NatjecajCardProps {
  className?: string;
}

const NatjecajCard: React.FC<NatjecajCardProps> = (props) => {
  return (
    <Card className={props.className}>
      <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-text">
        Natječaj za akademsku godinu 2022./2023.
      </h3>
      <p className="mt-4 text-center text-light">
        Otvoren od 01.07.2022. do zaključno 23.07.2022. godine Rezultati
        natječaja biti će objavljeni do 16. kolovoza 2022. godine na web
        stranici:
      </p>
      <p className="mt-2 text-center">
        <a href="www.sczg.unizg.hr" className="text-primary">
          www.sczg.unizg.hr
        </a>
      </p>
      <ButtonLink
        href="https://natjecaj.sczg.hr/student"
        className="mt-5 mx-auto"
        isRegularLink
      >
        Natječaj za studentski smještaj
      </ButtonLink>
    </Card>
  );
};

export default NatjecajCard;
