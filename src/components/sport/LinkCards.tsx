import clsx from "clsx";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import Card from "../shared/Card";

interface LinkCardsProps {
  className?: string;
}

const LinkCards: React.FC<LinkCardsProps> = (props) => {
  return (
    <section
      className={clsx("grid grid-cols-1 md:grid-cols-2 gap-4", props.className)}
    >
      <SectionCard
        title="REKREACIJSKE AKTIVNOSTI"
        links={[
          {
            title: "CJELOGODIŠNJE",
            href: "#rekreacijske-aktivnosti-informacije-cjelogodisnje",
          },
          {
            title: "POVREMENE",
            href: "#rekreacijske-aktivnosti-informacije-povremene",
          },
          {
            title: "SLIKE",
            href: "#rekreacijske-aktivnosti-slike",
          },
        ]}
      />
      <SectionCard
        title="EDUKACIJSKE AKTIVNOSTI"
        links={[
          {
            title: "SPORTSKE",
            href: "#edukacijske-aktivnosti-informacije-sportske",
          },
          {
            title: "STRUČNE",
            href: "#edukacijske-aktivnosti-informacije-strucne",
          },
          {
            title: "SLIKE",
            href: "#edukacijske-aktivnosti-slike",
          },
        ]}
      />
      <SectionCard
        title="NATJECATELJSKE AKTIVNOSTI"
        links={[
          {
            title: "INFORMACIJE",
            href: "#natjecateljske-aktivnosti-informacije",
          },
          {
            title: "SLIKE",
            href: "#natjecateljske-aktivnosti-slike",
          },
        ]}
      />
      <SectionCard
        title="ZABAVNE AKTIVNOSTI"
        links={[
          {
            title: "INFORMACIJE",
            href: "#zabavne-aktivnosti-informacije",
          },
          {
            title: "SLIKE",
            href: "#zabavne-aktivnosti-slike",
          },
        ]}
      />
    </section>
  );
};

interface SectionCardProps {
  title: string;
  links: { title: string; href: string }[];
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  return (
    <Card className="flex-1 w-full">
      <h3 className="text-sm font-bold uppercase tracking-wider">
        {props.title}
      </h3>
      <div className="mt-4 flex flex-col">
        {props.links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="flex items-center whitespace-nowrap justify-between border-b border-primary/10 py-3 px-2 font-medium text-light last:border-none  hover:bg-light/5"
          >
            {link.title}
            <MdChevronRight size={24} className="text-primary" />
          </a>
        ))}
      </div>
    </Card>
  );
};

export default LinkCards;
