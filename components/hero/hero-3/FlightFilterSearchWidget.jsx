'use client'

import { useSelector, useDispatch } from "react-redux";
import DateSearch from "../DateSearch";
import LocationSearch from "./FlightLocationSearch";
import { useRouter } from "next/navigation";
import FlightGuestSearch from "./FlightGuestSearch";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";
import { useRef } from "react";

const FlightFilterSearchWidget = () => {
  const flightRef = useRef();
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { destinationLocationCode,
  destinationLocationName,
  originLocationCode,
  originLocationName,
  adult,
  child,
  infant,
  startDate,
  endDate,
tripType } = flightAvailRQ.searchParam;
  
  const dispatch = useDispatch();
  const Router = useRouter();
  const handleSearch = () => {
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
    if(destinationLocationCode && destinationLocationName && originLocationCode && originLocationName)
    {
        Router.push(`/flight-list-v1/${destinationLocationCode}/${destinationLocationName}/${originLocationCode}/${originLocationName}/${formattedStartDate}/${formattedEndDate}/${adult}-${child}-${infant}`)
    }
    else{
      
      const validationResultsFlight = flightRef.current.checkValidation();
    }
  }
  
  const handleTriptypeChange = (value) => {
    dispatch(
      updateFlightAvailRQ({
          ...flightAvailRQ,
          searchParam: {
            ...flightAvailRQ.searchParam,
            tripType:value,
          },
      })
    );
  };
  return (
      <div className="tabs__content js-tabs-content">
        <div className="mainSearch mainSearchHome bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4"> <div className="px-30 text-14">
            <div className="col-auto">
              <div className="form-radio">
                <div className="radio d-flex items-center mr-20">
                  <input 
                    type="radio" 
                    name="rating" 
                    value="one-way" 
                    checked={tripType === "ONE_WAY"} 
                    onChange={() => handleTriptypeChange("ONE_WAY")}  // assuming you're using state to manage tripType
                  />
                  <div className="radio__mark">
                    <div className="radio__icon" />
                  </div>
                  <div className="ml-10">{"One Way"}</div>
                </div>
                <div className="radio d-flex items-center">
                  <input 
                    type="radio" 
                    name="rating" 
                    value="round-trip" 
                    checked={tripType !== "ONE_WAY"} 
                    onChange={() => handleTriptypeChange("ROUND_TRIP")}  // assuming you're using state to manage tripType
                  />
                  <div className="radio__mark">
                    <div className="radio__icon" />
                  </div>
                  <div className="ml-10">{"Round Trip"}</div>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          <div className="button-grid d-flex md:d-block sm:d-block items-center">
            <LocationSearch locationCode={destinationLocationCode} locationName={destinationLocationName} ref={flightRef} />
            {/* <LocationSearch locationCode={locationCode} locationName={locationName} /> */}
            {/* End Location */}

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                {`${flightAvailRQ.searchParam.tripType === "ONE_WAY" ? "Depart" : "Depart - Return"}`}
                </h4>
                <DateSearch />
              </div>
            </div>
            {/* End check-in-out */}

            <FlightGuestSearch adult={adult} child={child} infant={infant} />
            {/* End guest */}

            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
                onClick={() => handleSearch()}
              >
                <i className="icon-search text-20 mr-10" />
                Search
              </button>
            </div>
            {/* End search button_item */}
          </div>
        </div>
        {/* End .mainSearch */}
      </div>
  );
};

export default FlightFilterSearchWidget;
