import React from "react";
import Card from "../shared/Card";

interface DavanjaPoslodavcaSectionProps {
  className?: string;
}

const DavanjaPoslodavcaSection: React.FC<DavanjaPoslodavcaSectionProps> = (
  props
) => {
  return (
    <section className={props.className}>
      <div className="text-center">
        <h5 className="text-primary text-sm font-medium tracking-wider uppercase">
          DAVANJA POSLODAVCA STUDENT SERVISU IZNOSE 18,00% NA NETO ZARADU
          STUDENATA
        </h5>
        <h3 className="text-[42px] text-text font-semibold leading-normal">
          Kako se koristi naknada od 18,00%?
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        <SectionCard
          title="Naknada posredniku"
          amount="12,00"
          items={[
            "Posredovanje u studentskom zapošljavanju",
            "Osiguranje naplate od poslodavaca",
            "Korisnička podrška studentima",
          ]}
        />
        <SectionCard
          title="Zdravstveno i mirovinski stup"
          amount="5,50"
          items={[
            "5% doprinosa za Mirovinsko osiguranje",
            "0,5% doprinos za Zdravstveno osiguranje za slučaj ozljede na radu i profesionalne bolesti",
          ]}
        />
        <SectionCard
          title="Studentski standard"
          amount="0,50"
          items={[
            "Poboljšanje studentskog standarda",
            "Financiranje studentskih projekata",
            "Stipendiranje studenata",
          ]}
        />
      </div>
    </section>
  );
};

interface SectionCardProps {
  title: string;
  amount: string;
  items: string[];
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  return (
    <Card className="p-0">
      <div className="border-b border-gray-200 p-6">
        <p className="font-medium tracking-wide text-primary text-lg ml-4 mb-4">
          {props.title}
        </p>
        <div className="flex flex-wrap">
          <span className="text-light">%</span>
          <span className="font-semibold text-5xl text-text">
            {props.amount}
          </span>
          <span className="mt-auto text-light"> / po ugovoru</span>
        </div>
      </div>
      <div className="p-6">
        {props.items.map((item, index) => (
          <div key={item} className="flex items-start mb-4">
            <div className="w-[6px] h-[6px] bg-primary rounded-full mr-4 mt-2 ml-2"></div>
            <p className="text-light flex-1">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DavanjaPoslodavcaSection;
