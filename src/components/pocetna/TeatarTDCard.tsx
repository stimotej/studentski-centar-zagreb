import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Card from "../shared/Card";
import { useUI } from "@/utils/ui";

interface TeatarTDCardProps {
  className?: string;
}

const TeatarTDCard: React.FC<TeatarTDCardProps> = (props) => {
  const ui = useUI();
  return (
    <Card className={clsx("w-full", props.className)}>
      <Image
        src="/slike/teatar-td-logo.jpg"
        alt="Teata&TD"
        width={200}
        height={200}
        className="w-full h-[200px] object-contain"
      />
      <p className="text-light">{ui("td.tickets")}</p>
    </Card>
  );
};

export default TeatarTDCard;
