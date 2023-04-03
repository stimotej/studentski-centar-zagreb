import Link from "next/link";
import React from "react";
import Card from "../shared/Card";

const GeneralInfoCard = () => {
  return (
    <Card className="text-sm text-text w-full">
      <h3 className="tracking-wide mb-2 font-bold">OPĆE INFORMACIJE</h3>
      <p className="font-medium">Sveučilište u Zagrebu</p>
      <p className="font-medium mb-2">Studentski centar u Zagrebu</p>{" "}
      <p>
        Adresa:{" "}
        <span className="font-medium">Savska cesta 25, 10000 Zagreb</span>
      </p>
      <p className="mb-2">
        Telefon: <span className="font-medium">+385 (0)1 4593 555</span>
      </p>
      <p>
        OIB: <span className="font-medium">22597784145</span>
      </p>
      <p>
        Matični broj: <span className="font-medium">3274438</span>
      </p>
      <p className="mb-2">
        Žiro račun: <span className="font-medium">2360000-1101482432</span>
      </p>
      <p>
        IBAN: <span className="font-medium">HR2623600001101482432</span>
      </p>
      <p className="mb-2">
        SWIFT: <span className="font-medium">ZABAHR2X</span>
      </p>
      <p>
        IBAN: <span className="font-medium">HR6624070001100251920</span>
      </p>
      <p className="mb-2">
        BIC: <span className="font-medium">OTPVHR2X</span>
      </p>
      <p className="font-medium text-xs">STATUT STUDENTSKOG CENTRA U ZAGREBU</p>
      <p className="mb-2">
        <a href="/dokumenti/sc_statut_30_01_2014.pdf" className="text-primary">
          Statut Studentskog centra u Zagrebu
        </a>
      </p>
      <p>
        <a
          href="/dokumenti/Odluka_o_dodjeli_financijskih_sredstava_05072021.pdf"
          className="text-primary"
        >
          Odluka o dodjeli financijskih sredstava za 2021. godinu
        </a>
      </p>
      <p className="mt-2">
        <Link href="/informacije/opci-podaci" className="text-primary">
          Saznaj više
        </Link>
      </p>
    </Card>
  );
};

export default GeneralInfoCard;
