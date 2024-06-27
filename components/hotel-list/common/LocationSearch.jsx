// Import necessary modules and hooksu
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateHotelCriteria } from "@/features/hero/searchCriteriaSlice";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { fetchHotelLocationList, hotelAvailResult } from "@/features/hero/hotelSlice";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";

const SearchBar = ({ locationCode, locationName }) => {
  const { hotelCriteria } = useSelector((state) => state.searchCriteria);
  const dispatch = useDispatch(); // Hook to dispatch actions
  const [searchValue, setSearchValue] = useState(locationName || ""); // Set default searchValue based on locationName
  const [selectedItem, setSelectedItem] = useState(null); // Set default selectedItem based on initialState

  const [options, setOptions] = useState([]);

  const { hotelLocations,loading } = useSelector((state) => state.hotel);
  const router = useRouter();
  const handleSearch = async (query) => {
    if(query.length > 2){
            await dispatch(fetchHotelLocationList({ query,router,undefined }));  
      }
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
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
          <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            {/* <input
              autoComplete="off"
              type="search"
              placeholder="Where are you going?"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            /> */}
            
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
          name: locationName,
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
              locationCode: selectedOption.jpdCode || "",
              locationName: selectedOption.name || "",
            })
          );
        }
      }}
      useCache={false}
      onInputChange={handleSearch}
      options={hotelLocations}
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

        {/* <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {locationSearchContent.map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {item.name}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SearchBar;
