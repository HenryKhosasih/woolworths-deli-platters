"use client";

import { Product } from "@/app/utils/typings";
import Image from "next/image";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";

type Props = {
  product: Product;
};

const Product = ({ product: { id, image, price, name }, product }: Props) => {
  const [editing, setEditing] = useState(false);

  const dispatch = useAppDispatch();

  // get current product from store so that we can access its qty
  const selectedProduct = useAppSelector((state) =>
    state.cart.products.find((product) => product.id === id)
  );

  const handleAddToCart = () => {
    setEditing(!editing);
    dispatch(addToCart(product));
  };
  const handleRemoveQty = () => {
    if (selectedProduct?.quantity === 1) setEditing(!editing);
    dispatch(removeFromCart(product));
  };
  const handleAddQty = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col items-center w-full sm:w-56 border border-[#E0E0E0] rounded-lg p-3">
      <Image src={image} width={160} height={160} alt={`${name} image`} />
      <p className="text-2xl font-semibold my-7">${price}</p>
      <p className="p-3 text-center line-clamp-2 flex-grow">{name}</p>
      {!editing ? (
        <button
          className="bg-primarylight text-[#fff] font-bold w-full rounded-lg p-3 text-sm mt-16 hover:opacity-70"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      ) : (
        <div className="flex bg-primarylight w-full rounded-lg px-3 border border-primarylight justify-center mt-16">
          <button className="hover:opacity-70" onClick={handleRemoveQty}>
            <RemoveIcon className="text-[#fff] mr-1" />
          </button>
          <input
            type="number"
            className="w-full sm:w-32 h-[42px] text-center outline-none bg-[#F2F3F0]"
            value={selectedProduct?.quantity || 0}
            readOnly
          />
          <button className="hover:opacity-70" onClick={handleAddQty}>
            <AddIcon className="text-[#fff] ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
