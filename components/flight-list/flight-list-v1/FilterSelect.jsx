
'use client'

import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterSelect = () => {
  
  const { totalPages,filterParam, flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePageClick = (value) => {
    dispatch(
      updateFlightAvailRQ({
        ...flightAvailRQ,
        searchParam: {
          ...flightAvailRQ.searchParam,
          tripType: value,
        },
      })
    );
    };
  const [economyValue, setEconomyValue] = useState("Economy");
  const [bagsValue, setBagsValue] = useState("0 Bags");

  const handleEconomyValueChange = (value) => {
    setEconomyValue(value);
  };

  const handleBagsValueChange = (value) => {
    setBagsValue(value);
  };

  const dropdownOptions = [
    {
      title: "Trip Type",
      value: flightAvailRQ.searchParam.tripType,
      list: [
        { label: "ONE_WAY" },
        { label: "ROUND_TRIP" },
      ],
      onChange: handlePageClick,
    },
    // {
    //   title: "Business Class",
    //   value: economyValue,
    //   list: [{ label: "Economy" }, { label: "Business" }],
    //   onChange: handleEconomyValueChange,
    // },
    // {
    //   title: "Bags",
    //   value: bagsValue,
    //   list: [
    //     { label: "0 Bags" },
    //     { label: "1 Bag" },
    //     { label: "2 Bags" },
    //     { label: "3 Bags" },
    //     { label: "4 Bags" },
    //   ],
    //   onChange: handleBagsValueChange,
    // },
  ];

  return (
    <>
      {dropdownOptions.map((option, index) => (
        <div className="col-auto" key={index}>
          <div className="dropdown js-dropdown">
            <div
              className="dropdown__button d-flex items-center text-15"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              data-bs-offset="0,0"
            >
              <span className="js-dropdown-title">{option.value}</span>

              <i className="icon icon-chevron-sm-down text-7 ml-10" />
            </div>
            <div className="toggle-element -dropdown js-click-dropdown dropdown-menu">
              <div className="text-14 y-gap-15 js-dropdown-list">
                {option.list.map((item, index) => (
                  <div key={index}>
                    <div
                      role="button"
                      className={`${
                        item.label === option.value ? "text-blue-1 " : ""
                      }d-block js-dropdown-link`}
                      onClick={() => option.onChange(item.label)}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FilterSelect;
