import Image from "next/image";
import React from "react";
import ButtonLink from "../elements/ButtonLink";
import Card from "../shared/Card";

interface LoginLinksSectionProps {
  className?: string;
}

const LoginLinksSection: React.FC<LoginLinksSectionProps> = (props) => {
  return (
    <section className={props.className}>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex flex-col gap-3 flex-1">
          <h4 className="text-primary text-sm font-medium tracking-wider uppercase">
            POSREDNIK U STUDENTSKOM ZAPOŠLJAVANJU
          </h4>
          <h2 className="text-text font-semibold text-4xl">Student servis</h2>
          <p className="text-light leading-loose">
            Student servis obavlja ulogu propisanu Zakonom o obavljanju
            studentski poslova (NN 96/18, 16/20) Republike Hrvatske i u tome
            zastupa studente u potraživanju zarade za obavljeni posao prema
            poslodavcima. Pri zapošljavanju studenata zaključuje se ugovor o
            djelu koji Student servis, kao posrednik, izdaje poslodavcima.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/slike/student-servis/student-servis-prijava.png"
            alt="Student servis"
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-12">
        <LoginLinkCard
          title="STUDENT"
          description="Korisnički profil studenta omogućuje uređivanje profila studenta, pretraživanje poslova, izdavanje ugovora, statuse isplata, ažuriranje podataka i korisničku podršku."
          link={{
            href: "/prijava-student",
            title: "PRIJAVA STUDENT",
            isRegularLink: true,
          }}
        />
        <LoginLinkCard
          title="POSLODAVAC"
          description="Korisnički profil poslodavca omogućuje objavu poslova, upravljanje postojećim poslovima, pregled prijavljenih kandidata, pregled studentskih ugovora i računa."
          link={{
            href: "/prijava-poslodavac",
            title: "PRIJAVA POSLODAVAC",
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
