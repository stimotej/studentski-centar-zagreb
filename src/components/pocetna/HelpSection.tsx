import Image from "next/image";
import React from "react";
import Button from "../elements/Button";
import ButtonLink from "../elements/ButtonLink";
import SectionTitle from "../shared/SectionTitle";

const HelpSection = () => {
  return (
    <div className="flex flex-wrap-reverse mt-28 gap-8 relative bg-gradient-to-b from-transparent to-blue-50">
      <div className="flex-1">
        <Image
          src="/slike/pitanja-i-pomoc.png"
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
            <a href="mailto:ured@sczg.hr">ured@sczg.hr</a>
          </div>
          <div>
            <div>TELEFON</div>
            <a href="tel:+385 1 4593 555">+385 1 4593 555</a>
          </div>
          <div>
            <div>ADRESA</div>
            <a href="https://goo.gl/maps/c8zmCvydby9os12k7">
              Savska cesta 25, 10000 Zagreb
            </a>
          </div>
          <div>
            <div>URED RAVNATELJA</div>
            <a href="tel:+385 1 4593 621">+385 1 4593 621</a>
          </div>
        </div>
        <ButtonLink
          href="mailto:ured@sczg.hr"
          className="!rounded-full mt-10 w-fit"
          isRegularLink
        >
          KONTAKTIRAJ NAS
        </ButtonLink>
      </div>
      <Image
        src="/slike/pozadina-oblik.svg"
        alt="Pozadinski oblik"
        width={1630}
        height={300}
        className="absolute bottom-0"
      />
    </div>
  );
};

export default HelpSection;
