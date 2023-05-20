import { toEpochMilli } from "@/app/utils/date";
import { Order } from "@/app/utils/typings";
import { dynamoClient } from "@/libs/dynamoClient";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  order: Order;
};

const OrderDisplay = ({
  order: { id, pickupDate, pickupTime, name, products, phone },
}: Props) => {
  const handleDelete = async () => {
    const params = {
      TableName: "orders",
      Key: {
        id,
        phone,
      },
    };

    try {
      await dynamoClient.delete(params);
      alert(`Successfully removed ${id} order`);
    } catch (err) {
      console.error(
        "An error occurred. Check the console for further information",
        err
      );
    }
  };

  return (
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
      <ClearIcon className="cursor-pointer" onClick={handleDelete} />
    </div>
  );
};
export default OrderDisplay;
