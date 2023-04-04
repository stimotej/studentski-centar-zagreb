import DisplayHTML from "@/components/elements/DisplayHTML";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { type NextPage } from "next";
import Image from "next/image";
import React from "react";

const PlacanjeStanarineOnLinePutemPage: NextPage = () => {
  return (
    <Layout
      title="Plaćanje stanarine on-line putem"
      description="Omogućeno je plaćanje smještaja u studentskim domovima on-line putem tokom cijele akademke godine. Student na ovaj način može platiti sva dosadašnja dugovanja, kao i stanarinu za mjesec unaprijed."
    >
      <PageTitle
        title="Plaćanje stanarine on-line putem"
        subtitle="Omogućeno je plaćanje smještaja u studentskim domovima on-line putem tokom cijele akademke godine. Student na ovaj način može platiti sva dosadašnja dugovanja, kao i stanarinu za mjesec unaprijed."
      />
      <Step
        number={1}
        image="/sczg/slike/smjestaj/placanje-stanarine/korak_1.png"
        content={`<div class="et_pb_blurb_description"><p><strong>Pristupiti osobnom profilu putem linka:</strong><span>&nbsp;</span><a target="_blank" href="https://natjecaj.sczg.hr/student/login.ashx" rel="noopener">https://natjecaj.sczg.hr/student/login.ashx</a></p></div>`}
      />
      <Step
        number={2}
        image="/sczg/slike/smjestaj/placanje-stanarine/korak_2.jpg"
        content={`<p><strong>Nakon prijave u osobni profil, kliknuti na „<em>Naplata smještaja</em>“.</strong></p>`}
      />
      <Step
        number={3}
        image="/sczg/slike/smjestaj/placanje-stanarine/korak_3.jpg"
        content={`<p><strong>U srednjem dijelu ekrana potrebno je odabrati što se plaća, na način da se odabir potvrdi klikom na praznu kučicu.</strong></p>`}
      />
      <Step
        number={4}
        image="/sczg/slike/smjestaj/placanje-stanarine/korak_4.jpg"
        content={`<p><strong>Sa desne strane vidljiva je opcija „Plaćanje odabranih usluga“ na čiji se klik otvara obrazac za plaćanje stanarine (sukladno odabranim opcijama).</strong></p>`}
      />
      <Step
        number={5}
        image="/sczg/slike/smjestaj/placanje-stanarine/korak_5.jpg"
        content={`<p><strong>U obrazac potrebno je unijeti broj kartice, datum isteka i kontrolni broj. Ako su ti podaci ispravno upisani, transakciju je potrebno potvrditi nekim oblikom tokena (čitač kartice, mtoken – kao i na svakom web plaćanju).</strong></p>`}
      />

      <Card className="text-text text-center my-12 font-medium">
        <p>
          Ukoliko je transakcija uspješna, student može dohvatiti račun u PDF
          obliku.
        </p>
        <p className="mt-3">
          Ako se na formi za plaćanje prikaže da je transakcija uspješna, a na
          ekranu za rezervaciju smještaja bude pogreška kako transakcija nije
          uspjela - došlo je do pogreške kod kreiranja računa. Student bi u tom
          slučaju trebao kontaktirati Poslovnicu SC-a putem e-maila
          (poslovnica@sczg.hr) te navesti svoje osobne podatke (ime, prezime,
          OIB), broj rezervacije i kratak opis što je pošlo krivo (poželjna je
          preslika ekrana), kako bi se transakcija ručno stornirala.
        </p>
        <p className="mt-3">
          Napomena: nije moguće platiti stanarinu za mjesec unaprijed ukoliko
          nisu podmirena sva ranije pristigla dugovanja.
        </p>
      </Card>
    </Layout>
  );
};

interface StepProps {
  number: number;
  image: string;
  content: string;
}

const Step: React.FC<StepProps> = (props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-12 items-start mt-10">
      <Card className="!rounded-full font-bold text-2xl text-primary flex items-center justify-center !w-20 !h-20">
        {props.number}
      </Card>
      <Card>
        <Image
          src={props.image}
          alt={`Plaćanje stanarine korak ${props.number}`}
          width={400}
          height={200}
          className="mx-auto mb-6"
        />
        <DisplayHTML
          html={props.content}
          className="text-center text-light font-normal"
        />
      </Card>
    </div>
  );
};

export default PlacanjeStanarineOnLinePutemPage;
