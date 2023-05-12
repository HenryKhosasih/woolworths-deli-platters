import { Order } from "@/app/utils/typings";

const orders: Order[] = [
  {
    id: "1",
    name: "Henry",
    phone: "0452151182",
    orderDate: "12 May 2023",
    pickupDate: "18 May 2023",
    products: [
      {
        id: "123",
        name: "Absolutely Wrapped Meat Lovers",
        price: 40,
        quantity: 1,
      },
    ],
  },

  {
    id: "2",
    name: "John",
    phone: "0452158190",
    orderDate: "15 May 2023",
    pickupDate: "17 May 2023",
    products: [
      {
        id: "124",
        name: "Seafood Entertaining Platter",
        price: 60,
        quantity: 1,
      },
      {
        id: "123",
        name: "Absolutely Wrapped Meat Lovers",
        price: 40,
        quantity: 1,
      },
    ],
  },
];

export default orders;
