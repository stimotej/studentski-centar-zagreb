import NextLink from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import Card from "../shared/Card";

const slides = [
  {
    title: "PREHRANA",
    links: [
      { title: "+385 1 4593 654", href: "tel:+385 1 4593 654" },
      { title: "Restorani", href: "/prehrana#restorani" },
      {
        title: "Pitanja i pomoć",
        href: "/prehrana#pitanja-i-pomoc",
      },
    ],
  },
  {
    title: "STUDENT SERVIS",
    links: [
      { title: "Prijava", href: "/student-servis#prijava" },
      {
        title: "Postani član",
        href: "/student-servis#clanstvo",
      },
      { title: "Poslovi", href: "/poslovi" },
    ],
  },
  {
    title: "SMJEŠTAJ",
    links: [
      { title: "Kontakt", href: "/informacije/kontakti/" },
      { title: "Natječaj", href: "/smjestaj#natjecaj" },
      {
        title: "Naselja",
        href: "/smjestaj#studentski-domovi",
      },
    ],
  },
];
const LinkCards: React.FC = () => {
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
  return (
    <Card className="flex-1 w-full">
      <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
      <div className="mt-4 flex flex-col">
        {links.map((link, index) => (
          <NextLink
            key={index}
            href={link.href}
            className="flex items-center whitespace-nowrap justify-between border-b border-primary/10 py-3 px-2 font-medium text-light last:border-none  hover:bg-light/5"
          >
            {link.title}
            <MdChevronRight size={24} className="text-primary" />
          </NextLink>
        ))}
      </div>
    </Card>
  );
};

export default LinkCards;
