import React from "react";
import Card from "../shared/Card";
import Image from "next/image";
import { useUI } from "@/utils/ui";

interface UlazniceZaTDProps {
  className?: string;
}

const UlazniceZaTD: React.FC<UlazniceZaTDProps> = (props) => {
  const ui = useUI();
  return (
    <Card className={props.className}>
      <div className="flex flex-col items-center justify-center gap-4">
        <a href="https://www.ulaznice.hr/web/">
          <Image
            width={230}
            height={70}
            alt="Ulaznice.hr logo"
            src="/slike/logo-ulaznice-hr.png"
            className="lg:w-[200px] h-auto object-cover"
          />
        </a>
        <p className="text-light text-center">{ui("td.tickets")}</p>
      </div>
    </Card>
  );
};

export default UlazniceZaTD;
