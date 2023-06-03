"use client";

import Image from "next/image";
import StraightIcon from "@mui/icons-material/Straight";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full bg-[#171c1f] flex p-8 justify-between items-center">
      <Image
        src="https://cdn0.woolworths.media/content/content/icon-header-logo-only.png"
        width={50}
        height={50}
        alt="woolworths-logo"
      />

      <p className="text-white text-xs text-center mx-6 leading-6">
        Made with ❤ by{" "}
        <Link
          href="https://www.linkedin.com/in/henry-khosasih-613902119/"
          target="_blank"
          className="p-1 rounded-sm whitespace-nowrap bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900"
        >
          @Henry Khosasih
        </Link>
      </p>

      <button
        className="bg-[#24292C] text-white text-sm rounded-lg p-4 hover:bg-[#373e43]"
        onClick={scrollToTop}
      >
        <span className="hidden sm:inline-block">Back to top</span>
        <StraightIcon />
      </button>
    </div>
  );
};
export default Footer;
