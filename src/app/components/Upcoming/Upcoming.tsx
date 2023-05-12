"use client";

import { useEffect, useState } from "react";
import mockOrders from "../../../../mockOrders";
import { Order } from "@/app/utils/typings";
import Orders from "./Orders";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Link from "next/link";

const Upcoming = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      // const data = await fetch("https://www.jsonkeeper.com/b/XESF").then(
      //   (res) => res.json()
      // );
      setOrders(mockOrders);
    };
    fetchOrders();
  }, []);
  return (
    <div
      className={`flex flex-col w-full max-w-6xl mx-auto h-screen p-10 ${
        orders.length === 0 && "items-center justify-center"
      }`}
    >
      <h1 className="text-2xl">Upcoming Orders</h1>
      {orders.length > 0 ? (
        <Orders orders={orders} />
      ) : (
        <p className="text-2xl">No upcoming orders</p>
      )}
      <Link href="/order-form">
        <div className="fixed top-5 right-10 bg-primarydark text-[#fff] p-2 rounded-md">
          <span className="m-1 hidden sm:inline">New Order</span>
          <AddBoxIcon fontSize="large" />
        </div>
      </Link>
    </div>
  );
};
export default Upcoming;
