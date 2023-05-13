"use client";

import { Product } from "@/app/utils/typings";
import Image from "next/image";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  product: Product;
};

const Product = ({ product: { image, price, name } }: Props) => {
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex flex-col items-center w-full sm:w-56 border border-[#E0E0E0] rounded-lg p-3">
      <Image src={image} width={160} height={160} alt={`${name} image`} />
      <p className="text-2xl font-semibold my-7">${price}</p>
      <p className="p-3 text-center line-clamp-2 flex-grow">{name}</p>
      {!editing ? (
        <button
          className="bg-primarylight text-[#fff] font-bold w-full rounded-lg p-3 text-sm mt-16 hover:opacity-70"
          onClick={() => setEditing(!editing)}
        >
          Add to cart
        </button>
      ) : (
        <div className="flex bg-primarylight w-full rounded-lg px-3 border border-primarylight justify-center mt-16">
          <button className="hover:opacity-70">
            <RemoveIcon className="text-[#fff] mr-1" />
          </button>
          <input
            type="number"
            className="w-32 h-[42px] text-center outline-none bg-[#F2F3F0]"
          />
          <button className="hover:opacity-70">
            <AddIcon className="text-[#fff] ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};
export default Product;
