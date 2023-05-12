import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-center items-center p-4 border-b-[0.5px]">
      <span className="hidden sm:inline text-3xl font-light text-primarydark mx-2">
        Woolworths
      </span>
      <Image
        src="https://cdn0.woolworths.media/content/content/icon-header-logo-only.png"
        width={50}
        height={50}
        alt="woolworths-logo"
      />
    </div>
  );
};
export default Header;
