"use client";

import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "@/app/utils/date";

type FormData = {
  name: string;
  phone: string;
  pickupDate: Date;
  pickupTime: string;
};

const DAYS_NOTICE = 1;

const Form = () => {
  const {
    control,
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
      <form onSubmit={onSubmit} className="flex flex-col space-y-4 mx-auto">
        <div className="flex space-x-5">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              className="orderInput"
              placeholder="Brad Banducci"
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
        <div className="flex space-x-5">
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
                  className="orderInput"
                  placeholderText={earliestDate.toLocaleDateString()}
                />
              )}
            />
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
          className="w-full bg-primarylight p-4 text-[#fff] rounded-md"
        >
          Put Order
        </button>
      </form>
    </div>
  );
};
export default Form;
