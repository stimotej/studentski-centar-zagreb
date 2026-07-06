import bannerOtp from "../../../public/slike/otp/OTP_Bank_eIndeks_Banner.jpg";
import bannerZaba from "../../../public/slike/mstudent/mstudent_PPD_970x250px.jpg";
import bannerRba from "../../../public/slike/rba/RBA_Young_and_Free_Banner.jpg";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";

// Order matters: cycling through this array reproduces RBA-OTP-RBA-ZABA-RBA-OTP-RBA-ZABA...
const banners = [
  {
    id: 1,
    img: bannerRba,
    alt: "RBA Young&Free tekući račun",
    url: "https://www.rba.hr/hr/gradani/proizvodi-i-usluge/racuni-i-kartice/paketi-usluga/young-and-free.html?utm_source=StudentskiZagreb&utm_medium=display&utm_campaign=Publicis_2026_SC_Zagreb&utm_content=Various",
  },
  {
    id: 2,
    img: bannerOtp,
    alt: "OTP e-Index studentski paket",
    url: "https://www.otpbanka.hr/digitalni-paket/e-indeks/",
  },
  {
    id: 3,
    img: bannerRba,
    alt: "RBA Young&Free tekući račun",
    url: "https://www.rba.hr/hr/gradani/proizvodi-i-usluge/racuni-i-kartice/paketi-usluga/young-and-free.html?utm_source=StudentskiZagreb&utm_medium=display&utm_campaign=Publicis_2026_SC_Zagreb&utm_content=Various",
  },
  {
    id: 4,
    img: bannerZaba,
    alt: "Zagrebačka banka m-student",
    url: "https://www.zaba.hr/home/m-student",
  },
];

const STORAGE_KEY = "last_banner";

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeBanner, setActiveBanner] = useState<
    (typeof banners)[number] | null
  >(null);

  useEffect(() => {
    let bannerToSet;
    const lastBannerId = window.localStorage.getItem(STORAGE_KEY);

    if (!lastBannerId) {
      bannerToSet = banners[0];
    } else {
      const foundBannerIndex = banners.findIndex(
        (b) => b.id === parseInt(lastBannerId)
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
    <div className="z-[49] fixed left-0 right-0 bottom-0 animate-slide-in h-auto bg-black/50 backdrop-blur-2xl">
      <div className="relative container md:max-w-[80%] mx-auto px-6 md:px-0">
        {activeBanner.url ? (
          <a target="_blank" rel="noopener noreferrer" href={activeBanner.url}>
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
          onClick={() => setIsOpen(false)}
          title="Zatvori oglas"
          aria-label="Zatvori oglas"
        >
          <MdClose size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
