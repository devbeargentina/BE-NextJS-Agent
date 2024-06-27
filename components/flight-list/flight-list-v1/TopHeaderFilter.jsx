import { useSelector } from "react-redux";

const TopHeaderFilter = (props) => {
  // const { flightList,filterParam,loading, totalFlights } = useSelector((state) => state.flight);
  return !props.loading && props.flightList !== undefined ? (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18 h-40">
            <span className="fw-500">{props.totalFlights} {props.triptype} Flights</span>{`${props.flightList[0]?.departureAirport.locationName ? " - " +props.flightList[0]?.departureAirport.locationName : ""} `}
          </div>
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            {/* <div className="col-auto">
              {props.flightList.length > 0 ? <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                <i className="icon-up-down text-14 mr-10" />
                Sort
              </button> : <></>}
            </div> */}
            {/* End .col */}

            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  ):(<></>);
};

export default TopHeaderFilter;
