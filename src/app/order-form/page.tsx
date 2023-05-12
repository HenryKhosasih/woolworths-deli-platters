"use client";

import { useEffect, useState } from "react";
import mockProducts from "../../../mockProducts";
import Product from "./components/Product";

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // const data = fetch("");
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);
  return (
    <main>
      <div
        className={"flex flex-col w-full min-h-screen max-w-6xl mx-auto p-10"}
      >
        <h1 className="text-2xl">Platters</h1>
        <div className="mt-5 flex gap-6 flex-wrap">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
