import { toEpochMilli } from "@/app/utils/date";
import { Order } from "@/app/utils/typings";
import { dynamoClient } from "@/libs/dynamoClient";
import ClearIcon from "@mui/icons-material/Clear";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { mutate } from "swr/_internal";

type Props = {
  order: Order;
  mutate: () => void;
};

const OrderDisplay = ({
  order: { id, pickupDate, pickupTime, name, products, phone },
}: Props) => {
  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="flex flex-col border border-[#E0E0E0] rounded-sm">
            <h1 className="p-4 font-semibold text-lg bg-primarylight text-white">
              Delete order
            </h1>
            <p className="p-4 pb-10 border-b border-b-[#E0E0E0]">
              Delete <span className="font-semibold">{name}</span>&apos;s order
              on{" "}
              <span className="font-semibold">
                {new Date(toEpochMilli(pickupDate)).toLocaleDateString("en-AU")}
              </span>
              ? <br />
              This action cannot be reversed.
            </p>
            <div className="flex p-2 justify-end gap-4">
              <button
                onClick={onClose}
                className="p-2 px-4 hover:bg-[#E0E0E0] rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const params = {
                    TableName: "orders",
                    Key: {
                      id,
                      phone,
                    },
                  };
                  try {
                    await dynamoClient.delete(params);
                    mutate("/api/orders");
                  } catch (err) {
                    console.error(
                      "An error occurred. Check the console for further information",
                      err
                    );
                  }
                  onClose();
                }}
                className="p-2 px-4 bg-primarydark text-white hover:bg-[#193d21] rounded-sm"
              >
                Delete
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div key={id} className="flex p-4 space-x-5 sm:space-x-10 bg-primarylight">
      <div className="flex flex-col m-auto">
        <p className="text-center text-lg">
          {new Date(toEpochMilli(pickupDate)).toLocaleDateString("en-AU")}
        </p>
        <p className="text-center text-lg">{pickupTime}</p>
        <p className="text-center text-xs">({name})</p>
      </div>
      <div className="flex-grow">
        <ul>
          {products.map(({ quantity, name }, i) => (
            <li key={i} className="text-sm sm:text-base tracking-widest">
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
