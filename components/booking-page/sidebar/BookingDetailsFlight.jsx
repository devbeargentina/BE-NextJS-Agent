import ActionsButton from "@/components/dashboard/vendor-dashboard/booking/components/ActionsButton";
import Image from "next/image";
import { useSelector } from "react-redux";

const BookingDetailsFlight = (props) => {
  const {  extraCHARGES } = useSelector((state) => state.cart);
  const selectedFlight = props.response ? JSON.parse(props.response) :{};
  ////console.log(selectedFlight);
  const selectedReturnFlight = (props.returnFlightResponse && props.returnFlightResponse !== "string") ? JSON.parse(props.returnFlightResponse) :{};
  const flightExtraCharges = (props.extraServiceResponse && props.extraServiceResponse !== "" && props.extraServiceResponse !== "string") ? JSON.parse(props.extraServiceResponse) :{};
  
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
  
  // //console.log("selectedFlight :",JSON.stringify(selectedFlight))
  // //console.log(selectedReturnFlight)
  return selectedFlight?.flightSegmentID ? (
    <>
    
    <div className="mb-20" id={`div${selectedFlight?.flightSegmentID}`}  key={`${selectedFlight?.flightSegmentID}`}>
    <div className=" float-end">
    <button class="flex-censter position-absolute e-0 translate-middle bg-light-2 rounded-4 size-35 items-end" onClick={()=> props.removeCartItem(props.itemId)}><i class="icon-trash-2 text-16 text-light-1"></i></button></div>
              <div className="border-light rounded-4">
                <div className="py-20 px-30">
                  <div className="row justify-between items-center">
                    <div className="col-auto">
                      <div className="fw-500 text-dark-1">
                        Depart • {convertToCustomFormatS(selectedFlight?.departureDateTime)}
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 text-light-1">{`${selectedFlight?.airlineName}(${selectedFlight?.airlineCode}) - ${selectedFlight?.flightNumber}`}</div>
                    </div>
                  </div>
                </div>
                {selectedFlight?.fareComponentList?.map((fareItem, fareItemindex)=>(
                  <>
                <div className="py-30 px-30 border-top-light">
                  <div className="row y-gap-10 justify-between">
                  <div class="row x-gap-20 items-end"><div class="col-auto"><div class="lh-15 fw-500">{convertToCustomFormat(selectedFlight?.departureDateTime).split(', ')[1]}</div><div class="text-15 lh-15 text-light-1">{`${selectedFlight?.departureAirport.locationCode}`}</div></div><div class="col text-center">                          <div className="text-14 text-light-1">{selectedFlight?.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}</div><div class="flightLine"><div></div><div></div></div><div class="text-15 lh-15 text-light-1 mt-10">Nonstop</div></div><div class="col-auto"><div class="lh-15 fw-500">{convertToCustomFormat(selectedFlight?.arrivalDateTime).split(', ')[1]}</div><div class="text-15 lh-15 text-light-1">{`${selectedFlight?.arrivalAirport.locationCode}`}</div></div></div>
                    <div className="col-auto text-left md:text-left">
                      <div className="text-14 mt-15 md:mt-5"><i class="icon-luggage"></i>
                        {` : ${fareItem.fareBaggageMaxAllowedPieces} ${fareItem.fareBaggageAllowanceType}(${fareItem.fareBaggageWeight} ${fareItem.fareBaggageUnitOfMeasureCode})`}
                        <br />
                        {`${fareItem.fareGroupName} - ${fareItem.fareReferenceName} (${fareItem.fareReferenceCode})`}
                      </div>
                    </div>
                    <div className="col-auto text-right md:text-left">
                      <div className="text-14 mt-15 md:mt-5">
                      {`${fareItem.cabin} - ${fareItem.cabinClassCode}`}
                        {/* <br />
                      {"USD " + fareItem.indicativeBaseFare} */}
                      </div>
                    </div>
                  </div>
                    
                    {fareItem.passengerFareInfoList?.map((pFareItem, pFareItemindex)=>(
                      <>
                  <div className="row y-gap-10 justify-between">
                        <div className="col-auto text-left md:text-left">
                          <div className="text-14 mt-15 md:mt-5"><i class="icon-group"></i>
                            {` ${pFareItem.passengerQuantity} x ${pFareItem.passengerType} (Base : ${pFareItem.pricingInfo.baseFare.amount})`}
                          </div>
                        </div>
                        <div className="col-auto text-right md:text-left">
                          <div className="text-14 mt-15 md:mt-5">
                          {"USD " + (pFareItem.passengerQuantity*pFareItem.pricingInfo.baseFare.amount)}
                          </div>
                        </div>
                        </div>
                        {pFareItem?.pricingInfo?.taxes?.taxList?.map((tax, index) => (
                        <div className="row y-gap-10 justify-between">
                        <div className="col-auto text-left md:text-left w-75">
                          <div className="text-14"><i class="icon-group"></i>
                            {` ${pFareItem.passengerQuantity} x ${tax.taxName} (Code : ${tax.taxCode})`}
                          </div>
                        </div>
                        <div className="col-auto text-right md:text-left">
                          <div className="text-14">
                          {"USD " + (pFareItem.passengerQuantity*tax.value)}
                          </div>
                        </div>
                          {/* //<ActionsButton /> */}
                        </div>
                        ))}
                        </>
                    ))}
                </div>
  <div className="px-20 py-20 bg-blue-2 rounded-4 mt-0">
        <div className="row y-gap-5 justify-between">
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">Price</div>
          </div>
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">USD {fareItem?.pricingOverview?.totalAmount?.value}</div>
          </div>
        </div>
      </div>
                </>
                ))}
                
            {selectedReturnFlight?.flightSegmentID ? (
    <><hr className="mt-0 p-0" />
                <div className="py-20 px-30">
                  <div className="row justify-between items-center">
                    <div className="col-auto">
                      <div className="fw-500 text-dark-1">
                        Return • {convertToCustomFormatS(selectedReturnFlight?.departureDateTime)}
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 text-light-1">{`${selectedReturnFlight?.airlineName}(${selectedReturnFlight?.airlineCode}) - ${selectedReturnFlight?.flightNumber}`}</div>
                    </div>
                  </div>
                </div>
                {selectedReturnFlight?.fareComponentList?.map((fareItem, fareItemindex)=>(
                  <>
                <div className="py-30 px-30 border-top-light">
                  <div className="row y-gap-10 justify-between">
                  <div class="row x-gap-20 items-end"><div class="col-auto"><div class="lh-15 fw-500">{convertToCustomFormat(selectedReturnFlight?.departureDateTime).split(', ')[1]}</div><div class="text-15 lh-15 text-light-1">{`${selectedReturnFlight?.departureAirport.locationCode}`}</div></div><div class="col text-center">                          <div className="text-14 text-light-1">{selectedReturnFlight?.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}</div><div class="flightLine"><div></div><div></div></div><div class="text-15 lh-15 text-light-1 mt-10">Nonstop</div></div><div class="col-auto"><div class="lh-15 fw-500">{convertToCustomFormat(selectedReturnFlight?.arrivalDateTime).split(', ')[1]}</div><div class="text-15 lh-15 text-light-1">{`${selectedReturnFlight?.arrivalAirport.locationCode}`}</div></div></div>
                    <div className="col-auto text-left md:text-left">
                      <div className="text-14 mt-15 md:mt-5"><i class="icon-luggage"></i>
                        {` : ${fareItem.fareBaggageMaxAllowedPieces} ${fareItem.fareBaggageAllowanceType}(${fareItem.fareBaggageWeight} ${fareItem.fareBaggageUnitOfMeasureCode})`}
                        <br />
                        {`${fareItem.fareGroupName} - ${fareItem.fareReferenceName} (${fareItem.fareReferenceCode})`}
                      </div>
                    </div>
                    <div className="col-auto text-right md:text-left">
                      <div className="text-14 mt-15 md:mt-5">
                      {`${fareItem.cabin} - ${fareItem.cabinClassCode}`}
                        {/* <br />
                      {"USD " + fareItem.indicativeBaseFare} */}
                      </div>
                    </div>
                  </div>
                    {fareItem.passengerFareInfoList?.map((pFareItem, pFareItemindex)=>(
                      
                      <>
                  <div className="row y-gap-10 justify-between">
                        <div className="col-auto text-left md:text-left">
                          <div className="text-14 mt-15 md:mt-5"><i class="icon-group"></i>
                            {` ${pFareItem.passengerQuantity} x ${pFareItem.passengerType} (Base : ${pFareItem.pricingInfo.baseFare.amount})`}
                          </div>
                        </div>
                        <div className="col-auto text-right md:text-left">
                          <div className="text-14 mt-15 md:mt-5">
                          {"USD " + (pFareItem.passengerQuantity*pFareItem.pricingInfo.baseFare.amount)}
                          </div>
                        </div>
                        </div>
                        {pFareItem?.pricingInfo?.taxes?.taxList?.map((tax, index) => (
                        <div className="row y-gap-10 justify-between">
                        <div className="col-auto text-left md:text-left w-75">
                          <div className="text-14"><i class="icon-group"></i>
                            {` ${pFareItem.passengerQuantity} x ${tax.taxName}`} {/* (Code : ${tax.taxCode})`} */}
                          </div>
                        </div>
                        <div className="col-auto text-right md:text-left">
                          <div className="text-14">
                          {"USD " + (pFareItem.passengerQuantity*tax.value)}
                          {/* <ActionsButton taxes={pFareItem?.pricingInfo?.taxes} /> */}
                          </div>
                        </div>
                          {/* //<ActionsButton /> */}
                        </div>
                        ))}
                        </>
                    ))}
                </div>
  <div className="px-20 py-20 bg-blue-2 rounded-4 mt-0">
        <div className="row y-gap-5 justify-between">
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">Price</div>
          </div>
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">USD {fareItem?.pricingOverview?.totalAmount?.value}</div>
          </div>
        </div>
      </div>
      </>
                ))}
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
                  <div className="row y-gap-10 justify-between">
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
    </>
    // End px-30
  ):(<></>)}
{flightExtraCharges?.totalAmountValue ? (
    <>
                <div className="py-10 px-20 border-top-light">
                  <div className="row y-gap-10 justify-between">
                        <div className="col-auto text-left md:text-left">
                          <div className="text-14 mt-15 md:mt-5"><i class="icon-group"></i>
                            {`Service Fee`}
                          </div>
                        </div>
                        <div className="col-auto text-right md:text-left">
                          <div className="text-14 mt-15 md:mt-5">
                          {"USD " + (flightExtraCharges?.serviceFee?.feeAmountValue)}
                          </div>
                        </div>
                        </div>
                  <div className="row y-gap-10 justify-between">
                        <div className="col-auto text-left md:text-left">
                          <div className="text-14 mt-15 md:mt-5"><i class="icon-group"></i>
                            {`Tax`}
                          </div>
                        </div>
                        <div className="col-auto text-right md:text-left">
                          <div className="text-14 mt-15 md:mt-5">
                          {"USD " + (flightExtraCharges?.taxesValue)}
                          </div>
                        </div>
                        </div>
                </div>
    </>
    // End px-30
  ):(<></>)}
  
              </div>
            </div>
    </>
    // End px-30
  ):(<></>);
};

export default BookingDetailsFlight;
