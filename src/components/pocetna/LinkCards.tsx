import React from "react";
import { MdChevronRight } from "react-icons/md";
import Card from "../shared/Card";
import CustomLink from "../elements/CustomLink";
import { useUI, type UIKey } from "@/utils/ui";

const buildSlides = (ui: (key: UIKey) => string) => [
  {
    title: ui("cards.prehranaUpper"),
    links: [
      { title: "+385 1 4593 654", href: "tel:+385 1 4593 654" },
      { title: ui("cards.restaurants"), href: "/prehrana#restorani" },
      {
        title: ui("common.questionsAndHelp"),
        href: "/prehrana#pitanja-i-pomoc",
      },
    ],
  },
  {
    title: ui("cards.studentServisUpper"),
    links: [
      { title: ui("cards.signIn"), href: "/student-servis#prijava" },
      {
        title: ui("cards.becomeMember"),
        href: "/student-servis#clanstvo",
      },
      { title: ui("cards.jobs"), href: "/poslovi" },
    ],
  },
  {
    title: ui("cards.smjestajUpper"),
    links: [
      { title: ui("cards.contact"), href: "/informacije/kontakti/" },
      { title: ui("cards.tender"), href: "/smjestaj#natjecaj" },
      {
        title: ui("cards.settlements"),
        href: "/smjestaj#studentski-domovi",
      },
    ],
  },
];
const LinkCards: React.FC = () => {
  const ui = useUI();
  const slides = buildSlides(ui);
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row flex-wrap py-4">
      {slides.map((slide, index) => (
        <SingleCard key={index} title={slide.title} links={slide.links} />
      ))}
    </div>
  );
};

interface Link {
  title: string;
  href: string;
}

interface SingleCardProps {
  title: string;
  links: Link[];
}

const SingleCard = ({ title, links }: SingleCardProps) => {
  const ui = useUI();
  const slides = buildSlides(ui);
  return (
    <Card className="flex-1 w-full">
      <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
      <div className="mt-4 flex flex-col">
        {links.map((link, index) => (
          <CustomLink
            key={index}
            href={link.href}
            className="flex items-center whitespace-nowrap justify-between border-b border-primary/10 py-3 px-2 font-medium text-light last:border-none  hover:bg-light/5"
          >
            {link.title}
            <MdChevronRight size={24} className="text-primary" />
          </CustomLink>
        ))}
      </div>
    </Card>
  );
};

export default LinkCards;
