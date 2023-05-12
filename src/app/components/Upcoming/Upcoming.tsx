"use client";

import { useEffect, useState } from "react";
import mockOrders from "../../../../mockOrders";
import { Order } from "@/app/utils/typings";
import Orders from "./Orders";

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
      className={`flex flex-col w-full h-screen max-w-6xl mx-auto p-10 ${
        orders.length === 0 && "items-center justify-center"
      }`}
    >
      <h1 className="text-2xl">Upcoming Orders</h1>
      {orders.length > 0 ? (
        <Orders orders={orders} />
      ) : (
        <p className="text-2xl">No upcoming orders</p>
      )}
    </div>
  );
};
export default Upcoming;
