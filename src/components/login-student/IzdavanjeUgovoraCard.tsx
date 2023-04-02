import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";

interface IzdavanjeUgovoraCardProps {
  className?: string;
}

const IzdavanjeUgovoraCard: React.FC<IzdavanjeUgovoraCardProps> = (props) => {
  return (
    <Card className={props.className}>
      <h4 className="text-lg font-medium text-text">
        Izdavanje e-ugovora, pregled ugovora, ispis potvrda, zarade
      </h4>
      <p className="mt-6 mb-2 text-light">
        Prijava u Web sustav s AAI korisničkim računom
      </p>
      <ButtonLink href="https://natjecaj.sczg.hr/student/Application">
        AAI@EduHr
      </ButtonLink>
      <p className="mt-6 mb-2 text-light">
        Ukoliko nemate AAI korisnički račun, prijaviti se možete ovdje{" "}
      </p>
      <ButtonLink href="https://natjecaj.sczg.hr/student/Login">
        Idi na prijavu
      </ButtonLink>
    </Card>
  );
};

export default IzdavanjeUgovoraCard;
