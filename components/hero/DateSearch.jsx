
'use client'

import { updateHotelCriteria, updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";

const DateSearch = ({cutOfDayss,stayInDayss}) => {
  const { flightAvailRQ, hotelCriteria } = useSelector((state) => state.searchCriteria);
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const { cutOfDays, stayInDays, startDate, endDate } = useSelector((state) => state.searchCriteria) || {};
  const { locationList, loading } = useSelector((state) => state.flight);
  const dispatch = useDispatch(); // Hook to dispatch actions
  // const [dates, setDates] = useState([
  //   new DateObject({ year: 2023, month: 1, day: 22 }),
  //   "December 09 2020",
  //   1597994736000, //unix time in milliseconds (August 21 2020)
  // ]);
  
  const [date, setDate] = useState(new DateObject(hotelCriteria.startDate));
  const [dates, setDates] = useState([
    new DateObject(hotelCriteria.startDate),//.add((cutOfDays), "day"),
    new DateObject(hotelCriteria.endDate)//.add((cutOfDays+stayInDays), "day"),
  ]);
  // Dispatch action to update startDate and endDate in the Redux store
  const updateSearchCriteria = (newDates) => {
    if(currentTab !== HOTEL_TAB_NAME && flightAvailRQ.searchParam.tripType === "ONE_WAY"){
      setDate(newDates);
      dispatch(
        updateHotelCriteria({
          ...hotelCriteria,
          startDate: new Date(newDates).toISOString(),
          // startDate: newDates,//.format("dd-mm-yyyy"), // Modify the format as needed
        })
      );
      dispatch(
        updateFlightAvailRQ({
            ...flightAvailRQ,
            searchParam: {
              ...flightAvailRQ.searchParam,
              startDate: new Date(newDates).toISOString(),
            },
        })
      );}
    else{
      setDates(newDates);
      if(newDates.length > 1)
      {
        dispatch(
          updateHotelCriteria({
            ...hotelCriteria,
            startDate: new Date(newDates[0]).toISOString(),
            endDate: new Date(newDates[1]).toISOString(),
            // startDate: newDates[0],//.format("dd-mm-yyyy"), // Modify the format as needed
            // endDate: newDates[1]//.format("dd-mm-yyyy"),     // Modify the format as needed
          })
        );
        dispatch(
          updateFlightAvailRQ({
              ...flightAvailRQ,
              searchParam: {
                ...flightAvailRQ.searchParam,
                startDate: new Date(newDates[0]).toISOString(),
                endDate: new Date(newDates[1]).toISOString(),
              },
          })
        );
      }
    }
  };
var single = single;
var range = range;

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={currentTab !== HOTEL_TAB_NAME && flightAvailRQ.searchParam.tripType === "ONE_WAY" ? date :dates}
        onChange={(newDates) => {
          // Update the Redux store when the dates change
          updateSearchCriteria(newDates);
        }}
        minDate={new DateObject()}
        maxDate={new DateObject().add(6, "month")}
        numberOfMonths={currentTab !== HOTEL_TAB_NAME && flightAvailRQ.searchParam.tripType === "ONE_WAY" ? 1 : 2}
        offsetY={10}
        range= {currentTab === HOTEL_TAB_NAME? true : flightAvailRQ.searchParam.tripType !== "ONE_WAY"}
        single= {currentTab === HOTEL_TAB_NAME ? false : flightAvailRQ.searchParam.tripType === "ONE_WAY"}
        rangeHover= {currentTab === HOTEL_TAB_NAME ? true :flightAvailRQ.searchParam.tripType !== "ONE_WAY"}
        format="MMM DD"
      />
    </div>
  );
};

export default DateSearch;
