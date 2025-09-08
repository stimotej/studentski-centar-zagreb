import Image from "next/image";
import React, { useState } from "react";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import DisplayHTML from "../elements/DisplayHTML";
import BlueCard from "../shared/BlueCard";

interface InfoTogglesProps {
  className?: string;
}

const items = [
  {
    id: 1,
    image: "/slike/smjestaj/ikone/prijava.png",
    title: "Prijava",
    content: `<p><b>Dobrodošli na web sustav Studentskog centra u Zagrebu koji je namijenjen studentima koji koriste usluge smještaja, rada putem Student servisa te sportske sadržaje Studentskog centra u Zagrebu. </b></p>
<div>
<p>Ovdje možete pristupiti sljedećim uslugama:</p>
<ul>
<li>predati molbu za subvencionirani smještaj u studentskome domu</li>
<li>uvid u detaljno bodovanje predanih dokumenata za subvencionirani smještaj u studentskome domu</li>
<li>rezervirati smještaj nakon objave rezultata natječaja</li>
<li>preuzeti potvrdu o neostvarenom pravu na smještaj (u svrhu smještaja u učeničkom domu)</li>
<li>platiti karticom smještaj u studentskome domu (nakon potvrđene rezervacije / useljenja u studentski dom)</li>
<li>koristiti neke od usluga Student servisa (novi ugovor, pregled ugovora, ispis potvrda, zarada po godinama)</li>
<li>pretraživati poslodavce</li>
<li>platiti i rezervirati termin za sportske usluge</li>
</ul>`,
  },
  {
    id: 2,
    image: "/slike/smjestaj/ikone/kontakti.png",
    title: "Kontakti",
    content: `<h3><strong>Poslovnica za smještaj studenata, turizam i sport (Savska cesta 25, u dvorištu)</strong></h3><p><br></p><p><strong>Radno vrijeme sa strankama: ponedjeljak – petak, 8 – 15:00 h;</strong></p><p><strong>e-mail:&nbsp;</strong><a rel="noopener noreferrer" href="mailto:poslovnica@sczg.hr"><strong>poslovnica@sczg.hr</strong></a></p><p><strong>Informacije tel: </strong>01 4593 582, 01 4593 641, 01 4593 570</p><p><br></p><p><strong>Voditeljica Poslovnice za smještaj studenata, turizam i sport:</strong></p><p>Natalija Injac</p><p>tel: 01 4590 710</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:poslovnica@sczg.hr">poslovnica@sczg.hr</a></p><p><br></p><p><strong>Samostalni referent&nbsp;za smještaj studenata u međunarodnoj razmjeni</strong>:</p><p>Petra Šarenić</p><p>tel: 01 4593 582</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:mobility@sczg.hr">mobility@sczg.hr</a></p><p><br></p><p><strong>Samostalni referent za turizam:</strong></p><p>Jasna Herceg</p><p>tel: 01 4590 816</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:turizam@sczg.hr">turizam@sczg.hr</a></p><p><br></p><p><strong>Samostalni referent za smještaj studenata:</strong></p><p>Kristina Kovač</p><p>tel: 01 4593 641</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:poslovnica@sczg.hr">poslovnica@sczg.hr</a></p><p><br></p><p><strong>Poslovnica za smještaj studenata, turizam i sport:</strong></p><p>tel: 01 4593 570</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:poslovnica@sczg.hr">poslovnica@sczg.hr</a></p><p><br></p><p><strong>Šef odjela za sport:</strong></p><p>Dinko Hodak&nbsp;&nbsp;</p><p>tel: 01 4590 806</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:sport-rekreacija@sczg.hr">sport-rekreacija@sczg.hr</a></p><p><br></p><p><strong>Koordinator za sport:&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Boris Ciglenečki</p><p>tel: 01 4590 806</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:sport-rekreacija@sczg.hr">sport-rekreacija@sczg.hr</a></p><p><br></p><h3><strong>Ured sektora Studentski smještaj (Savska cesta 25, Uprava)</strong></h3><p><br></p><p><strong>Pomoćnik ravnatelja za sektor Studentski smještaj</strong></p><p>Vlado Levak</p><p><br></p><p><strong>Tajnica sektora Studentski smještaj:</strong></p><p>tel: 01 4593 639</p><p>e-mail:&nbsp;<a rel="noopener noreferrer" href="mailto:smjestaj@sczg.hr">smjestaj@sczg.hr</a></p>`,
  },
  {
    id: 3,
    image: "/slike/smjestaj/ikone/cjenik.png",
    title: "Cjenik",
    content: `<p>Cjenici smještaja:</p>
<ul>
<li><a href="https://www.sczg.unizg.hr/wp-content/uploads/2025/06/Subvencionirani-smjestaj.pdf">Subvencionirani smještaj</a></li>
<li><a target="_blank" href="https://www.sczg.unizg.hr/wp-content/uploads/2025/06/Nesubvencionirani-smjestaj-.pdf" rel="noopener">Nesubvencionirani smještaj</a></li>
</ul>
<p style="text-align: justify;"><span>Subvencionirani cjenik smještaja odnosi se na studente-stanare koji su ostvarili pravo na smještaj putem Natječaja&nbsp;za raspodjelu mjesta redovitim studentima za subvencionirano stanovanje u studentske domove Studentskog centra u Zagrebu&nbsp;ili putem posebnih odluka Ministarstva znanosti, obrazovanja i mladih te time stekli pravo na subvenciju troškova smještaja u studentskom domu Studentskog centra u Zagrebu.<o:p></o:p></span></p>
<p style="text-align: justify;"><span>Nesubvencionirani cjenik primjenjuje se prilikom naplate smještaja studenata koji ne ostvaruju pravo na subvenciju stanarine od strane Ministarstva znanosti, obrazovanja i mladih, npr. dolaze u sklopu međunarodne (Erasmus, fakultetska bilateralna razmjena…) ili međusveučilišne razmjene. </span></p>`,
  },
  //   {
  //     id: 4,
  //     image: "/slike/smjestaj/ikone/pravilnici_za_natjecaj.png",
  //     title: "Pravilnici za natječaj",
  //     content: `<p align="center"><b>N A T J E Č A J</b></p>
  // <p><b> </b></p>
  // <p align="center"><b>za raspodjelu mjesta redovitim studentima za subvencionirano stanovanje u studentske domove Studentskog centra u Zagrebu u akademskoj godini 2021./2022.</b></p>
  // <p align="center"><b>I OPĆE ODREDBE</b></p>
  // <p><b> </b></p>
  // <p>Pravo na subvencionirani smještaj u studentskom domu u akademskoj 2021./2022. godini imaju:</p>
  // <ol>
  // <li>redoviti studenti, državljani Republike Hrvatske,</li>
  // <li>redoviti studenti, državljani zemalja članica EU s prijavljenim boravkom u RH,</li>
  // <li>osobe sukladno Zakonu o međunarodnoj i privremenoj zaštiti, koje su upisane na visokim učilištima u RH,</li>
  // <li>studenti s invaliditetom poslijediplomskih sveučilišnih studija.</li>
  // </ol>`,
  //   },
  {
    id: 4,
    image: "/slike/smjestaj/ikone/domski_internet.png",
    title: "Domski internet",
    content: `<p style="text-align: left;"><span style="color: #ffffff;"><strong><span color="green"><em>Pristup Domskom Internetu u studentskim naseljima</em></span></strong></span></p>
<p><span style="color: #ffffff;"><em><strong><a target="_blank" href="http://www.eduroam.hr/installer.php" rel="noopener" style="color: #ffffff;"> eduroam installer</a></strong></em> </span>omogućuje krajnjim korisnicima jednostavno i pouzdano konfiguriranje uređaja (računala, prijenosnika, pametnog telefona) za pristup mreži po eduroam standardu.</p>
<p>Osim za pristup bežičnoj mreži može se koristiti i pri konfiguraciji uređaja za pristup žičanoj mreži.</p>`,
  },
];

const InfoToggles: React.FC<InfoTogglesProps> = (props) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <BlueCard className={props.className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ToggleCard
            key={item.id}
            active={activeCard === item.id}
            onClick={() =>
              item.id === activeCard
                ? setActiveCard(null)
                : setActiveCard(item.id)
            }
            image={item.image}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
      {activeCard ? (
        <div className="mt-6 hidden lg:block">
          <DisplayHTML
            html={items.find((item) => item.id === activeCard)?.content || ""}
            className="white-links"
          />
        </div>
      ) : null}
    </BlueCard>
  );
};

interface ToggleCardProps {
  active: boolean;
  onClick: () => void;
  image: string;
  title: string;
  content: string;
}

const ToggleCard: React.FC<ToggleCardProps> = (props) => {
  return (
    <div className="flex-1">
      <div className="bg-white p-8 rounded-lg">
        <Image
          src={props.image}
          alt={props.title}
          width={90}
          height={90}
          className="w-[90px] h-[90px] object-contain mx-auto"
        />
        <div className="text-text font-semibold uppercase text-xs tracking-wider text-center mt-6">
          {props.title}
        </div>
      </div>
      <button
        onClick={props.onClick}
        className="flex w-full py-4 items-center justify-between gap-4 text-xs uppercase font-medium tracking-wider"
      >
        Više informacija
        {props.active ? (
          <MdRemoveCircle className="text-white/60" size={16} />
        ) : (
          <MdAddCircle className="text-white/60" size={16} />
        )}
      </button>
      {props.active ? (
        <div className="mt-6 lg:hidden">
          <DisplayHTML html={props.content} className="white-links" />
        </div>
      ) : null}
    </div>
  );
};

export default InfoToggles;
