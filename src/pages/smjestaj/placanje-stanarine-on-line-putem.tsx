import DisplayHTML from "@/components/elements/DisplayHTML";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { type NextPage } from "next";
import Image from "next/image";
import React from "react";
import { useUI } from "@/utils/ui";

const PlacanjeStanarineOnLinePutemPage: NextPage = () => {
  const ui = useUI();
  return (
    <Layout title={ui("rent.title")} description={ui("rent.intro")}>
      <PageTitle title={ui("rent.title")} subtitle={ui("rent.intro")} />
      <Step
        number={1}
        image="/slike/smjestaj/placanje-stanarine/korak_1.png"
        content={`<div class="et_pb_blurb_description"><p><strong>{ui("rent.accessProfile")}</strong><span>&nbsp;</span><a target="_blank" href="https://natjecaj.sczg.hr/student/login.ashx" rel="noopener">https://natjecaj.sczg.hr/student/login.ashx</a></p></div>`}
      />
      <Step
        number={2}
        image="/slike/smjestaj/placanje-stanarine/korak_2.jpg"
        content={`<p><strong>{ui("rent.afterLogin")}<em>{ui("rent.charges")}</em>“.</strong></p>`}
      />
      <Step
        number={3}
        image="/slike/smjestaj/placanje-stanarine/korak_3.jpg"
        content={`<p><strong>{ui("rent.selectWhat")}</strong></p>`}
      />
      <Step
        number={4}
        image="/slike/smjestaj/placanje-stanarine/korak_4.jpg"
        content={`<p><strong>{ui("rent.rightSide")}</strong></p>`}
      />
      <Step
        number={5}
        image="/slike/smjestaj/placanje-stanarine/korak_5.jpg"
        content={`<p><strong>{ui("rent.cardDetails")}</strong></p>`}
      />

      <Card className="text-text text-center my-12 font-medium">
        <p>{ui("rent.receipt")}</p>
        <p className="mt-3">{ui("rent.errorContact")}</p>
        <p className="mt-3">{ui("rent.note")}</p>
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
