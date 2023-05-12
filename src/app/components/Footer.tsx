import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-[#171c1f] flex p-8 justify-between">
      <Image
        src="https://cdn0.woolworths.media/content/content/icon-header-logo-only.png"
        width={50}
        height={50}
        alt="woolworths-logo"
      />
      <button className="bg-[#24292C] text-[#fff] text-sm rounded-lg p-4">
        Back to top
      </button>
    </div>
  );
};
export default Footer;
