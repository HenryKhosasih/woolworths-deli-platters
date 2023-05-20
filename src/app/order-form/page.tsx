"use client";

import { useEffect, useState } from "react";
import productsData from "../../../productsData";
import Product from "./components/Product";
import Form from "./components/Form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { reset } from "@/redux/features/cartSlice";
import SwipeDownOutlinedIcon from "@mui/icons-material/SwipeDownOutlined";

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isHintVisible, setIsHintVisible] = useState(false);

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.products);

  const listenToScroll = () => {
    const heightToHideFrom = document.body.clientHeight - 200;
    const winScroll = window.innerHeight + document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      setIsHintVisible(false);
    } else {
      setIsHintVisible(true);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <main>
      <div
        className={"flex flex-col w-full min-h-screen max-w-6xl mx-auto p-10"}
      >
        <Link href="/" onClick={() => dispatch(reset())}>
          <div className="fixed top-5 left-10 bg-primarydark text-[#fff] p-2 rounded-md hover:opacity-70 flex items-center">
            <ArrowBackIcon fontSize="large" />
            <span className="m-1 hidden sm:inline">Back</span>
          </div>
        </Link>
        <h1 className="text-2xl">Order Form</h1>

        <div className="mt-5 flex gap-6 flex-wrap justify-center">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        {cart.length > 0 && <Form />}
        {cart.length > 0 && isHintVisible && (
          <div className="fixed bottom-10 right-10 bg-primarylight rounded-full p-2 sm:p-4 animate-bounce">
            <SwipeDownOutlinedIcon fontSize="large" className="text-white" />
          </div>
        )}
      </div>
    </main>
  );
}
