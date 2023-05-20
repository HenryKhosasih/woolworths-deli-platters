"use client";

import { useEffect, useState } from "react";
import { Order } from "@/app/utils/typings";
import Orders from "./Orders";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Link from "next/link";
import { dynamoClient } from "@/libs/dynamoClient";

const Upcoming = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const now = new Date().getTime() / 1000;
      const res = await dynamoClient.scan({
        TableName: "orders",
        ExpressionAttributeNames: {
          "#customerName": "name",
          "#expiryDate": "TTL",
        },
        ExpressionAttributeValues: {
          ":now": now,
        },
        FilterExpression: "#expiryDate >= :now",
        ProjectionExpression:
          "id, #customerName, pickupDate, pickupTime, products",
      });
      if (res.Items) {
        setOrders(res.Items as Order[]);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto h-screen p-10">
      <h1 className="text-2xl">Upcoming Orders</h1>
      {orders?.length > 0 ? (
        <Orders orders={orders} />
      ) : (
        <p className="text-lg">No upcoming orders</p>
      )}
      <Link href="/order-form">
        <div className="fixed top-5 right-10 bg-primarydark text-[#fff] p-2 rounded-md hover:opacity-70 flex items-center">
          <span className="m-1 hidden sm:inline">New Order</span>
          <AddBoxIcon fontSize="large" />
        </div>
      </Link>
    </div>
  );
};
export default Upcoming;
