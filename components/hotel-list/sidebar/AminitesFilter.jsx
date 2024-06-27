'use client'

import { hotelAvailResult, updateHotelAvailRQ } from "@/features/hero/hotelSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";

const AmenitiesFilter = () => {
  const { hotelList, hotelAvailRQ, filterParam, loading } = useSelector((state) => state.hotel);
  // const amenities = [
  //   { name: "Breakfast Included", count: 92 },
  //   { name: "Romantic", count: 45 },
  //   { name: "Airport Transfer", count: 21 },
  //   { name: "WiFi Included", count: 78 },
  //   { name: "5 Star", count: 679 },
  // ];

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleAmenityChange = (amenity) => {
    // Check if the amenity is already selected
    if (selectedAmenities.includes(amenity)) {
      // If selected, remove it from the array
      setSelectedAmenities((prevSelected) =>
        prevSelected.filter((selected) => selected !== amenity)
      );
    } else {
      // If not selected, add it to the array
      setSelectedAmenities((prevSelected) => [...prevSelected, amenity]);
    }
    dispatch(
      updateHotelAvailRQ({
          ...hotelAvailRQ,
          filterParam: {
            ...hotelAvailRQ.filterParam,
            amenities: selectedAmenities,
            pageNumber: 0,
          },
      })
    );
    dispatch(hotelAvailResult({ hotelAvailRQ : {
      ...hotelAvailRQ,
      filterParam: {
        ...hotelAvailRQ.filterParam,
        amenities: selectedAmenities,
        pageNumber: 0,
      },
  }, router, undefined }));

  };

  return (
    <>
      {filterParam?.amenities?.map((amenity, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{amenity}</div>
            </div>
          </div>
          {/* <div className="col-auto">
            <div className="text-15 text-light-1">{amenity.count}</div>
          </div> */}
        </div>
      ))}
    </>
  );
};

export default AmenitiesFilter;
