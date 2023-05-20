"use client";

import { Order } from "@/app/utils/typings";
import Orders from "./Orders";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Link from "next/link";
import { dynamoClient } from "@/libs/dynamoClient";
import useSWR from "swr";
import { ColorRing } from "react-loader-spinner";

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
        <div className="absolute top-1/2 left-1/2">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
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
