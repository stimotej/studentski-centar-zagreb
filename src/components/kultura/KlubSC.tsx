import Image from "next/image";
import React from "react";
import Card from "../shared/Card";

const KlubSC = () => {
  return (
    <Card className="flex flex-col md:flex-row gap-6">
      <Image
        src="/sczg/slike/stablo-znanja-logo.png"
        alt="Stablo znanja"
        title="Stablo znanja"
        width={100}
        height={100}
        className="w-[100px] h-auto object-contain mx-auto"
      />
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h4 className="text-text text-lg font-medium">Klub SC</h4>
        <p className="text-light text-sm">
          Prostor Kluba SC, od 2017. godine vizualno i sadržajno oplemenila je
          grupa studenata pod zajedničkim nazivnikom STABLO ZNANJA. Kako kažu i
          sami, Stablo znanja je projekt započet s ciljem pružanja osnovnih
          alata i uvjeta potrebnih za realizaciju kreativnih potencijala kod
          studenata i mladih. Što sve nude i čime se sve bave, provjerite na{" "}
          <a href="https://stabloznanja.com/" className="text-primary">
            stabloznanja.com
          </a>
          .
        </p>
      </div>
    </Card>
  );
};

export default KlubSC;
