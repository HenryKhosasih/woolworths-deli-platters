import { toEpochMilli } from "@/app/utils/date";
import { Order } from "@/app/utils/typings";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  orders: Order[];
};

const Orders = ({ orders }: Props) => {
  return (
    <div className="mt-5 text-[#fff] space-y-6">
      {orders
        .sort((a, b) => a.pickupDate - b.pickupDate)
        .map(({ id, pickupDate, pickupTime, name, products }) => (
          <div key={id} className="flex p-4 space-x-10 bg-primarylight">
            <div className="flex flex-col m-auto">
              <p className="text-center text-lg">
                {new Date(toEpochMilli(pickupDate)).toLocaleDateString()}
              </p>
              <p className="text-center text-lg">{pickupTime}</p>
              <p className="text-center text-xs">{name}</p>
            </div>
            <div className="flex-grow">
              <ul>
                {products.map(({ quantity, name }, i) => (
                  <li key={i} className="tracking-widest">
                    {quantity} x {name}
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
