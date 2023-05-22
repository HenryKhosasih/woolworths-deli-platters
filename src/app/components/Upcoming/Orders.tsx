import { Order } from "@/app/utils/typings";
import OrderDisplay from "./OrderDisplay";
import { toSeconds } from "@/app/utils/time";

type Props = {
  orders: Order[];
  mutate: () => void;
};

const Orders = ({ orders, mutate }: Props) => {
  console.log(orders);
  return (
    <div className="mt-5 text-[#fff] space-y-6">
      {orders
        .sort(
          (a, b) =>
            a.pickupDate - b.pickupDate ||
            toSeconds(a.pickupTime) - toSeconds(b.pickupTime)
        )
        .map((order) => (
          <OrderDisplay key={order.id} order={order} mutate={mutate} />
        ))}
    </div>
  );
};
export default Orders;
