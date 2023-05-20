"use client";

import { Order } from "@/app/utils/typings";
import Orders from "./Orders";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Link from "next/link";
import { dynamoClient } from "@/libs/dynamoClient";
import useSWR from "swr";

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
      "id, #customerName, pickupDate, pickupTime, products, phone",
  });
  return res.Items as Order[];
};

const Upcoming = () => {
  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/orders", fetchOrders);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto h-screen p-10">
      <h1 className="text-2xl">Upcoming Orders</h1>
      {error && <p className="text-xl">Fail to fetch upcoming orders</p>}
      {isLoading ? (
        <p className="text-xl">Loading...</p>
      ) : orders?.length && orders.length > 0 ? (
        <Orders orders={orders} mutate={mutate} />
      ) : (
        <p className="text-lg mt-6">No upcoming orders</p>
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
