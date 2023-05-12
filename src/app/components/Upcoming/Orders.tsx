import { Order } from "@/app/utils/typings";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  orders: Order[];
};

const Orders = ({ orders }: Props) => {
  return (
    <div className="mt-5 text-[#fff] space-y-6">
      {orders.map((order) => (
        <div className="flex p-4 space-x-10 bg-primarylight">
          <div className="flex flex-col m-auto">
            <p className="text-lg">{order.pickupDate}</p>
            <p className="flex-grow text-center text-2xl">4PM</p>
          </div>
          <div className="flex-grow">
            <ul>
              {order.products.map((product) => (
                <li className="tracking-widest">
                  {product.quantity} x {product.name}
                </li>
              ))}
            </ul>
          </div>
          <ClearIcon />
        </div>
      ))}
    </div>
  );
};
export default Orders;
