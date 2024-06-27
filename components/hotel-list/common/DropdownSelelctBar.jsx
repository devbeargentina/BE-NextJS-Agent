
'use client'

import { useState } from "react";
import RatingFilter from "./RatingFilter";
import PirceSlider from "@/components/flight-list/sidebar/PirceSlider";

const DropdownSelelctBar = () => {
  const [priceValue, setPriceValue] = useState("Price");
  const [amenitiesValue, setAmenitiesValue] = useState("Amenities");
  const [styleValue, setStyleValue] = useState("Style");

  const handlePriceValueChange = (value) => {
    setPriceValue(value);
  };

  const handleAmenitesValueChange = (value) => {
    setAmenitiesValue(value);
  };

  const handleStyleChange = (value) => {
    setStyleValue(value);
  };

  const dropdowns = [
    {
      title: "Price",
      value: priceValue,
      options: ["Less than $500", "$500 - $1000", "$1000 - $2000", "$2000+"],
      onChange: handlePriceValueChange,
    },
    {
      title: "Amenities",
      value: amenitiesValue,
      options: ["Swimming pool", "Laundry", "Outdoor spaces", "Security"],
      onChange: handleAmenitesValueChange,
    },
    {
      title: "Style",
      value: styleValue,
      options: ["Modern", "Bohemian", "Minimalist", "Contemporary"],
      onChange: handleStyleChange,
    },
  ];

  // for neighborhood code

  const [selectedValues, setSelectedValues] = useState([]);

  const data = [
    { label: "Central London", value: "central_london" },
    { label: "Guests' favourite area", value: "favourite_area" },
    { label: "Westminster Borough", value: "westminster_borough" },
    { label: "Kensington and Chelsea", value: "kensington_and_chelsea" },
    { label: "Oxford Street", value: "oxford_street" },
  ];

  return (
    <>
      {dropdowns.map((dropdown, index) => (
        <div className="col-auto" key={index}>
          <div className="dropdown js-dropdown js-amenities-active">
            <div
              className="dropdown__button d-flex items-center text-14 rounded-100 border-light px-15 h-34"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
              data-bs-offset="0,10"
            >
              <span className="js-dropdown-title">{dropdown.value}</span>
              <i className="icon icon-chevron-sm-down text-7 ml-10" />
            </div>
            {/* End dropdown__button */}

            <div className="toggle-element -dropdown js-click-dropdown dropdown-menu">
            <PirceSlider />
              <div className="text-15 y-gap-15 js-dropdown-list">
                {dropdown.options.map((item, index) => (
                  <div key={index}>
                    <button
                      className={`${
                        item === dropdown.value ? "text-blue-1 " : ""
                      }d-block js-dropdown-link`}
                      onClick={() => dropdown.onChange(item)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* End dropdown-menu */}
          </div>
          {/* End dropdown */}
        </div>
      ))}

      <RatingFilter />
    </>
  );
};

export default DropdownSelelctBar;
