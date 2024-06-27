import { useDispatch, useSelector } from "react-redux";
import flightsData from "../../../data/flights";
import Skeleton from "@/components/common/skeletons/Skeleton";
// import { useRouter } from "next/router";
import { flightExtraCharges, updateCreateBookingRQ, updateFlightCart, updateSelectedFlight } from "@/features/hero/flightSlice";
import { createCart, getCartById } from "@/features/hero/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FlightProperties = () => {
  const [fareItemindex, setFareItemindex] = useState();
  const [flightItemIndex, setFlightItemIndex] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { flightAvailRQ } = useSelector((state) => state.searchCriteria);
  const { flightList,filterParam,loading,selectedFlight, extraCHARGES } = useSelector((state) => state.flight);
  // 
  //console.log(JSON.stringify(flightList));
  const updateCart = (rqCreateBooking, fareItemindex, index)=>{
    setFlightItemIndex(index)
    setFareItemindex(fareItemindex);

//# Select the single flight object
const selectedFlight = flightList[index];

//# Modify the fareComponentList for the selected flight
const modifiedPassengerFareInfo = selectedFlight.fareComponentList[fareItemindex];
const modifiedFlight = {
    ...selectedFlight,
    fareComponentList: [modifiedPassengerFareInfo]
};

dispatch(updateSelectedFlight(modifiedFlight));
dispatch(updateCreateBookingRQ(rqCreateBooking));

    
  if(flightAvailRQ.searchParam.tripType === "ONE_WAY"){
    
    // Initialize variables to store fare amounts
    let totalFareAmountADLT = 0;
    let totalFareAmountCHLD = 0;
    let totalFareAmountINFT = 0;
    
    // Iterate through the array to find fare information for each passenger type
    modifiedFlight.fareComponentList[0].passengerFareInfoList.forEach(passenger => {
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
    dispatch(flightExtraCharges({ flightExtraChargesRQ : {
      requestXML: rqCreateBooking,
      returnRequestXML: "",
      tripType: "ONE_WAY",
      adult: flightAvailRQ.searchParam.adult,
      child: flightAvailRQ.searchParam.child,
      infant: flightAvailRQ.searchParam.infant
  }})).then((action) => {
    // Check if cart is empty, then redirect
    
  dispatch(createCart({ rqAddSessionCart : {
    product: {
    business: "Flight",
    request: JSON.stringify(flightAvailRQ),
    response: JSON.stringify(modifiedFlight),
    adultPrice: totalFareAmountADLT,
    childPrice: totalFareAmountCHLD,
    infantPrice: totalFareAmountINFT,
    adult: flightAvailRQ.searchParam.adult,
    child: flightAvailRQ.searchParam.child,
    infant: flightAvailRQ.searchParam.infant,
    flightType: "OneWay",
    startDate: "2024-03-15T09:57:50.004Z",
    endDate: "2024-03-15T09:57:50.004Z",
    room: 0,
    nights: 0,
    extraServiceResponse: JSON.stringify(action.payload.result),
    extraServiceTotalAmount:(action.payload.result && action.payload?.result?.totalAmountValue > 0) ? action.payload?.result?.totalAmountValue : 0,
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
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  document.getElementById(`div${selectedFlight.flightSegmentID}`).remove('show');
  }
  
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
  
  // Function to get day name
  function getDayName(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getUTCDay()];
  }
  return (
    <>
    {loading ? <Skeleton /> :  ((flightList && flightList.length > 0) ? (
      flightList?.map((item,index) => (
        <div className="js-accordion" key={item.flightSegmentID}>
          <div className="py-30 px-30 bg-white rounded-4 base-tr mt-30">
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
                        <div className="lh-15 fw-500">{convertToCustomFormat(item.departureDateTime).split(', ')[1]}</div>
                        <div className="text-15 lh-15 text-light-1">{item.departureAirport.locationCode}</div>
                      </div>
                      <div className="col text-center">
{flightAvailRQ.searchParam.tripType !== "ONE_WAY" ? (
                      <div className="text-15 lh-15 text-light-1 mb-10">
                        {item.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}
                      </div>):(<></>)}
                        <div className="flightLine">
                          <div />
                          <div />
                        </div>
                        <div className="text-15 lh-15 text-light-1 mt-10">
                          {`${item.stopQuantity === "0" ? "Nonstop" : item.stopQuantity + " Stops"} `}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="lh-15 fw-500">{convertToCustomFormat(item.arrivalDateTime).split(', ')[1]}</div>
                        <div className="text-15 lh-15 text-light-1">{item.arrivalAirport.locationCode}</div>
                      </div>
                    </div>
                  </div>
                  
{flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (<div className="col-md-auto">
                    <div className="text-15 text-light-1 px-20 md:px-0">
                      {item.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}
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
                <div className="d-flex xl:d-block items-center h-full">
                  <div className="pl-30 border-left-light h-full md:d-none" />
                  <div className="xl:d-flex xl:justify-between">
                    <div className="text-right md:text-left mb-10">
                      <div className="text-18 lh-16 fw-500">{`USD ${item.indicativePrice}`}</div>
                      <div className="text-15 lh-16 text-light-1">{`${item.fareComponentList.length} options`}</div>
                    </div>
                    <div className="accordion__button">
                      <button
                        className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                        data-bs-toggle="collapse"
                        data-bs-target={`#div${item.flightSegmentID}`}
                      >
                        View Option(s)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End  .col-md-auto */}
            </div>
            {/* End .row  */}

            <div className=" collapse" id={`div${item.flightSegmentID}`}>
              <div className="border-light rounded-4 mt-30">
                <div className="py-20 px-30">
                  <div className="row justify-between items-center">
                    <div className="col-auto">
                      <div className="fw-500 text-dark-1">
                        Depart • {convertToCustomFormatS(item.departureDateTime)}
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 text-light-1">{item.airlineCode + item.flightNumber}</div>
                    </div>
                  </div>
                </div>
                {item.fareComponentList.map((fareItem, fareItemindex)=>{
    const bookingClass = item?.bookingClassList.find(item => item.resBookDesigCode === fareItem.resBookDesigCode);
    
    return (
                <div className="py-30 px-30 border-top-light">
                  <div className="row y-gap-10 justify-between xl:justify-center flight-inner-section">
                    <div className="col-auto">
                      <div className="d-flex items-center mb-15 xl:justify-center ">
                        <div className="w-28 d-flex justify-center mr-15">
                          <img src="/img/flights/HolidayAir.svg" alt="image" />
                        </div>
                        <div className="text-14 text-light-1">
                          {`${item.airlineName}(${item.airlineCode}) - ${item.flightNumber}`}
                        </div>
                      </div>
                      <div className="relative z-0">
                        <div className="border-line-2" />
                        <div className="d-flex items-center">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-white" />
                          </div>
                          <div className="row d-flex justify-center items-center ">
                            <div className="col-auto">
                              <div className="lh-14 fw-500 text-center">{convertToCustomFormat(item.departureDateTime).split(', ').map((part, index) => (
    <>
      {part}
      {index !== 1 && <br />} {/* Add <br /> between date and time parts */}
    </>
  ))}</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                          {`${item.departureAirport.locationName} ${item.departureAirport.country.locationName} - (${item.departureAirport.locationCode})`}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex items-center mt-15  xl:justify-center">
                          <div className="w-28 d-flex justify-center mr-15">
                            <img src="/img/flights/plane.svg" alt="image" />
                          </div>
                          <div className="text-14 text-light-1">{item.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}</div>
                        </div>
                        <div className="d-flex items-center mt-15">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-border" />
                          </div>
                          <div className="row d-flex justify-center items-center">
                            <div className="col-auto">
                              <div className="lh-14 fw-500 text-center">{convertToCustomFormat(item.arrivalDateTime).split(', ').map((part, index) => (
    <>
      {part}
      {index !== 1 && <br />} {/* Add <br /> between date and time parts */}
    </>
  ))}</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                          {`${item.arrivalAirport.locationName} ${item.arrivalAirport.country.locationName} - (${item.arrivalAirport.locationCode})`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {flightAvailRQ.searchParam.tripType === "ONE_WAY" ? (
                    <div className="col-auto text-right xl:text-left">
                      <div className="text-14 text-light-1">{`${bookingClass.cabin} - ${bookingClass.resBookDesigCode}`}</div>
                      <div className="text-14 mt-15 md:mt-5">
                        {`Fare Baggage: ${fareItem.fareBaggageMaxAllowedPieces} ${fareItem.fareBaggageAllowanceType}(${fareItem.fareBaggageWeight} ${fareItem.fareBaggageUnitOfMeasureCode})`}
                        <br />
                        {`${fareItem.fareGroupName} - ${fareItem.fareReferenceName} (${fareItem.fareReferenceCode})`}
                         <br />
                        {`Seat Availability : ${bookingClass?.resBookDesigQuantity}`} 
                      </div>
                      <button
                        className="button -dark-1 px-30 h-40 bg-blue-1 text-white float-end"
                        onClick={()=> updateCart(fareItem.rqCreateBooking, fareItemindex, index)}
                      >
                        {"USD " + fareItem.indicativeBaseFare} {loading ? <i class="spinner-border spinner-border-sm"></i>:<div className="icon-arrow-top-right ml-15" />}
                      </button>
                    </div>):(<>
                  <div className="col-auto text-left xl:text-center xl:center">
                    <div className="text-14 mt-15 md:mt-5">
                      {`Fare Baggage: ${fareItem.fareBaggageMaxAllowedPieces} ${fareItem.fareBaggageAllowanceType}(${fareItem.fareBaggageWeight} ${fareItem.fareBaggageUnitOfMeasureCode})`}
                      <br />
                      {`${fareItem.fareGroupName} - ${fareItem.fareReferenceName} (${fareItem.fareReferenceCode})`}
                      <br />
                        {`Seat Availability : ${bookingClass?.resBookDesigQuantity}`} 
                    </div>
                  </div>
                  <div className="col-auto text-right xl:text-center">
                    <div className="text-14 mt-15 md:mt-5 text-light-1">{`${bookingClass.cabin} - ${bookingClass.resBookDesigCode}`}</div>
                    <button
                      className="button -dark-1 px-30 h-40 bg-blue-1 text-white float-end"
                      onClick={()=> updateCart(fareItem.rqCreateBooking, fareItemindex, index)}
                    >
                      {"USD " + fareItem.indicativeBaseFare} <div className="icon-arrow-top-right ml-15" />
                    </button>
                  </div></>)}
                  </div>
                </div>
                );})}
              </div>
              <div className="border-light rounded-4 mt-20" style={{display:"none"}}>
                <div className="py-20 px-30">
                  <div className="row justify-between items-center">
                    <div className="col-auto">
                      <div className="fw-500 text-dark-1">
                        Depart • Sat, Mar 26
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 text-light-1">4h 05m</div>
                    </div>
                  </div>
                </div>
                <div className="py-30 px-30 border-top-light">
                  <div className="row y-gap-10 justify-between xl:justify-center flight-inner-section">
                    <div className="col-auto">
                      <div className="d-flex items-center mb-15 xl:justify-center ">
                        <div className="w-28 d-flex justify-center mr-15">
                          <img src="/img/flights/HolidayAir.svg" alt="image" />
                        </div>
                        <div className="text-14 text-light-1">
                          Pegasus Airlines 1169
                        </div>
                      </div>
                      <div className="relative z-0">
                        <div className="border-line-2" />
                        <div className="d-flex items-center">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-white" />
                          </div>
                          <div className="row">
                            <div className="col-auto">
                              <div className="lh-14 fw-500">8:25 am</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                                Istanbul Sabiha Gokcen (SAW)
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex items-center mt-15">
                          <div className="w-28 d-flex justify-center mr-15">
                            <img src="/img/flights/plane.svg" alt="image" />
                          </div>
                          <div className="text-14 text-light-1">4h 05m</div>
                        </div>
                        <div className="d-flex items-center mt-15">
                          <div className="w-28 d-flex justify-center mr-15">
                            <div className="size-10 border-light rounded-full bg-border" />
                          </div>
                          <div className="row">
                            <div className="col-auto">
                              <div className="lh-14 fw-500">9:30 am</div>
                            </div>
                            <div className="col-auto">
                              <div className="lh-14 fw-500">
                                London Stansted (STN)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto text-right md:text-left">
                      <div className="text-14 text-light-1">Economy</div>
                      <div className="text-14 mt-15 md:mt-5">
                        Airbus A320neo (Narrow-body jet)
                        <br />
                        Wi-Fi available
                        <br />
                        USB outlet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End collapase content */}
          </div>
          {/* End bg-white */}
        </div>
      ))): <><div className="js-accordion">
      <div className="py-30 px-30 bg-white rounded-4 base-tr mt-30">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col text-center">No Departure Flight Found</div></div></div></div></>)}
    </>
  );
};

export default FlightProperties;
