import Button from "@/components/elements/Button";
import DisplayHTML from "@/components/elements/DisplayHTML";
import BlueCard from "@/components/shared/BlueCard";
import Card from "@/components/shared/Card";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import Section from "@/components/shared/Section";
import SectionTitle from "@/components/shared/SectionTitle";
import ImageGallery from "@/components/smjestaj/ImageGallery";
import { usePost } from "@/features/posts";
import clearHtmlFromString from "@/utils/clearHtmlFromString";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const DormitoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: obavijest, isLoading } = usePost(
    (Array.isArray(slug) ? slug[0] : slug) || ""
  );

  const postCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const postsContainerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleScrollPosts = (scrollBy: number, index: number) => {
    postsContainerRefs.current[index]?.scrollBy({
      left: scrollBy,
      behavior: "smooth",
    });
  };

  if (!isLoading && !obavijest)
    return (
      <Layout>
        <div className="flex flex-col gap-12 items-center justify-center mt-20">
          <p className="text-lg text-light">Nije pronađen studentski dom</p>
          <Button onClick={() => router.back()} className="mx-auto">
            Povratak
          </Button>
        </div>
      </Layout>
    );
  return (
    <Layout
      title={clearHtmlFromString(obavijest?.title.rendered || "")}
      description={clearHtmlFromString(obavijest?.excerpt.rendered || "")}
      bottomComponent={
        <>
          <SectionTitle title="Fotografije" className="mt-24" />
          {!obavijest?.meta.image_groups ? (
            <p className="text-center text-light">Nema fotografija za prikaz</p>
          ) : (
            <ImageGallery imageGroups={obavijest.meta.image_groups} />
          )}

          <Section>
            <SectionTitle title="Lokacija" className="mt-12" />
            <div className="mb-12">
              <DisplayHTML html={obavijest?.meta.lokacija || ""} />
            </div>

            <BlueCard
              title="Natječaj za smještaj 2022/2023"
              description="Za prijavu na natječaj za studentski smještaj prijavite se putem linka  nastavku."
              className="my-12"
              action={{
                title: "Prijava za natječaj",
                href: "https://natjecaj.sczg.hr/student",
                isRegularLink: true,
              }}
            />
          </Section>
        </>
      }
    >
      <PageTitle
        title={clearHtmlFromString(obavijest?.title.rendered || "")}
        subtitle={
          clearHtmlFromString(obavijest?.excerpt.rendered || "") ? (
            <DisplayHTML html={obavijest?.excerpt.rendered || ""} />
          ) : null
        }
      />
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {!!obavijest?.meta.sadrzaj && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">
              Popratni sadržaj
            </h5>
            <DisplayHTML html={obavijest.meta.sadrzaj} className="text-light" />
          </Card>
        )}
        {!!obavijest?.meta.kontakt && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">Kontakt</h5>
            <DisplayHTML html={obavijest.meta.kontakt} className="text-light" />
          </Card>
        )}
        {!!obavijest?.meta.radno_vrijeme_blagajni && (
          <Card>
            <h5 className="font-semibold text-text text-lg mb-2">
              Radno vrijeme blagajni
            </h5>
            <DisplayHTML
              html={obavijest.meta.radno_vrijeme_blagajni}
              className="text-light"
            />
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DormitoryPage;
