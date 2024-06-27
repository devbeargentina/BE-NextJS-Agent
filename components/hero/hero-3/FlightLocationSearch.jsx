// Import necessary modules and hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {  updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { fetchHotelLocationList, hotelAvailResult } from "@/features/hero/hotelSlice";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";
import { fetchLocationList, fetchLocationToList } from "@/features/hero/flightSlice";
//const LocationSearch = ({ locationCodea, locationNamea }) 
const LocationSearch = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, (e) => ({
    checkValidation
  }));
  const [isValidateFromLocation, setIsValidateFromLocation] = useState(true);
  const [isValidateToLocation, setIsValidateToLocation] = useState(true);
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const dispatch = useDispatch(); // Hook to dispatch actions
  const { locationList, locationToList, loading, returnLocationList } = useSelector((state) => state.flight);
  const { destinationLocationCode,
  destinationLocationName,
  originLocationCode,
  originLocationName } = flightAvailRQ.searchParam;
  const { currentTab } = useSelector((state) => state.hero) || {};
  const router = useRouter();
  const handleSearch = async (query) => {
    if(query.length > 2){setLoadingFrom(true);
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }setLoadingFrom(false);
    }
  };
  const checkValidation =()=> {
    setIsValidateFromLocation(false);
    setIsValidateToLocation(false);
  }
  const handleSearch1 = async (query) => {
    if(query.length > 2){
      setLoadingTo(true);
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationToList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }
              setLoadingTo(false);
    }
  };
  const handleSearchLocatioTo = async (query) => {
    if(query.length > 2){
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationToList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }
    }
  };
  const handleSwapLocation = () => { 
    dispatch(
      updateFlightAvailRQ({
          ...flightAvailRQ,
          searchParam: {
            ...flightAvailRQ.searchParam,
            destinationLocationCode: flightAvailRQ.searchParam.originLocationCode,
            destinationLocationName: flightAvailRQ.searchParam.originLocationName,
            originLocationCode: flightAvailRQ.searchParam.destinationLocationCode,
            originLocationName: flightAvailRQ.searchParam.destinationLocationName,
          },
      })
    );
    
    setKey((prevKey) => prevKey + 1);
  }
  const filterBy = () => true;
  const [key, setKey] = useState(0);
  const [loadingFrom, setLoadingFrom] = useState(false);
  const [loadingTo, setLoadingTo] = useState(false);
  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className={!isValidateFromLocation ? "text-error-2 text-15 fw-500 ls-2 lh-16":"text-15 fw-500 ls-2 lh-16"} >Location From</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
    
    <AsyncTypeahead
      filterBy={filterBy}
      key={key} // Force re-render when key changes
      id="async-example"
      isLoading={loadingFrom}
      labelKey="name"
      minLength={3}
      maxLength={4}
      defaultSelected={[
        {
          code: flightAvailRQ.searchParam.destinationLocationCode,
          name: flightAvailRQ.searchParam.destinationLocationName,
        },
      ]}
      onSearch={(query) => {
        // Handle search logic if needed
        handleSearch(query);
      }}
      onChange={(selectedOptions) => {
        if (selectedOptions && selectedOptions.length > 0) {
          const selectedOption = selectedOptions[0];
    dispatch(
      updateFlightAvailRQ({
          ...flightAvailRQ,
          searchParam: {
            ...flightAvailRQ.searchParam,
            destinationLocationCode: selectedOption.code || "",
            destinationLocationName: selectedOption.name || "",
          },
      })
    );
        }
      }}
      useCache={false}
      onInputChange={handleSearch}
      options={locationList}
      placeholder="Search Location"
      className="divAutocomplete"  // Set your custom class here
      renderMenuItemChildren={(option) => (
        <>
          {/* <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          /> */}
          <span>{option.name}</span>
          {/* <span><HtmlParser text={( option.login)
                .replace(new RegExp('(' + props.text + ')', 'gi'), ('<span class="font-weight-bold">$1</span>'))} /></span> */}
        </>
      )}
    />
  
  
          </div>
        </div>
      </div>
      
      {currentTab === FLIGHT_TAB_NAME ? (
        <><div className="searchMenu-loc locationto px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
          <button className="location-switch border button -blue-1 bg-white size-30 rounded-full shadow-2" onClick={()=>handleSwapLocation()}><i className="icon-up-down text-12 rotate90d"></i></button>
      
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className={!isValidateToLocation ? "text-error-2 text-15 fw-500 ls-2 lh-16":"text-15 fw-500 ls-2 lh-16"}>Location To</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
    
    <AsyncTypeahead
        key={key} // Force re-render when key changes
      filterBy={filterBy}
      id="location-to"
      isLoading={loadingTo}
      labelKey="name"
      minLength={3}
      maxLength={4}
      defaultSelected={[
        {
          code: flightAvailRQ.searchParam.originLocationCode,
          name: flightAvailRQ.searchParam.originLocationName,
        },
      ]}
      onSearch={(query) => {
        // Handle search logic if needed
        //handleSearch1(query);
      }}
      onChange={(selectedOptions) => {
        if (selectedOptions && selectedOptions.length > 0) {
          const selectedOption = selectedOptions[0];
          dispatch(
            updateFlightAvailRQ({
                ...flightAvailRQ,
                searchParam: {
                  ...flightAvailRQ.searchParam,
                  originLocationCode: selectedOption.code || "",
                  originLocationName: selectedOption.name || "",
                },
            })
          );
        }
      }}
      useCache={false}
      //onInputChange={handleSearch1}
      options={returnLocationList}
      placeholder="Search Location To"
      className="divAutocomplete"  // Set your custom class here
      renderMenuItemChildren={(option) => (
        <>
          {/* <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          /> */}
          <span>{option.name}</span>
          {/* <span><HtmlParser text={( option.login)
                .replace(new RegExp('(' + props.text + ')', 'gi'), ('<span class="font-weight-bold">$1</span>'))} /></span> */}
        </>
      )}
    />
  
  
          </div>
        </div>
      </div></>
  ):(<></>)}
    </>
  );
});

export default LocationSearch;
