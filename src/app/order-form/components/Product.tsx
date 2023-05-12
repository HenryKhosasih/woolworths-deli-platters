import { Product } from "@/app/utils/typings";
import Image from "next/image";

type Props = {
  product: Product;
};

const Product = ({ product: { image, price, name } }: Props) => {
  return (
    <div className="flex flex-col items-center w-full sm:w-56 border border-[#E0E0E0] rounded-lg p-3">
      <Image src={image} width={160} height={160} alt={`${name} image`} />
      <p className="text-2xl font-semibold my-7">${price}</p>
      <p className="-3 text-center line-clamp-2">{name}</p>
      <button className="bg-primarylight text-[#fff] font-bold w-full rounded-lg p-3 text-sm mt-16 hover:opacity-70">
        Add to cart
      </button>
    </div>
  );
};
export default Product;
