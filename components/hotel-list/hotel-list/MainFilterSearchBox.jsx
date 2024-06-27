import DateSearch from "../common/DateSearch";
import GuestSearch from "../common/GuestSearch";
import LocationSearch from "../common/LocationSearch";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

const MainFilterSearchBox = ({params}) => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const { locationCode,
  locationName,
  cutOfDays,
  stayInDays,
  startDate,
  endDate,
  adult,
  child,
  room } = useSelector((state) => state.searchCriteria.hotelCriteria) || {};
  const dispatch = useDispatch();
  const Router = useRouter()
  const handleSearch = () => {
    
    Router.push(`/hotel-list/${params.locationcode}/${params.locationname}/${startDate}/${endDate}/${adult}/${child}/${room}`)
  }
  const locationname = decodeURIComponent(params.locationname);
  return (
    <>
      <div className="mainSearch -col-3-big bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center">
          <LocationSearch  locationCode={params.locationcode} locationName={locationname} />
          {/* End Location */}

          <div className="searchMenu-date px-30 lg:py-20  sm:px-20 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">
                Check in - Check out
              </h4>
              <DateSearch cutOfDays={cutOfDays} stayInDays={stayInDays} startDate={params.startdate} endDate={params.enddate}/>
            </div>
          </div>
          {/* End check-in-out */}

          <GuestSearch  adult={params.adult} child={params.child} room={params.room} />
          {/* End guest */}

          <div className="button-item h-full">
          <button className="button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
                onClick={() => handleSearch()}
              >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
