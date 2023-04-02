import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import SectionTitle from "../shared/SectionTitle";

const HelpSection = () => {
  return (
    <div className="flex flex-wrap-reverse mt-28 gap-8 relative bg-gradient-to-b from-transparent to-blue-50">
      <div className="flex-1">
        <Image
          src="/slike/prehrana/pitanja_i_pomoc.png"
          alt="Pitanja i pomoć"
          width={500}
          height={370}
          className="object-contain w-full h-auto"
        />
      </div>
      <div className="flex-1">
        <SectionTitle title="Pitanja i pomoć" className="!text-left" />
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 [&>div>a]:text-primary [&>div>div]:mb-1 [&>div>div]:text-xs [&>div>div]:tracking-wider [&>div>div]:font-semibold [&>div>div]:text-text">
          <div>
            <div>EMAIL ADRESA</div>
            <a href="mailto:prehrana@sczg.hr">prehrana@sczg.hr</a>
          </div>
          <div>
            <div>TELEFON</div>
            <a href="tel:+385 1 4593 654">+385 1 4593 654</a>
          </div>
          <div className="col-span-2">
            <div>ADRESA</div>
            <a href="https://goo.gl/maps/XNJ98VWsZp16tKRe6">
              Studentski centar Zagreb, Savska cesta 25, 10000, Zagreb, Hrvatska
            </a>
          </div>
        </div>

        <ButtonLink
          href="mailto:prehrana@sczg.hr"
          className="!rounded-full mt-10 w-fit"
          isRegularLink
        >
          KONTAKTIRAJ NAS
        </ButtonLink>
      </div>
      <Image
        src="/slike/pozadina-oblik-dno.svg"
        alt="Pozadinski oblik"
        width={1630}
        height={300}
        className="absolute bottom-0"
      />
    </div>
  );
};

export default HelpSection;
