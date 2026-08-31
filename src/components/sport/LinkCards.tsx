import clsx from "clsx";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import Card from "../shared/Card";
import { useUI } from "@/utils/ui";

interface LinkCardsProps {
  className?: string;
}

const LinkCards: React.FC<LinkCardsProps> = (props) => {
  const ui = useUI();
  return (
    <section
      className={clsx("grid grid-cols-1 md:grid-cols-2 gap-4", props.className)}
    >
      <SectionCard
        title={ui("sport.recreational")}
        links={[
          {
            title: ui("sport.yearRound"),
            href: "#rekreacijske-aktivnosti-informacije-cjelogodisnje",
          },
          {
            title: ui("sport.occasional"),
            href: "#rekreacijske-aktivnosti-informacije-povremene",
          },
          {
            title: ui("sport.photos"),
            href: "#rekreacijske-aktivnosti-slike",
          },
        ]}
      />
      <SectionCard
        title={ui("sport.educational")}
        links={[
          {
            title: ui("sport.sporting"),
            href: "#edukacijske-aktivnosti-informacije-sportske",
          },
          {
            title: ui("sport.professional"),
            href: "#edukacijske-aktivnosti-informacije-strucne",
          },
          {
            title: ui("sport.photos"),
            href: "#edukacijske-aktivnosti-slike",
          },
        ]}
      />
      <SectionCard
        title={ui("sport.competitive")}
        links={[
          {
            title: ui("sport.information"),
            href: "#natjecateljske-aktivnosti-informacije",
          },
          {
            title: ui("sport.photos"),
            href: "#natjecateljske-aktivnosti-slike",
          },
        ]}
      />
      <SectionCard
        title={ui("sport.social")}
        links={[
          {
            title: ui("sport.information"),
            href: "#zabavne-aktivnosti-informacije",
          },
          {
            title: ui("sport.photos"),
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
