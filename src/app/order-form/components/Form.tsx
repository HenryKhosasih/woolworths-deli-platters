"use client";

import { useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "@/app/utils/date";

type FormData = {
  name: string;
  phone: string;
  pickupDate: string;
  pickupTime: string;
};

const DAYS_NOTICE = 1;

const Form = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const earliestDate = addDays(new Date(), DAYS_NOTICE);
  const [startDate, setStartDate] = useState(earliestDate);
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <div className="mt-20 flex flex-col">
      <form onSubmit={onSubmit} className="flex flex-col space-y-2 mx-auto">
        <div className="flex space-x-5">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              {...register("name")}
              className="orderInput"
              placeholder="Brad Banducci"
            />
          </div>
          <div className="flex flex-col">
            <label>Phone</label>
            <input
              type="number"
              {...register("phone")}
              className="orderInput"
              placeholder="0451234567"
            />
          </div>
        </div>
        <div className="flex space-x-5">
          <div className="flex flex-col flexgro">
            <label>Date of pick up</label>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => date && setStartDate(date)}
              minDate={earliestDate}
              dateFormat="dd/MM/yyyy"
              className="orderInput"
            />
            {/* <input
              type="date"
              {...register("pickupDate")}
              className="orderInput"
              min={}
            /> */}
          </div>
          <div className="flex flex-col flex-grow">
            <label>
              Time of pick up{" "}
              <span className="text-[10px] text-primarydark">09:00-22:00</span>
            </label>
            <input
              type="time"
              {...register("pickupTime")}
              className="orderInput"
              min="09:00"
              max="22:00"
              value="13:00"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primarylight p-4 text-[#fff] rounded-md "
          onClick={() => {}}
        >
          Put Order
        </button>
      </form>
    </div>
  );
};
export default Form;
