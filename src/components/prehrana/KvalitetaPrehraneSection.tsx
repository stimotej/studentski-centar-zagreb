import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Card from "../shared/Card";
import Section from "../shared/Section";

interface KvalitetaPrehraneSectionProps {
  className?: string;
}

const KvalitetaPrehraneSection: React.FC<KvalitetaPrehraneSectionProps> = (
  props
) => {
  return (
    <div className={clsx("relative z-[2] pt-36 bg-[#fafafa]", props.className)}>
      <Image
        src="/sczg/slike/pozadina-oblik-vrh.svg"
        alt="Pozadinski oblik"
        width={1630}
        height={300}
        className="absolute top-0 -z-[1]"
      />
      <Section>
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1">
            <h3 className="text-[38px] text-text font-semibold leading-normal">
              Važnost kvalitetne i razvnovrsne prehrane za studente i uspjeh.
            </h3>
            <p className="mt-4 text-light leading-relaxed">
              Ljudsko je tijelo sofisticiran mehanizam za čiji je rad i normalno
              funkcioniranje prehrana i sastojni prehrane vrlo bitna. Za bolje
              tjelesne funkcije, rast i akademski uspjeh kvalitetna prehrana je
              jako bitna a to je ono što Studentski centar kroz svoje restorane
              pruža studentima.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/sczg/slike/prehrana/vaznost_kvalitete_prehrane.png"
              alt="Važnost kvalitetne prehrane"
              width={400}
              height={360}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10 mt-12">
          <Card className="text-center flex-1">
            <h5 className="text-lg text-text font-semibold mb-4">
              Individualni pristup
            </h5>
            <p className="text-sm font-light leading-relaxed">
              Organizam i probava svake osobe se dovoljno razlikuju da isti
              režim prehrane može rezultirati sa drugačijim ishodima. Zato je
              bitno istražiti i testirati vlastiti organizam te prilagoditi
              režim prehrane tim potrebama.
            </p>
          </Card>
          <Card className="text-center flex-1">
            <h5 className="text-lg text-text font-semibold mb-4">
              Individualni pristup
            </h5>
            <p className="text-sm font-light leading-relaxed">
              Organizam i probava svake osobe se dovoljno razlikuju da isti
              režim prehrane može rezultirati sa drugačijim ishodima. Zato je
              bitno istražiti i testirati vlastiti organizam te prilagoditi
              režim prehrane tim potrebama.
            </p>
          </Card>
          <div className="flex flex-col gap-6 flex-1">
            <SectionCard
              image="/sczg/slike/prehrana/ikone/raznovrsna_prehrana.png"
              title="Raznovrsna prehrana"
            />
            <SectionCard
              image="/sczg/slike/prehrana/ikone/tjelesna_aktivnost.png"
              title="Tjelesna aktivnost"
            />
            <SectionCard
              image="/sczg/slike/prehrana/ikone/normalna_tjelesna_masa.png"
              title="Normalna tjelesna masa"
            />
            <SectionCard
              image="/sczg/slike/prehrana/ikone/vitamini_i_minerali.png"
              title="Vitamini i minerali"
            />
          </div>
        </div>
      </Section>
      <Image
        src="/sczg/slike/pozadina-oblik-dno.svg"
        alt="Pozadinski oblik"
        width={1630}
        height={300}
        className="absolute bottom-0 -z-[1]"
      />
    </div>
  );
};

interface SectionCardProps {
  image: string;
  title: string;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  return (
    <div className="flex items-center gap-4">
      <Image src={props.image} alt={props.title} width={32} height={32} />
      <p className="text-text font-semibold uppercase tracking-wide text-xs">
        {props.title}
      </p>
    </div>
  );
};

export default KvalitetaPrehraneSection;
