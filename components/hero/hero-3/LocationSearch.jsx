// Import necessary modules and hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateHotelCriteria } from "@/features/hero/searchCriteriaSlice";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { fetchHotelLocationList, hotelAvailResult } from "@/features/hero/hotelSlice";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";
import { fetchLocationList } from "@/features/hero/flightSlice";
const SEARCH_URI = 'https://api.github.com/search/users';
const LocationSearch = ({ locationCodea, locationNamea }) => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const [searchValue, setSearchValue] = useState(locationNamea || ""); // Set default searchValue based on locationName
  const [selectedItem, setSelectedItem] = useState(null); // Set default selectedItem based on initialState

  const [options, setOptions] = useState([]);

  const { hotelLocations,loading } = useSelector((state) => state.hotel);
  const { hotelCriteria } = useSelector((state) => state.searchCriteria);
  const { locationCode,
  locationName,
  locationToCode,
  locationToName } = useSelector((state) => state.searchCriteria) || {};
  const { locationList } = useSelector((state) => state.flight);
  const { currentTab } = useSelector((state) => state.hero) || {};
  const router = useRouter();
  const handleSearch = async (query) => {
    if(query.length > 2){
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }
    }
  };
  const handleSearchLocatioTo = async (query) => {
    if(query.length > 2){
      if(currentTab === HOTEL_TAB_NAME){
    await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
      else if(currentTab === FLIGHT_TAB_NAME){
        await dispatch(fetchLocationList({ query,router,undefined }));  
          }
          else{
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
              }
    }
  };
  const filterBy = () => true;
  useEffect(() => {
    // Dispatch action to update locationCode and locationName in the Redux store with default values
    dispatch(
      updateHotelCriteria({
        ...hotelCriteria,
        locationCode: locationCode || "", // Modify the format as needed
        locationName: locationName || "",
      })
    );
  }, []); // Run this effect only once when the component mounts

  const locationSearchContent = [
    {
      id: 1,
      name: "London",
      address: "Greater London, United Kingdom",
    },
    {
      id: 2,
      name: "New York",
      address: "New York State, United States",
    },
    {
      id: 3,
      name: "Paris",
      address: "France",
    },
    {
      id: 4,
      name: "Madrid",
      address: "Spain",
    },
    {
      id: 5,
      name: "Santorini",
      address: "Greece",
    },
  ];

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);

    // Dispatch action to update locationCode and locationName in the Redux store
    dispatch(
      updateHotelCriteria({
        ...hotelCriteria,
        locationCode: `loc-${item.id}`, // Modify the format as needed
        locationName: item.name,
      })
    );
  };

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Location from</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
    
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={loading}
      labelKey="name"
      minLength={3}
      maxLength={4}
      defaultSelected={[
        {
          code: hotelCriteria.locationCode,
          name: hotelCriteria.locationName,
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
            updateHotelCriteria({
              ...hotelCriteria,
              locationCode: currentTab === FLIGHT_TAB_NAME ? (selectedOption.code) : selectedOption.jpdCode || "",
              locationName: selectedOption.name || "",
            })
          );
        }
      }}
      useCache={false}
      onInputChange={handleSearch}
      options={currentTab === FLIGHT_TAB_NAME ? locationList : hotelLocations}
      placeholder="Search Location..."
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
      <div className="searchMenu-loc locationto px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Location To</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
    
    <AsyncTypeahead
      filterBy={filterBy}
      id="location-to"
      isLoading={loading}
      labelKey="name"
      minLength={3}
      maxLength={4}
      defaultSelected={[
        {
          code: hotelCriteria.locationToCode,
          name: hotelCriteria.locationToName,
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
            updateHotelCriteria({
              ...hotelCriteria,
              locationToCode: selectedOption.code || "",
              locationToName: selectedOption.name || "",
            })
          );
        }
      }}
      useCache={false}
      onInputChange={handleSearch}
      options={currentTab === FLIGHT_TAB_NAME ? locationList : hotelLocations}
      placeholder="Search Location To..."
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
  ):(<></>)}
    </>
  );
};

export default LocationSearch;
