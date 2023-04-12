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
    content: `<h4><span style="color: #ffffff;"><strong>Poslovnica za smještaj studenata, turizam i sport (Savska cesta 25, u dvorištu)</strong></span></h4>
<p><strong>Radno vrijeme sa strankama: ponedjeljak – petak, 8 – 15:00 h;</strong></p>
<p><strong>e-mail:<span>&nbsp;</span><a href="mailto:poslovnica@sczg.hr">poslovnica@sczg.hr</a></strong></p>
<p><strong>Upraviteljica Poslovnice za smještaj studenata, turizam i sport:<br></strong>Natalija Injac<br>tel: <a href="tel:01%204593 570">01 4593 570</a><br>e-mail:&nbsp;<a href="mailto:poslovnica@sczg.hr">poslovnica@sczg.hr</a></p>
<p><strong>Samostalni referent<span>&nbsp;</span>za smještaj studenata u međunarodnoj razmjeni</strong>:<br>Petra Šarenić<br>tel: <a href="tel:01%204593 582">01 4593 582</a><br>e-mail:<span>&nbsp;</span><a href="mailto:vlado.levak@sczg.hr"></a><a href="mailto:mobility@sczg.hr">mobility@sczg.hr</a></p>
<p><strong>Samostalni referent za turizam:<br></strong>Jasna Herceg<br>tel: <a href="tel:01%204590 816">01 4590 816</a><strong><br></strong>e-mail:&nbsp;<a href="mailto:turizam@sczg.hr">turizam@sczg.hr</a></p>
<p><strong>Samostalni referent za smještaj studenata i platni promet:</strong><br>Dominik Zrno<br>tel: <a href="tel:01%204593 641">01 4593 641</a><br>e-mail:&nbsp;<a href="mailto:natalija.injac@sczg.hr"></a><a href="mailto:poslovnica@sczg.hr">poslovnica@sczg.hr</a></p>
<p><strong>Šef odjela za sport:<br></strong>Dinko Hodak<br>tel: <a href="tel:01%204590 806">01 4590 806</a><br>e-mail:<span>&nbsp;</span><a href="mailto:sport-rekreacija@sczg.hr">sport-rekreacija@sczg.hr</a></p>
<p><strong>Koordinator za sport:&nbsp;</strong><br>Boris Ciglenečki<br>tel: <a href="tel:01%204590 806">01 4590 806</a><br>e-mail:&nbsp;<a href="mailto:sport-rekreacija@sczg.hr">sport-rekreacija@sczg.hr</a></p>
<h4><span style="color: #ffffff;"><strong>Ured sektora Studentski smještaj (Savska cesta 25, Uprava)</strong></span><strong></strong></h4>
<p><strong>Pomoćnik ravnatelja za sektor Studentski smještaj</strong><br>Vlado Levak</p>
<p><strong>Tajnica sektora Studentski smještaj:</strong><br>Božica Garić<br>tel: 01 4593 639<br>e-mail:&nbsp;<a href="mailto:smjestaj@sczg.hr">smjestaj@sczg.hr</a></p>`,
  },
  {
    id: 3,
    image: "/slike/smjestaj/ikone/cjenik.png",
    title: "Cjenik",
    content: `<p>Cjenici smještaja:</p>
<ul>
<li><a href="http://161.53.174.14/wp-content/uploads/2022/09/subvencionirani-cjenik-2022.pdf">Subvencionirani smještaj</a></li>
<li><a target="_blank" href="http://161.53.174.14/wp-content/uploads/2022/09/nesubvencionirani-cjenik-2022.pdf" rel="noopener">Nesubvencionirani smještaj</a></li>
</ul>
<p style="text-align: justify;"><span>Subvencionirani cjenik smještaja odnosi se na studente-stanare koji su ostvarili pravo na smještaj putem Natječaja&nbsp;za raspodjelu mjesta redovitim studentima za subvencionirano stanovanje u studentske domove Studentskog centra u Zagrebu&nbsp;ili putem posebnih odluka Ministarstva znanosti i obrazovanja te time stekli pravo na subvenciju troškova smještaja u studentskom domu Studentskog centra u Zagrebu.<o:p></o:p></span></p>
<p style="text-align: justify;"><span>Nesubvencionirani cjenik primjenjuje se prilikom naplate smještaja studenata koji ne ostvaruju pravo na subvenciju stanarine od strane Ministarstva znanosti i obrazovanja, npr. dolaze u sklopu međunarodne (Erasmus, fakultetska bilateralna razmjena…) ili međusveučilišne razmjene. </span></p>`,
  },
  {
    id: 4,
    image: "/slike/smjestaj/ikone/pravilnici_za_natjecaj.png",
    title: "Pravilnici za natječaj",
    content: `<p align="center"><b>N A T J E Č A J</b></p>
<p><b> </b></p>
<p align="center"><b>za raspodjelu mjesta redovitim studentima za subvencionirano stanovanje u studentske domove Studentskog centra u Zagrebu u akademskoj godini 2021./2022.</b></p>
<p align="center"><b>I OPĆE ODREDBE</b></p>
<p><b> </b></p>
<p>Pravo na subvencionirani smještaj u studentskom domu u akademskoj 2021./2022. godini imaju:</p>
<ol>
<li>redoviti studenti, državljani Republike Hrvatske,</li>
<li>redoviti studenti, državljani zemalja članica EU s prijavljenim boravkom u RH,</li>
<li>osobe sukladno Zakonu o međunarodnoj i privremenoj zaštiti, koje su upisane na visokim učilištima u RH,</li>
<li>studenti s invaliditetom poslijediplomskih sveučilišnih studija.</li>
</ol>`,
  },
  {
    id: 5,
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
