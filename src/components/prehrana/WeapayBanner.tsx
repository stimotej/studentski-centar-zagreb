import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface WeapayBannerProps {
  className?: string;
}

const WeapayBanner: React.FC<WeapayBannerProps> = (props) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col md:flex-row gap-6 p-6 items-start bg-gradient-to-l rounded-lg from-[#0b1218] to-[rgba(43,52,61,.97)]",
        props.className
      )}
    >
      <Image
        src="/slike/prehrana/weapay_logo.png"
        alt="Weapay logo"
        width={100}
        height={74}
        className="w-[100px] h-auto object-cover"
      />
      <div>
        <h5 className="text-3xl uppercase font-bold tracking-wide text-white">
          PLATI BRŽE, UŽIVAJ DUŽE.
        </h5>
        <p className="text-white/50 font-medium tracking-wide mt-1">
          Digitalni studentski novčanik
        </p>
        <div className="flex gap-2 mt-4">
          <a href="https://apps.apple.com/app/weapay/id1592689129">
            <Image
              src="/slike/prehrana/app_store_download_button.png"
              alt="Weapay app store"
              width={120}
              height={36}
              className="w-[120px] h-auto object-cover"
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=wea.pay">
            <Image
              src="/slike/prehrana/google_play_download_button.png"
              alt="Weapay google play"
              width={120}
              height={36}
              className="w-[120px] h-auto object-cover"
            />
          </a>
        </div>
      </div>
      <Image
        src="/slike/prehrana/weapay_mockup.png"
        alt="Weapay mockup"
        width={300}
        height={260}
        className="w-[300px] h-auto object-cover absolute right-6 -bottom-12 invisible lg:visible"
      />
    </div>
  );
};

export default WeapayBanner;
