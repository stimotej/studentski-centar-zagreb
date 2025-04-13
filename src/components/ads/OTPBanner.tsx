import banner1 from "../../../public/slike/otp/OTP_e-indeks_Studentski_970x250.jpg";
import banner2 from "../../../public/slike/otp/OTP_e-indeks_Studentski_1200x200.jpg";
import { useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";

export default function OTPBanner() {
  const [isOpen, setIsOpen] = useState(true);

  const randomImage = useMemo(() => {
    const images = [banner1, banner2];
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  if (!isOpen) return null;
  return (
    <div className="z-[9999] fixed left-0 right-0 bottom-0 animate-slide-in h-auto bg-black/50 backdrop-blur-2xl">
      <div className="relative container md:max-w-[80%] mx-auto px-6 md:px-0">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.otpbanka.hr/digitalni-paket/e-indeks/"
        >
          <Image
            src={randomImage}
            alt="OTP e-Index studentski paket"
            className="mx-auto"
          />
        </a>
        <button
          className="absolute right-4 top-4"
          onClick={() => setIsOpen(false)}
        >
          <MdClose size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
