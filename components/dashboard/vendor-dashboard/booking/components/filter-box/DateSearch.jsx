
'use client'

import { myBookings, updateFilterParam } from "@/features/hero/bookingSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";

const DateSearch = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dates, setDates] = useState([new DateObject().add(-30, "day"), new DateObject().add(10, "day")]);
  const { bookings, filterParam, loading, totalPages, totalBookings } = useSelector((state) => state.booking);

  const handleDateChange = (startDate, endDate) => {
    if(startDate && endDate){
    dispatch(
      updateFilterParam({
          ...filterParam,
          StartDate: new Date(startDate).toISOString(),
          EndDate: new Date(endDate).toISOString(),
      })
      );
      dispatch(myBookings({ filterParam : {
      ...filterParam,
      StartDate: new Date(startDate).toISOString(),
      EndDate: new Date(endDate).toISOString(),
  }, router, undefined }));
}
  };

  return (
    <div className="w-230 single-field relative d-flex items-center ">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker date-input bg-white text-dark-1 h-50 rounded-8 pl-30"
        value={dates}
        // onChange={setDates}
        onChange={(newDates) => {
          setDates(newDates);
          // Update the Redux store when the dates change
          handleDateChange(newDates[0], newDates[1]);
        }}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMM DD"
      />

      <button className="absolute d-flex items-center h-full pointer-events-none">
        <i className="icon-calendar text-20 px-15 text-dark-1" />
      </button>
    </div>
  );
};

export default DateSearch;
