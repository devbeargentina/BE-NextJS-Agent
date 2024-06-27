
'use client'

import { updateHotelCriteria } from "@/features/hero/searchCriteriaSlice";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";

const DateSearch = ({cutOfDays,stayInDays,startDate,endDate}) => {
  const { hotelCriteria } = useSelector((state) => state.searchCriteria);
  const dispatch = useDispatch(); // Hook to dispatch actions
  // const [dates, setDates] = useState([
  //   new DateObject({ year: 2023, month: 1, day: 22 }),
  //   "December 09 2020",
  //   1597994736000, //unix time in milliseconds (August 21 2020)
  // ]);
  const [dates, setDates] = useState([
    (startDate? new DateObject(startDate) :new DateObject().add((cutOfDays), "day")),
    (endDate ? new DateObject(endDate) : new DateObject().add((cutOfDays+stayInDays), "day")),
  ]);

  // Dispatch action to update startDate and endDate in the Redux store
  const updateSearchCriteria = (startDate, endDate) => {
    dispatch(
      updateHotelCriteria({
        ...hotelCriteria,
        startDate: startDate?.format("YYYY-MM-DD"), // Modify the format as needed
        endDate: endDate?.format("YYYY-MM-DD"),     // Modify the format as needed
      })
    );
  };

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={(newDates) => {
          setDates(newDates);
          // Update the Redux store when the dates change
          updateSearchCriteria(newDates[0], newDates[1]);
        }}
        minDate={new DateObject()}
        maxDate={new DateObject().add(6, "month")}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD"
      />
    </div>
  );
};

export default DateSearch;
