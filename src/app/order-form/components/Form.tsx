"use client";

import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "@/app/utils/date";
import { v4 as uuidv4 } from "uuid";
import { dynamoClient } from "@/libs/dynamoClient";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/app/utils/typings";
import { useRouter } from "next/navigation";
import { toSeconds } from "@/app/utils/time";
import { reset } from "@/redux/features/cartSlice";

type FormData = {
  name: string;
  phone: string;
  pickupDate: Date;
  pickupTime: string;
};

const DAYS_NOTICE = 1;

const Form = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const earliestDate = addDays(new Date(), DAYS_NOTICE);

  const productsInCart = useAppSelector((state) => state.cart.products);

  const onSubmit = handleSubmit(async (data: FormData) => {
    const { name, phone, pickupDate, pickupTime } = data;
    const products = productsInCart.map(
      ({ id, image, name, price, quantity }: Product) => {
        return { id, image, name, price, quantity };
      }
    );
    const pickupDateUnixSecond = pickupDate.getTime() / 1000;
    const ttl = pickupDateUnixSecond + toSeconds(pickupTime);

    const params = {
      TableName: "orders",
      Item: {
        id: uuidv4(),
        phone,
        name,
        pickupDate: pickupDateUnixSecond,
        pickupTime,
        products,
        TTL: ttl,
      },
    };

    try {
      await dynamoClient.put(params);
      dispatch(reset());
      alert("Successfully added new orders!");
      router.replace("/");
    } catch (err) {
      console.error(
        "An error occurred. Check the console for further information",
        err
      );
    }
  });
  return (
    <div className="mt-20 flex flex-col">
      <form onSubmit={onSubmit} className="flex flex-col space-y-4 sm:mx-auto">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              className="orderInput"
              placeholder="Liam Johnson"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Phone</label>
            <input
              type="number"
              {...register("phone", {
                required: true,
                pattern:
                  /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/,
              })}
              className="orderInput"
              placeholder="0451234567"
            />
            {errors.phone?.type === "required" && (
              <p className="text-red-500">Phone is required</p>
            )}
            {errors.phone?.type === "pattern" && (
              <p className="text-red-500">Invalid phone format</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
          <div className="flex flex-col">
            <label>Date of pick up</label>
            <Controller
              control={control}
              name="pickupDate"
              render={({ field }) => (
                <ReactDatePicker
                  required
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={earliestDate}
                  dateFormat="dd/MM/yyyy"
                  className="orderInput w-full"
                  placeholderText={earliestDate.toLocaleDateString("en-AU")}
                />
              )}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label>
              Time of pick up{" "}
              <span className="text-[10px] text-primarydark">09:00-18:00</span>
            </label>
            <input
              type="time"
              {...register("pickupTime")}
              // override padding due to match sibling input height
              className="orderInput p-[11px]"
              step="600"
              min="09:00"
              max="18:00"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primarylight p-4 text-[#fff] rounded-md"
        >
          Put Order
        </button>
      </form>
    </div>
  );
};
export default Form;
