import { useDispatch, useSelector } from "react-redux";
import DateSearch from "@/components/hero/DateSearch";
// import GuestSearch from "../common/GuestSearch";
// import LocationSearch from "../common/LocationSearch";
import FilterSelect from "../flight-list-v1/FilterSelect";
import LocationSearch from "@/components/hero/hero-3/FlightLocationSearch";
import { useRouter } from "next/navigation";
import FlightGuestSearch from "@/components/hero/hero-3/FlightGuestSearch";

const MainFilterSearchBox = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const { cutOfDays,
  stayInDays, } = useSelector((state) => state.searchCriteria) || {};
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { destinationLocationCode,
  destinationLocationName,
  originLocationCode,
  originLocationName,
  adult,
  child,
  infant,
  startDate,
  endDate } = flightAvailRQ.searchParam;
  
  const dispatch = useDispatch();
  const Router = useRouter()
  const handleSearch = () => {
     Router.push(`/flight-list-v1/${destinationLocationCode}/${destinationLocationName}/${originLocationCode}/${originLocationName}/${startDate}/${endDate}/${adult}-${child}-${infant}`)
  }
  return (
    <>
      <div className="row y-gap-20 items-center">
        <FilterSelect />
      </div>
      {/* End .row */}

      <div className="mainSearch mainSearchList -col-5 border-light rounded-4 pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 mt-15">
        <div className="button-grid items-center">
            <LocationSearch locationCode={destinationLocationCode} locationName={destinationLocationName} />
          {/* <LocationSearch /> */}
          {/* End Location Flying From */}

          {/* <LocationSearch /> */}
          {/* End Location Flying To */}

          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                  {`${flightAvailRQ.searchParam.tripType === "ONE_WAY" ? "Depart" : "Depart - Return"}`}
                </h4>
                <DateSearch cutOfDays={cutOfDays} stayInDays={stayInDays} />
            </div>
          </div>
          {/* End Return */}

          <FlightGuestSearch adult={adult} child={child} infant={infant} />
          {/* End guest */}

          <div className="button-item">
            <button className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-dark-3 text-white"
                onClick={() => handleSearch()}>
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
