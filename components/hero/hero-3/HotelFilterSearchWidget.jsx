'use client'

import { useSelector, useDispatch } from "react-redux";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useRouter } from "next/navigation";
import {Trans} from "../../../app/translate"

const HotelFilterSearchWidget = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const { hotelCriteria } = useSelector((state) => state.searchCriteria);
  const { locationCode,
  locationName,
  cutOfDays,
  stayInDays,
  startDate,
  endDate,
  adult,
  child,
  room } = hotelCriteria;
  
  const dispatch = useDispatch();
  const Router = useRouter()
  const handleSearch = () => {
    
    Router.push(`/hotel-list/${locationCode}/${locationName}/${startDate}/${endDate}/${adult}/${child}/${room}`)
  }
  return (
      <div className="tabs__content js-tabs-content">
        <div className="mainSearch bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4">
          <div className="button-grid items-center">
            <LocationSearch locationCode={locationCode} locationName={locationName} />
            {/* End Location */}

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                  {Trans("_checkIn")} - {Trans("_checkOut")}
                </h4>
                <DateSearch cutOfDays={cutOfDays} stayInDays={stayInDays} />
              </div>
            </div>
            {/* End check-in-out */}

            <GuestSearch adult={adult} child={child} room={room} />
            {/* End guest */}

            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
                onClick={() => handleSearch()}
              >
                <i className="icon-search text-20 mr-10" />
                Search Hotel
              </button>
            </div>
            {/* End search button_item */}
          </div>
        </div>
        {/* End .mainSearch */}
      </div>
  );
};

export default HotelFilterSearchWidget;
