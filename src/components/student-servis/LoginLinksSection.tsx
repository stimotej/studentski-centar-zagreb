import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";
import { useUI } from "@/utils/ui";

interface LoginLinksSectionProps {
  className?: string;
}

const LoginLinksSection: React.FC<LoginLinksSectionProps> = (props) => {
  const ui = useUI();
  return (
    <section className={props.className}>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex flex-col gap-3 flex-1">
          <h4 className="text-primary text-sm font-medium tracking-wider uppercase">
            {ui("ss.intermediary")}
          </h4>
          <h2 className="text-text font-semibold text-4xl">
            {ui("ss.pageTitle")}
          </h2>
          <p className="text-light leading-loose">{ui("ss.legalRole")}</p>
        </div>
        <div className="flex-1">
          <Image
            src="/slike/student-servis/student-servis-prijava.png"
            alt={ui("ss.pageTitle")}
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        <LoginLinkCard
          title={ui("login.student")}
          description={ui("login.studentProfileFull")}
          link={{
            href: "/prijava-student",
            title: ui("login.studentSignIn"),
            isRegularLink: true,
          }}
        />
        <LoginLinkCard
          title={ui("login.employer")}
          description={ui("login.employerProfileFull")}
          link={{
            href: "/prijava-poslodavac",
            title: ui("login.employerSignIn"),
          }}
        />
      </div>
    </section>
  );
};

interface LoginLinkCardProps {
  title: string;
  description: string;
  link: { href: string; title: string; isRegularLink?: boolean };
}

const LoginLinkCard: React.FC<LoginLinkCardProps> = (props) => {
  return (
    <Card>
      <h4 className="uppercase text-text text-xl font-semibold">
        {props.title}
      </h4>
      <p className="text-light leading-loose mt-2">{props.description}</p>
      <ButtonLink
        href={props.link.href}
        className="mt-4"
        isRegularLink={props.link.isRegularLink}
      >
        {props.link.title}
      </ButtonLink>
    </Card>
  );
};

export default LoginLinksSection;
