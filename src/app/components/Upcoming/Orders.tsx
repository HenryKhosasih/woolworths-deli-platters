import { Order } from "@/app/utils/typings";
import OrderDisplay from "./OrderDisplay";

type Props = {
  orders: Order[];
};

const Orders = ({ orders }: Props) => {
  return (
    <div className="mt-5 text-[#fff] space-y-6">
      {orders
        .sort((a, b) => a.pickupDate - b.pickupDate)
        .map((order) => (
          <OrderDisplay key={order.id} order={order} />
        ))}
    </div>
  );
};
export default Orders;
