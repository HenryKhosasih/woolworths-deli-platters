"use client";

import Image from "next/image";
import StraightIcon from "@mui/icons-material/Straight";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full bg-[#171c1f] flex p-8 justify-between">
      <Image
        src="https://cdn0.woolworths.media/content/content/icon-header-logo-only.png"
        width={50}
        height={50}
        alt="woolworths-logo"
      />

      <button
        className="bg-[#24292C] text-[#fff] text-sm rounded-lg p-4 hover:bg-[#373e43]"
        onClick={scrollToTop}
      >
        Back to top
        <StraightIcon />
      </button>
    </div>
  );
};
export default Footer;
