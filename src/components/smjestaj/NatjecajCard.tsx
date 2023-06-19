import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";
import DisplayHTML from "../elements/DisplayHTML";

interface NatjecajCardProps {
  className?: string;
  title?: string;
  excerpt?: string;
  link?: string;
}

const NatjecajCard: React.FC<NatjecajCardProps> = (props) => {
  return (
    <Card className={props.className}>
      <DisplayHTML
        html={props.title ?? ""}
        className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-text"
      />
      <DisplayHTML
        html={props.excerpt ?? ""}
        className="mt-4 text-center text-light"
      />
      <ButtonLink
        href={props.link ?? ""}
        className="mt-5 mx-auto"
        isRegularLink
      >
        Natječaj za studentski smještaj
      </ButtonLink>
    </Card>
  );
};

export default NatjecajCard;
