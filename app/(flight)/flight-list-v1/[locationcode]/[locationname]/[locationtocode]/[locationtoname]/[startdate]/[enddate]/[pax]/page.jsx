
'use client'
import { flightAvailResult, flightExtraCharges } from "@/features/hero/flightSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-3";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/flight-list/flight-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "@/components/flight-list/flight-list-v1/TopHeaderFilter";
import FlightProperties from "@/components/flight-list/flight-list-v1/FlightProperties";
import Pagination from "@/components/flight-list/common/Pagination";
import Sidebar from "@/components/flight-list/flight-list-v1/Sidebar";
import FlightReturnProperties from "@/components/flight-list/flight-list-v1/FlightReturnProperties";
import { DateObject } from "react-multi-date-picker";
import DropdownFlightFilters from "@/components/hotel-list/common/DropdownFlightFilters";
import { updateFlightAvailRQ } from "@/features/hero/searchCriteriaSlice";
import Link from "next/link";
import { createCart, getCartById } from "@/features/hero/cartSlice";
import { act } from "react";
import PriceCalculation from "@/components/common/PriceCalculation";

// export const metadata = {
//   title: "Flight List v1 || BE - Argentina - Travel & Tour React NextJS Template",
//   description: "BE - Argentina - Travel & Tour React NextJS Template",
// };

const index = ({ params }) => {
  
  const dispatch = useDispatch();
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { flightList, returnFlightList, filterParam, returnFilterParam,loading, totalFlights, totalReturnFlights, totalPages, totalRetutrnPages,selectedFlight, selectedReturnFlight, createBookingRQ, returnCreateBookingRQ, extraCHARGES } = useSelector((state) => state.flight);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const { flightMargineType,flightMargineValue } = useSelector((state) => state.user);
  const router = useRouter();
  const { destinationLocationCode,
  destinationLocationName,
  originLocationCode,
  originLocationName } = flightAvailRQ.searchParam;
  //const hotel = hotelsData.find((item) => item.id == id) || hotelsData[0];
  
  const convertToCustomFormat = (DateTime) => {
    var converted = new Date(Date.UTC(
      parseInt(DateTime.substring(0,4)),
      parseInt(DateTime.substring(5,7)) - 1, // Months are zero-based
      parseInt(DateTime.substring(8,10)),
      parseInt(DateTime.substring(11,13)),
      parseInt(DateTime.substring(14,16)),
      parseInt(DateTime.substring(17,19))
    ));
    
    // Construct the formatted date string manually
    var formattedDate = `${('0' + converted.getUTCDate()).slice(-2)}/${('0' + (converted.getUTCMonth() + 1)).slice(-2)}/${converted.getUTCFullYear()}, ${('0' + converted.getUTCHours()).slice(-2)}:${('0' + converted.getUTCMinutes()).slice(-2)}`;
    
    return formattedDate;
  }
  
  const convertToCustomFormatS = (DateTime) => {
    var converted = new Date(Date.UTC(
      parseInt(DateTime.substring(0, 4)),
      parseInt(DateTime.substring(5, 7)) - 1, // Months are zero-based
      parseInt(DateTime.substring(8, 10)),
      parseInt(DateTime.substring(11, 13)),
      parseInt(DateTime.substring(14, 16)),
      parseInt(DateTime.substring(17, 19))
    ));
  
    // Array of month names
    const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  
    // Get day, month, and year
    const day = converted.getUTCDate();
    const monthIndex = converted.getUTCMonth();
    const year = converted.getUTCFullYear();
  
    // Construct formatted date string
    const formattedDate = `${getDayName(converted)}, ${monthNames[monthIndex]} ${day}`;
  
    return formattedDate;
  }
  
  useEffect(() => {
    if(destinationLocationCode && destinationLocationName && originLocationCode && originLocationName){
    // Dispatch the action
    dispatch(flightAvailResult({ flightAvailRQ, router, undefined }));
    }
    else{
    dispatch(
      updateFlightAvailRQ({
          ...flightAvailRQ,
          searchParam: {
            ...flightAvailRQ.searchParam,
            originLocationCode: params.locationcode || "",
            originLocationName: decodeURIComponent(params.locationname) || "",
            destinationLocationCode: params.locationtocode || "",
            destinationLocationName: decodeURIComponent(params.locationtoname) || "",
            startDate: new Date(decodeURIComponent(params.startdate)).toISOString() ||  new Date(new DateObject()).toISOString(),
            endDate: new Date(decodeURIComponent(params.enddate)).toISOString() ||  new Date(new DateObject()).toISOString(),
            adult: params.adult|| 1,
            child:params.child || 0,
            infant: params.infant|| 0,
          },
      })
    );
    
    dispatch(flightAvailResult({ flightAvailRQ :{
      ...flightAvailRQ,
      searchParam: {
        ...flightAvailRQ.searchParam,
        originLocationCode: params.locationcode || "",
        originLocationName: decodeURIComponent(params.locationname) || "",
        destinationLocationCode: params.locationtocode || "",
        destinationLocationName: decodeURIComponent(params.locationtoname) || "",
        startDate: new Date(decodeURIComponent(params.startdate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        endDate: new Date(decodeURIComponent(params.enddate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        adult: params.adult|| 1,
        child:params.child || 0,
        infant: params.infant|| 0,
      },
  }, router, undefined }));
    }
  }, [dispatch]);
  
  const addToCart = (departureFlight, returnFlight)=>{
    
    //console.log(departureFlight);
    //console.log(returnFlight);
    const passengerFareInfoList = departureFlight.fareComponentList.passengerFareInfoList;

    // Initialize variables to store fare amounts
    let totalFareAmountADLT = 0;
    let totalFareAmountCHLD = 0;
    let totalFareAmountINFT = 0;
    
    // Iterate through the array to find fare information for each passenger type
    departureFlight.fareComponentList[0].passengerFareInfoList.forEach(passenger => {
      // Check passenger type and update corresponding fare amount
      switch (passenger.passengerType) {
        case 'ADLT':
          totalFareAmountADLT = passenger.pricingInfo.totalFare.amount;
          break;
        case 'CHLD':
          totalFareAmountCHLD = passenger.pricingInfo.totalFare.amount;
          break;
        case 'INFT':
          totalFareAmountINFT = passenger.pricingInfo.totalFare.amount;
          break;
        default:
          // Handle other passenger types if needed
          break;
      }
    });
    let totalFareAmountADLT_R = 0;
    let totalFareAmountCHLD_R = 0;
    let totalFareAmountINFT_R = 0;
    
    // Iterate through the array to find fare information for each passenger type
    returnFlight.fareComponentList[0].passengerFareInfoList.forEach(passenger => {
      // Check passenger type and update corresponding fare amount
      switch (passenger.passengerType) {
        case 'ADLT':
          totalFareAmountADLT_R = passenger.pricingInfo.totalFare.amount;
          break;
        case 'CHLD':
          totalFareAmountCHLD_R = passenger.pricingInfo.totalFare.amount;
          break;
        case 'INFT':
          totalFareAmountINFT_R = passenger.pricingInfo.totalFare.amount;
          break;
        default:
          // Handle other passenger types if needed
          break;
      }
    });
//console.log("----------------");
//console.log(JSON.stringify(departureFlight));
//console.log(JSON.stringify(returnFlight));

    dispatch(flightExtraCharges({ flightExtraChargesRQ : {
      requestXML: createBookingRQ,
      returnRequestXML: returnCreateBookingRQ,
      tripType: "ROUND_TRIP",
      adult: flightAvailRQ.searchParam.adult,
      child: flightAvailRQ.searchParam.child,
      infant: flightAvailRQ.searchParam.infant
  }})).then((action)=>{
    
  dispatch(createCart({ rqAddSessionCart : {
    product: {
    business: "Flight",
    request: JSON.stringify(flightAvailRQ),
    response: JSON.stringify(departureFlight),
    adultPrice: totalFareAmountADLT,
    childPrice: totalFareAmountCHLD,
    infantPrice: totalFareAmountINFT,
    adult: flightAvailRQ.searchParam.adult,
    child: flightAvailRQ.searchParam.child,
    infant: flightAvailRQ.searchParam.infant,
    flightType: "RoundTrip",
    returnFlightResponse: JSON.stringify(returnFlight),
    returnFlightAdultPrice: totalFareAmountADLT_R,
    returnFlightChildPrice: totalFareAmountCHLD_R,
    returnFlightInfantPrice: totalFareAmountINFT_R,
    startDate: "2024-03-15T09:57:50.004Z",
    endDate: "2024-03-15T09:57:50.004Z",
    room: 0,
    nights: 0,
    extraServiceResponse: JSON.stringify(action.payload.result),
    extraServiceTotalAmount:(action.payload.result && action.payload?.result?.totalAmountValue > 0) ? action.payload?.result?.totalAmountValue : 0,
    extraProcessingFeeAmount: 10,
    paxInformation: JSON.stringify()
  }
}, router, undefined })).then((action) => {
  
  // Check if cart is empty, then redirect
  if (!action.payload.items || action.payload.items.length === 0) {
    router.push('/'); // Assuming you have access to router here
  } else {
    router.push('/cart-page'); // Or redirect to cart page
  }
});
  });
const sessionCartId = localStorage.getItem('sessioncart');
    
if (sessionCartId) {
      dispatch(getCartById({ sessionCartId, router })).then((action) => {
  // Check if cart is empty, then redirect
  if (!action.payload.items || action.payload.items.length === 0) {
    router.push('/'); // Assuming you have access to router here
  } else {
    router.push('/cart-page'); // Or redirect to cart page
  }
});
  }
  }
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-40 pb-40">
        <div className="container">
          <MainFilterSearchBox />
        </div>
      </section>
      
      {(flightAvailRQ.searchParam.tripType !== "ONE_WAY" && (selectedFlight.flightSegmentID || selectedReturnFlight.flightSegmentID)) ? 
      <section className="layout layout pt-2 pb-2 bg-dark-2 sticky-bottom sticky position-fixed w-100">
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
                <div className="col-lg-5">
    {selectedFlight.flightSegmentID  ? <>
        {/* <div className="js-accordion"> */}
        <h4 class="text-22 text-white fw-400">Departure Flight</h4>
          <div className="py-10 px-20 bg-white rounded-4 base-tr" key={selectedFlight.flightSegmentID} style={{"border-right":"1px solid var(--color-border)"}}>
          {/* <div class="col-auto mb-20"><div class="text-18 h-40"><span class="fw-500">Selected Departure Flight</span></div></div> */}
            <div className="row y-gap-30 justify-between items-center">
              <div className="col">
                <div className="row y-gap-10 items-center">
                  <div className="col-sm-auto xl:justify-between">
                    <img
                      className="size-40"
                      src="/img/flights/HolidayAir.svg"
                      alt="image"
                    />
                    <div className="d-none xl:d-flex text-18 lh-16 fw-500">{`USD ${selectedFlight.fareComponentList[0].indicativeBaseFare}`}</div>
                  </div>
                  <div className="col">
                    <div className="row x-gap-20 items-end">
                      <div className="col-auto">
                        <div className="lh-15 fw-500">{convertToCustomFormat(selectedFlight.departureDateTime).split(', ')[1]}</div>
                        <div className="text-15 lh-15 text-light-1">{selectedFlight.departureAirport.locationCode}</div>
                      </div>
                      <div className="col text-center">
{flightAvailRQ.searchParam.tripType !== "ONE_WAY" ? (
                      <div className="text-15 lh-15 text-light-1 mb-10">
                        {selectedFlight.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}
                      </div>):(<></>)}
                        <div className="flightLine">
                          <div />
                          <div />
                        </div>
                        <div className="text-15 lh-15 text-light-1 mt-10">
                          {`${selectedFlight.stopQuantity === "0" ? "Nonstop" : selectedFlight.stopQuantity + " Stops"} `}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="lh-15 fw-500">{convertToCustomFormat(selectedFlight.arrivalDateTime).split(', ')[1]}</div>
                        <div className="text-15 lh-15 text-light-1">{selectedFlight.arrivalAirport.locationCode}</div>
                      </div>
                    </div>
                  </div>
                  
{flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (<div className="col-md-auto">
                    <div className="text-15 text-light-1 px-20 md:px-0">
                      {selectedFlight.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}
                    </div>
                  </div>):(<></>)}
                </div>
                <div className="row y-gap-10 items-center pt-30" style={{display:"none"}}>
                  <div className="col-sm-auto">
                    <img
                      className="size-40"
                      src="/img/flightIcons/2.png"
                      alt="image"
                    />
                  </div>
                  <div className="col">
                    <div className="row x-gap-20 items-end">
                      <div className="col-auto">
                        <div className="lh-15 fw-500">14:00</div>
                        <div className="text-15 lh-15 text-light-1">SAW</div>
                      </div>
                      <div className="col text-center">
                        <div className="flightLine">
                          <div />
                          <div />
                        </div>
                        <div className="text-15 lh-15 text-light-1 mt-10">
                          Nonstop
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="lh-15 fw-500">22:00</div>
                        <div className="text-15 lh-15 text-light-1">STN</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <div className="text-15 text-light-1 px-20 md:px-0">
                      4h 05m
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md-auto">
                <div className="d-flex items-center h-full praful">
                  <div className="pl-30 border-left-light h-full md:d-none" />
                  <div>
                    <div className="text-right md:text-left mb-10">
                      <PriceCalculation basePrice={selectedFlight.fareComponentList[0].indicativeBaseFare} marginetype={flightMargineType} marginevalue={flightMargineValue} />
                      <div className="text-18 lh-16 fw-500">{`USD ${selectedFlight.fareComponentList[0].indicativeBaseFare}`}</div>
                      {/* <div className="text-15 lh-16 text-light-1">{`${selectedFlight.fareComponentList.length} deals`}</div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* End  .col-md-auto */}
            </div>
            {/* </div> */}
            </div>
            </> : <></>}
            </div>
            <div className="col-lg-5">
            {selectedReturnFlight.flightSegmentID  ? <>
        {/* <div className="js-accordion"> */}<h4 class="text-22 text-white fw-400">Return Flight</h4>
          <div className="py-10 px-20 bg-white rounded-4 base-tr" key={selectedReturnFlight.flightSegmentID}>
            {/* <div class="col-auto mb-20">
            <div class="text-18 h-40"><span class="fw-500">Selected Return Flight</span></div></div> */}
            <div className="row y-gap-30 justify-between items-center">
              <div className="col">
                <div className="row y-gap-10 items-center">
                  <div className="col-sm-auto">
                    <img
                      className="size-40"
                      src="/img/flights/HolidayAir.svg"
                      alt="image"
                    />
                  </div>
                  <div className="col">
                    <div className="row x-gap-20 items-end">
                      <div className="col-auto">
                        <div className="lh-15 fw-500">{convertToCustomFormat(selectedReturnFlight.departureDateTime).split(', ')[1]}</div>
                        <div className="text-15 lh-15 text-light-1">{selectedReturnFlight.departureAirport.locationCode}</div>
                      </div>
                      <div className="col text-center">
{flightAvailRQ.searchParam.tripType !== "ONE_WAY" ? (
                      <div className="text-15 lh-15 text-light-1 mb-10">
                        {selectedReturnFlight.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}
                      </div>):(<></>)}
                        <div className="flightLine">
                          <div />
                          <div />
                        </div>
                        <div className="text-15 lh-15 text-light-1 mt-10">
                          {`${selectedReturnFlight.stopQuantity === "0" ? "Nonstop" : selectedReturnFlight.stopQuantity + " Stops"} `}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="lh-15 fw-500">{convertToCustomFormat(selectedReturnFlight.arrivalDateTime).split(', ')[1]}</div>
                        <div className="text-15 lh-15 text-light-1">{selectedReturnFlight.arrivalAirport.locationCode}</div>
                      </div>
                    </div>
                  </div>
                  
{flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (<div className="col-md-auto">
                    <div className="text-15 text-light-1 px-20 md:px-0">
                      {selectedReturnFlight.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}
                    </div>
                  </div>):(<></>)}
                </div>
                <div className="row y-gap-10 items-center pt-30" style={{display:"none"}}>
                  <div className="col-sm-auto">
                    <img
                      className="size-40"
                      src="/img/flightIcons/2.png"
                      alt="image"
                    />
                  </div>
                  <div className="col">
                    <div className="row x-gap-20 items-end">
                      <div className="col-auto">
                        <div className="lh-15 fw-500">14:00</div>
                        <div className="text-15 lh-15 text-light-1">SAW</div>
                      </div>
                      <div className="col text-center">
                        <div className="flightLine">
                          <div />
                          <div />
                        </div>
                        <div className="text-15 lh-15 text-light-1 mt-10">
                          Nonstop
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="lh-15 fw-500">22:00</div>
                        <div className="text-15 lh-15 text-light-1">STN</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <div className="text-15 text-light-1 px-20 md:px-0">
                      4h 05m
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md-auto">
                <div className="d-flex items-center h-full">
                  <div className="pl-30 border-left-light h-full md:d-none" />
                  <div>
                    <div className="text-right md:text-left mb-10">
                      <PriceCalculation basePrice={selectedReturnFlight.fareComponentList[0].indicativeBaseFare} marginetype={flightMargineType} marginevalue={flightMargineValue} />
                      <div className="text-18 lh-16 fw-500">{`USD ${selectedReturnFlight.fareComponentList[0].indicativeBaseFare}`}</div>
                      {/* <div className="text-15 lh-16 text-light-1">{`${selectedReturnFlight.fareComponentList.length} deals`}</div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* End  .col-md-auto */}
            </div>
            </div>
            {/* </div> */}
            </> : <></>}
            </div>
            
            <div className="col-auto xl:w-100">
            <h4 class="text-22 text-white fw-400">&nbsp;</h4>
            {(selectedFlight.flightSegmentID && selectedReturnFlight.flightSegmentID)?<button
                    onClick={()=> addToCart(selectedFlight, selectedReturnFlight)}
                    className="button xl:d-flex xl:w-100 px-20 h-60 bg-blue-1 text-white"
                  >
                    Continue {cartLoading ? <i class="spinner-border spinner-border-sm ml-15 mr-15"></i>:<></>} <div style={{visibility:`${cartLoading ? "hidden":"visible"}`}} className="icon-arrow-top-right ml-15" />
                  </button>:<></>}</div>
                  </div></div></section> : <></>}
      {/* Top SearchBanner */}
{flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (
      <section className="layout-pt-md layout-pb-md bg-light-2">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar py-20 px-20 xl:d-none bg-white">
                <div className="row y-gap-40">
                  <Sidebar type="outbound" filterParam={filterParam}  />
                </div>
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Tours
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar type="outbound" filterParam={filterParam}  />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
                <TopHeaderFilter flightList={flightList} loading={loading} totalFlights={totalFlights} triptype={"Departure"} />

              <div className="row">
                <FlightProperties />
              </div>
              {/* End .row */}
                {totalPages > 1 ?? <Pagination totalPages={totalPages} filterParam={flightAvailRQ.filterParam} />}
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>) : (
      <section className="layout-pt-md layout-pb-md bg-light-2">
        <div className="container">
          <div className="row-change y-gap-20 justify-between items-center">
            {/* End col-auto */}

            {/* <div className="col-auto">
              <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                <i className="icon-up-down text-14 mr-10"></i>
                Top picks for your search
              </button>
            </div> */}
            {/* End col-auto */}

            {/* <div className="border-top-light mt-30 mb-30"></div> */}
            {/* End border-top */}

            <div className="row y-gap-30">
              
              <div className="col-xl-6 ">
                <TopHeaderFilter flightList={flightList} loading={loading} totalFlights={totalFlights} triptype={"Departure"} />
              <div className="row x-gap-20 mt-20 y-gap-10 items-center">
                <div className="col-auto">
                  <div className="text-18 fw-500">Filter</div>
                </div>
                {/* End .col-auto */}

                <div className="col-auto">
                  <div className="row x-gap-15 y-gap-15">
                    <DropdownFlightFilters type="outbound" filterParam={filterParam} />
                  </div>
                </div>
                {/* End .col-auto */}
              </div>

                <div className="row">
                  <FlightProperties />
                </div>
                {/* End .row */}
                {totalPages > 1 ?? <Pagination totalPages={totalPages} filterParam={flightAvailRQ.filterParam} />}
              </div>
              <div className="col-xl-6 ">
                <TopHeaderFilter flightList={returnFlightList} loading={loading} totalFlights={totalReturnFlights} triptype={"Return"}  />
              <div className="row x-gap-20 mt-20 y-gap-10 items-center">
                <div className="col-auto">
                  <div className="text-18 fw-500">Filter</div>
                </div>
                {/* End .col-auto */}

                <div className="col-auto">
                  <div className="row x-gap-15 y-gap-15">
                    <DropdownFlightFilters type="return" filterParam={returnFilterParam} />
                  </div>
                </div>
                {/* End .col-auto */}
              </div>

                <div className="row">
                  <FlightReturnProperties loading={loading} returnFlightList={returnFlightList} />
                </div>
                {/* End .row */}
                {totalRetutrnPages > 1 && <Pagination totalPages={totalRetutrnPages} filterParam={flightAvailRQ.filterParam} />}
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>)}
      {/* End layout for listing sidebar and content */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
