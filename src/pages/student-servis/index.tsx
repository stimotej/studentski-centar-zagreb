import React from "react";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { usePosts } from "@/features/posts";
import {
  infoPostsSS,
  infoSSPoslovniceCategory,
  infoSSAboutPost,
  infoSSInfoCategory,
  infoPostsCategoryId,
  faqStudentServisCategory,
  obavijestiStudentServisCategory,
} from "@/utils/constants";
import AboutSection from "@/components/student-servis/AboutSection";
import Spinner from "@/components/elements/Spinner";
import InfoPostCard from "@/components/shared/InfoPostCard";
import LoginLinksSection from "@/components/student-servis/LoginLinksSection";
import IconCardsSection from "@/components/student-servis/IconCardsSection";
import UgovaranjePoslaSection from "@/components/student-servis/UgovaranjePoslaSection";
import BlueCard from "@/components/shared/BlueCard";
import UnderConstructionTag from "@/components/shared/UnderConstructionTag";
import DavanjaPoslodavcaSection from "@/components/student-servis/DavanjaPoslodavcaSection";
import DigitalnoPotpisivanjeSection from "@/components/student-servis/DigitalnoPotpisivanjeSection";
import ClanstvoSection from "@/components/student-servis/ClanstvoSection";
import SectionTitle from "@/components/shared/SectionTitle";
import FAQCards from "@/components/shared/FAQCards";
import ButtonLink from "@/components/elements/ButtonLink";
import PagePosts from "@/components/shared/PagePosts";

const StudentServisPage = () => {
  const { data: posts, isLoading } = usePosts({
    categories: [infoPostsCategoryId, infoPostsSS, faqStudentServisCategory],
  });

  return (
    <Layout
      title="Student servis"
      description="Student servis studentskog centar Sveučilišta u Zagrebu posreduje u pronalasku studentskih poslova između studenata i poslodavaca. Pronađite najbolje poslove na oglasniku studentskih poslova."
    >
      {isLoading ? (
        <Spinner className="mt-12 mx-auto" />
      ) : (
        <>
          {(() => {
            const aboutPost = posts?.find(
              (post) => post.id === infoSSAboutPost
            );
            return (
              <AboutSection
                image={aboutPost?.image_url || ""}
                title={aboutPost?.title.rendered || ""}
                content={aboutPost?.content.rendered || ""}
                className="mt-12"
              />
            );
          })()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {posts
              ?.filter((post) =>
                post.categories.includes(infoSSPoslovniceCategory)
              )
              .map((post) => (
                <InfoPostCard
                  key={post.id}
                  title={post.title.rendered}
                  content={post.content.rendered}
                />
              ))}
          </div>
        </>
      )}

      <PagePosts category={obavijestiStudentServisCategory} className="mt-16" />

      <div id="prijava"></div>
      <LoginLinksSection className="mt-24 mb-24" />

      <PageTitle
        title="Student servis"
        subtitle="Student servis studentskog centar Sveučilišta u Zagrebu posreduje u pronalasku studentskih poslova između studenata i poslodavaca. Pronađite najbolje poslove na oglasniku studentskih poslova."
        action={{
          title: "PRETRAŽI POSLOVE",
          href: "/poslovi",
        }}
      />

      <IconCardsSection className="my-12" />

      {isLoading ? (
        <Spinner className="mt-12 mx-auto" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {posts
            ?.filter((post) => post.categories.includes(infoSSInfoCategory))
            .map((post) => (
              <InfoPostCard
                key={post.id}
                title={post.title.rendered}
                excerpt={post.excerpt.rendered}
                link={`/informacije/${post.slug}`}
              />
            ))}
        </div>
      )}

      <UgovaranjePoslaSection className="mb-12 mt-24" />

      {!!posts?.filter((item) =>
        item.categories.includes(faqStudentServisCategory)
      ).length && (
        <div className="mb-24">
          <SectionTitle title="Često postavljana pitanja" />
          <FAQCards
            items={
              posts
                .filter((item) =>
                  item.categories.includes(faqStudentServisCategory)
                )
                .slice(0, 8)
                .map((item) => ({
                  title: item.title.rendered,
                  content: item.content.rendered,
                })) || []
            }
            loading={isLoading}
          />
          {posts?.filter((item) =>
            item.categories.includes(faqStudentServisCategory)
          ).length > 8 && (
            <ButtonLink href="/student-servis/faq" className="mx-auto mt-6">
              Vidi sve
            </ButtonLink>
          )}
        </div>
      )}

      <DavanjaPoslodavcaSection className="mb-24" />

      <DigitalnoPotpisivanjeSection className="mb-24" />

      <div id="clanstvo"></div>
      <ClanstvoSection className="mb-24" />

      <BlueCard
        title="Članstvo poslodavaca u Student servis"
        description="Jednostavan sustav prijave ovih poslodavaca u bazu Studentskog centra u Zagrebu."
        action={{
          title: "PRIJAVA ČLANSTVO POSLODAVCI",
          href: "/registracija-poslodavac",
        }}
        className="mb-12"
      >
        <UnderConstructionTag className="mx-auto mt-8" white />
      </BlueCard>
    </Layout>
  );
};

export default StudentServisPage;
