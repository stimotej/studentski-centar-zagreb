import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";

interface UclanjivanjeCardProps {
  className?: string;
}

const UclanjivanjeCard: React.FC<UclanjivanjeCardProps> = (props) => {
  return (
    <Card className={props.className}>
      <h4 className="text-xl font-medium text-text">Učlanjivanje</h4>
      <p className="mt-4 text-light">
        Prije učlanjenja potrebno je provjeriti imate li osnovno zdravstveno
        osiguranje.
      </p>
      <p className="mt-3 mb-4 text-light">Učlanit se može samo osobno.</p>
      <ButtonLink href="/informacije/clanstvo-uclanjivanje/">
        Saznaj više
      </ButtonLink>
    </Card>
  );
};

export default UclanjivanjeCard;
