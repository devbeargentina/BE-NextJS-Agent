'use client'

import { useSelector, useDispatch } from "react-redux";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useRouter } from "next/navigation";
import HotelFilterSearchWidget from "./HotelFilterSearchWidget";
import FlightFilterSearchWidget from "./FlightFilterSearchWidget";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";
import CommonFilterSearchWidget from "./CommonFilterSearchWidget";
import { Trans } from "@/app/translate";

const MainFilterSearchBox = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const { locationCode,
  locationName,
  cutOfDays,
  stayInDays,
  startDate,
  endDate,
  adult,
  child,
  room } = useSelector((state) => state.searchCriteria) || {};
  
  const dispatch = useDispatch();
  const Router = useRouter()
  const handleSearch = () => {
    
    Router.push(`/hotel-list/${locationCode}/${locationName}/${startDate}/${endDate}/${adult}/${child}/${room}`)
  }
  return (
    <>
      <div className="tabs -bookmark js-tabs">
        <div className="tabs__controls d-flex items-center js-tabs-controls">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              className={`tabs__button px-30 py-20 rounded-4 fw-600 text-white js-tabs-button ${
                tab?.name === currentTab ? "is-tab-el-active" : ""
              }`}
              onClick={() => dispatch(addCurrentTab(tab?.name))}
            >
              <i className={`${tab.icon} text-20 mr-10`}></i>
              {Trans(`_${tab?.name}`)}
            </button>
          ))}
        </div>
      </div>

      {currentTab === HOTEL_TAB_NAME ? (
      <HotelFilterSearchWidget />
    ) : (currentTab === FLIGHT_TAB_NAME ? (
      <FlightFilterSearchWidget />
    ) : (
      <CommonFilterSearchWidget />
    ))}
      {/* End serarchbox tab-content */}
    </>
  );
};

export default MainFilterSearchBox;
