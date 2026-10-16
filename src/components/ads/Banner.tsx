import bannerOtp from "../../../public/slike/otp/OTP_Paket_Young_Banner.jpg";
import bannerZaba from "../../../public/slike/mstudent/mstudent_PPD_970x250px.jpg";
import bannerRba from "../../../public/slike/rba/RBA_Young_and_Free_Banner.jpg";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useUI } from "@/utils/ui";
import { useBannerStats } from "./bannerStats";

// Order matters: cycling through this array reproduces RBA-OTP-RBA-ZABA-RBA-OTP-RBA-ZABA...
// `stats` is the name the banner is counted under (see ./bannerStats). Both RBA
// slots share one, so its numbers are per creative, not per slot. Give a new
// creative a new name, or its numbers merge with the one it replaced.
const banners = [
  {
    id: 1,
    stats: "rba-young-free",
    img: bannerRba,
    alt: "RBA Young&Free tekući račun",
    url: "https://www.rba.hr/hr/gradani/proizvodi-i-usluge/racuni-i-kartice/paketi-usluga/young-and-free.html?utm_source=StudentskiZagreb&utm_medium=display&utm_campaign=Publicis_2026_SC_Zagreb&utm_content=Various",
  },
  {
    id: 2,
    stats: "otp-paket-young",
    img: bannerOtp,
    alt: "OTP Paket Young",
    url: "https://www.otpbanka.hr/digitalni-paket/young/?&utm_source=sczg&utm_medium=display&utm_campaign=young_display&utm_content=image_970x250",
  },
  {
    id: 3,
    stats: "rba-young-free",
    img: bannerRba,
    alt: "RBA Young&Free tekući račun",
    url: "https://www.rba.hr/hr/gradani/proizvodi-i-usluge/racuni-i-kartice/paketi-usluga/young-and-free.html?utm_source=StudentskiZagreb&utm_medium=display&utm_campaign=Publicis_2026_SC_Zagreb&utm_content=Various",
  },
  {
    id: 4,
    stats: "zaba-m-student",
    img: bannerZaba,
    alt: "Zagrebačka banka m-student",
    url: "https://www.zaba.hr/home/m-student",
  },
];

const STORAGE_KEY = "last_banner";

export default function Banner() {
  const ui = useUI();
  const [isOpen, setIsOpen] = useState(true);
  const [activeBanner, setActiveBanner] = useState<
    (typeof banners)[number] | null
  >(null);
  const { ref, track } = useBannerStats(activeBanner?.stats);

  useEffect(() => {
    let bannerToSet;
    const lastBannerId = window.localStorage.getItem(STORAGE_KEY);

    if (!lastBannerId) {
      bannerToSet = banners[0];
    } else {
      const foundBannerIndex = banners.findIndex(
        (b) => b.id === parseInt(lastBannerId),
      );
      const nextBannerIndex =
        foundBannerIndex > -1 ? (foundBannerIndex + 1) % banners.length : 0;
      bannerToSet = banners[nextBannerIndex];
    }

    setActiveBanner(bannerToSet);
    window.localStorage.setItem(STORAGE_KEY, bannerToSet.id.toString());
  }, []);

  if (!isOpen || !activeBanner) return null;
  return (
    <div
      ref={ref}
      className="z-[49] fixed left-0 right-0 bottom-0 animate-slide-in h-auto bg-black/50 backdrop-blur-2xl"
    >
      <div className="relative container md:max-w-[80%] mx-auto px-6 md:px-0">
        {activeBanner.url ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={activeBanner.url}
            onClick={() => track("click")}
            // Middle-click opens in a new tab without firing onClick.
            onAuxClick={(e) => e.button === 1 && track("click")}
          >
            <Image
              src={activeBanner.img}
              alt={activeBanner.alt}
              className="mx-auto"
            />
          </a>
        ) : (
          <Image
            src={activeBanner.img}
            alt={activeBanner.alt}
            className="mx-auto"
          />
        )}
        <button
          className="absolute right-4 top-4"
          onClick={() => {
            track("close");
            setIsOpen(false);
          }}
          title={ui("ads.close")}
          aria-label={ui("ads.close")}
        >
          <MdClose size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
