
'use client'

import { myBookings, updateFilterParam } from "@/features/hero/bookingSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bookings, filterParam, loading, totalPages, totalBookings } = useSelector((state) => state.booking);

  const handleDateChange = (BookingRefNumber) => {
    dispatch(
      updateFilterParam({
          ...filterParam,
          BookingRefNumber: BookingRefNumber.toUpperCase(),
      })
      );
      dispatch(myBookings({ filterParam : {
      ...filterParam,
      BookingRefNumber: BookingRefNumber.toUpperCase(),
  }, router, undefined }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleDateChange(event.currentTarget[0].value);
  };

  return (
    <form
      onClick={handleSubmit}
      className="w-230 single-field relative d-flex items-center"
    >
      <input
        className="pl-50 bg-white text-dark-1 h-50 rounded-8"
        type="text"
        placeholder="Search by Ref Number"
        required        
        onChange={(e) => {
          handleDateChange(e.target.value);
        }}
      />
      <button type="submit" className="absolute d-flex items-center h-full">
        <i className="icon-search text-20 px-15 text-dark-1" />
      </button>
    </form>
  );
};

export default SearchBox;
