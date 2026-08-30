import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";
import { useUI } from "@/utils/ui";

interface IzdavanjeUgovoraCardProps {
  className?: string;
}

const IzdavanjeUgovoraCard: React.FC<IzdavanjeUgovoraCardProps> = (props) => {
  const ui = useUI();
  return (
    <Card className={props.className}>
      <h4 className="text-lg font-medium text-text">
        {ui("login.eContracts")}
      </h4>
      <p className="mt-6 mb-2 text-light">{ui("login.aaiSystem")}</p>
      <ButtonLink href="https://natjecaj.sczg.hr/student/Application">
        AAI@EduHr
      </ButtonLink>
      <p className="mt-6 mb-2 text-light">{ui("login.noAaiAccount")} </p>
      <ButtonLink href="https://natjecaj.sczg.hr/student/Login">
        {ui("login.goToSignIn")}
      </ButtonLink>
    </Card>
  );
};

export default IzdavanjeUgovoraCard;
