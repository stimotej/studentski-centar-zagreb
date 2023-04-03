import React from "react";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-light">
      <div className="flex items-center justify-between container md:max-w-[80%] mx-auto px-6 py-4 md:px-0">
        Studentski centar u Zagrebu | 2023
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com/sczagreb/">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.facebook.com/sczg.unizg">
            <FaFacebookSquare size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
