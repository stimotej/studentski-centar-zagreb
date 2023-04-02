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

const StudentServisPage = () => {
  const { data: posts, isLoading } = usePosts({
    categories: [infoPostsCategoryId, infoPostsSS],
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

      <DavanjaPoslodavcaSection className="mb-24" />

      <DigitalnoPotpisivanjeSection className="mb-24" />

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
