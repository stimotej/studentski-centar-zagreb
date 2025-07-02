import React from "react";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-light">
      <div className="flex items-center flex-wrap gap-3 justify-between container md:max-w-[80%] mx-auto px-6 py-4 md:px-0">
        <span>
          Studentski centar u Zagrebu | {new Date().getFullYear()} | Izradio{" "}
          <a
            href="https://refresh.hr/"
            className="hover:text-white/80 active:text-white/60 hover:underline"
          >
            Refresh.hr
          </a>
        </span>
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/sczagreb/"
            className="hover:text-white/80 active:text-white/60"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.facebook.com/sczg.unizg"
            className="hover:text-white/80 active:text-white/60"
          >
            <FaFacebookSquare size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
