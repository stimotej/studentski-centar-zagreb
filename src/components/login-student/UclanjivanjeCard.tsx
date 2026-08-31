import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";
import { useUI } from "@/utils/ui";

interface UclanjivanjeCardProps {
  className?: string;
}

const UclanjivanjeCard: React.FC<UclanjivanjeCardProps> = (props) => {
  const ui = useUI();
  return (
    <Card className={props.className}>
      <h4 className="text-xl font-medium text-text">{ui("membership.join")}</h4>
      <p className="mt-4 text-light">{ui("membership.beforeJoining")}</p>
      <p className="mt-3 mb-4 text-light">{ui("membership.inPerson")}</p>
      <ButtonLink href="/informacije/clanstvo-uclanjivanje/">
        {ui("common.readMore")}
      </ButtonLink>
    </Card>
  );
};

export default UclanjivanjeCard;
