"use client";

import { useEffect, useState } from "react";
import mockProducts from "../../../mockProducts";
import Product from "./components/Product";
import Form from "./components/Form";
import { useAppSelector } from "@/redux/hooks";

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);

  const cart = useAppSelector((state) => state.cart.products);

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  return (
    <main>
      <div
        className={"flex flex-col w-full min-h-screen max-w-6xl mx-auto p-10"}
      >
        <h1 className="text-2xl">Order Form</h1>
        <div className="mt-5 flex gap-6 flex-wrap justify-center">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        {cart.length > 0 && <Form />}
      </div>
    </main>
  );
}
