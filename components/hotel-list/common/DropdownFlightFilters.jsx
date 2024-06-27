
'use client'

import { useState } from "react";
import RatingFilter from "./RatingFilter";
import PirceSlider from "@/components/flight-list/sidebar/PirceSlider";
import { flightAvailResult } from "@/features/hero/flightSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";

const DropdownFlightFilters = (props) => {
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const [priceValue, setPriceValue] = useState("Price");
  const [amenitiesValue, setAmenitiesValue] = useState("Cabin Class");
  const [styleValue, setStyleValue] = useState("Stops");

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
      title: "Cabin Class",
      value: amenitiesValue,
      options: ["Swimming pool", "Laundry", "Outdoor spaces", "Security"],
      onChange: handleAmenitesValueChange,
    },
    {
      title: "Stops",
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
  const { totalPages,filterParam } = useSelector((state) => state.flight);
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePageClick = (cabimClass) => {

    if(props.type === "return")
    {
      const updateCabin = flightAvailRQ.filterParam.returnStops;
      const cabimClassExists = updateCabin.includes(cabimClass.toString());
      const updatedCabin = cabimClassExists
        ? updateCabin.filter((page) => page !== cabimClass.toString())
        : [...updateCabin, cabimClass.toString()];
      dispatch(
        updateFlightAvailRQ({
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            returnStops: updatedCabin,
            returnPageNumber: 0,
          },
        })
      );
  
      dispatch(
        flightAvailResult({
          flightAvailRQ: {
            ...flightAvailRQ,
            filterParam: {
              ...flightAvailRQ.filterParam,
              returnStops: updatedCabin,
              returnPageNumber: 0,
            },
          },
          router,
          undefined,
        })
      );}
    else
    {
      const updateCabin = flightAvailRQ.filterParam.stops;
      const cabimClassExists = updateCabin.includes(cabimClass.toString());
      const updatedCabin = cabimClassExists
        ? updateCabin.filter((page) => page !== cabimClass.toString())
        : [...updateCabin, cabimClass.toString()];
    dispatch(
      updateFlightAvailRQ({
        ...flightAvailRQ,
        filterParam: {
          ...flightAvailRQ.filterParam,
          stops: updatedCabin,
          pageNumber: 0,
        },
      })
    );

    dispatch(
      flightAvailResult({
        flightAvailRQ: {
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            stops: updatedCabin,
            pageNumber: 0,
          },
        },
        router,
        undefined,
      })
    );
    }
    };

    const handleCabinClick = (cabimClass) => {
    
    if(props.type === "return")
    {
    
      const updateCabin = flightAvailRQ.filterParam.returnCabin;
    
      // Check if cabimClass exists in updateCabin
      const cabimClassExists = updateCabin.includes(cabimClass.toString());
    
      // Remove or add cabimClass based on its existence
      const updatedCabin = cabimClassExists
        ? updateCabin.filter((page) => page !== cabimClass.toString())
        : [...updateCabin, cabimClass.toString()];
      dispatch(
        updateFlightAvailRQ({
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            returnCabin: updatedCabin,
            returnPageNumber: 0,
          },
        })
      );
  
      dispatch(
        flightAvailResult({
          flightAvailRQ: {
            ...flightAvailRQ,
            filterParam: {
              ...flightAvailRQ.filterParam,
              returnCabin: updatedCabin,
              returnPageNumber: 0,
            },
          },
          router,
          undefined,
        })
      );}
    else
    {
    
      const updateCabin = flightAvailRQ.filterParam.cabin;
    
      // Check if cabimClass exists in updateCabin
      const cabimClassExists = updateCabin.includes(cabimClass.toString());
    
      // Remove or add cabimClass based on its existence
      const updatedCabin = cabimClassExists
        ? updateCabin.filter((page) => page !== cabimClass.toString())
        : [...updateCabin, cabimClass.toString()];
    dispatch(
      updateFlightAvailRQ({
        ...flightAvailRQ,
        filterParam: {
          ...flightAvailRQ.filterParam,
          cabin: updatedCabin,
          pageNumber: 0,
        },
      })
    );
    
    dispatch(
      flightAvailResult({
        flightAvailRQ: {
          ...flightAvailRQ,
          filterParam: {
            ...flightAvailRQ.filterParam,
            cabin: updatedCabin,
            pageNumber: 0,
          },
        },
        router,
        undefined,
      })
    );
    }
    };
      
      const renderPage = (cabimClass, isActive = false) => {
        
        const className = `size-40 flex-center rounded-full cursor-pointer ${
          isActive ? "bg-dark-1 text-white" : ""
        }`;
        return (
          <div key={cabimClass} className="row y-gap-10 items-center justify-between">
            <div className="col-auto">
              <div className="form-checkbox d-flex items-center">
                <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes(cabimClass)} onClick={() => handleCabinClick(cabimClass)} />
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
                <div className="text-15 ml-10">{cabimClass}</div>
              </div>
            </div>
          </div>
        );
      };
      const renderPages = () => {
       
        const pages = filterParam?.cabin.map((cabimClass) =>
          renderPage(cabimClass)
        );
        return pages;
      };

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
            {dropdown.value === "Price" ? (<PirceSlider type={props.type} filterParam={props.filterParam} />) : (dropdown.value === "Stops" ? (<>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes("0")} onClick={() => handlePageClick("0")} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Nonstop</div>
          </div>
        </div>
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">92</div>
        </div> */}
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes("1")} onClick={() => handlePageClick("1")} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">1 Stop</div>
          </div>
        </div>
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">45</div>
        </div> */}
      </div>
      {/* End .row */}
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" selected={flightAvailRQ.filterParam.cabin.includes("2")} onClick={() => handlePageClick("2")} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">2+ Stops</div>
          </div>
        </div>
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">21</div>
        </div> */}
      </div></>) : (renderPages()))}
            </div>
            {/* End dropdown-menu */}
          </div>
          {/* End dropdown */}
        </div>
      ))}

      {/* <RatingFilter /> */}
    </>
  );
};

export default DropdownFlightFilters;
