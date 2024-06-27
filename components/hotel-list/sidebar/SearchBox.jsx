
'use client'
import { hotelAvailResult, updateHotelAvailRQ } from "@/features/hero/hotelSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = () => {
  const { hotelList,hotelAvailRQ, filterParam,loading } = useSelector((state) => state.hotel);
  
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    //console.log('Search Term:', searchTerm);
    dispatch(
      updateHotelAvailRQ({
          ...hotelAvailRQ,
          filterParam: {
            ...hotelAvailRQ.filterParam,
            hotelName: searchTerm,
            pageNumber: 0,
          },
      })
    );
    dispatch(hotelAvailResult({ hotelAvailRQ : {
      ...hotelAvailRQ,
      filterParam: {
        ...hotelAvailRQ.filterParam,
        hotelName: searchTerm,
        pageNumber: 0,
      },
  }, router, undefined }));
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="single-field relative d-flex items-center py-10">
        <input
          className="pl-50 border-light text-dark-1 h-50 rounded-8"
          type="text"
          placeholder="e.g. Best Western"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="absolute d-flex items-center h-full">
          <i className="icon-search text-20 px-15 text-dark-1" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
