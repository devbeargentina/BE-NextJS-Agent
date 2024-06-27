import Image from "next/image";
import { useSelector } from "react-redux";

const BookingDetailsHotel = () => {
  const { selectedFlight } = useSelector((state) => ({ ...state.hotel }));
 // //console.log("selectedFlight :",JSON.stringify(selectedHotel))
  return (
    <>
    
    <div className="" id={`div${selectedFlight?.flightSegmentID}`}>
              <div className="border-light rounded-4">
                <div className="py-20 px-30">
                  <div className="row justify-between items-center">
                    <div className="col-auto">
                      <div className="fw-500 text-dark-1">
                        Depart • {new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
}).format(new Date(selectedFlight?.departureDateTime)}
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 text-light-1">{`${selectedFlight?.airlineName}(${selectedFlight?.airlineCode}) - ${selectedFlight?.flightNumber}`}</div>
                    </div>
                  </div>
                </div>
                {selectedFlight?.fareComponentList.map((fareItem, fareItemindex)=>(
                <div className="py-30 px-30 border-top-light">
                  <div className="row y-gap-10 justify-between">
                  <div class="row x-gap-20 items-end"><div class="col-auto"><div class="lh-15 fw-500">{new Date(selectedFlight?.departureDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).split(' ')}</div><div class="text-15 lh-15 text-light-1">{`${selectedFlight?.departureAirport.locationCode}`}</div></div><div class="col text-center">                          <div className="text-14 text-light-1">{selectedFlight?.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}</div><div class="flightLine"><div></div><div></div></div><div class="text-15 lh-15 text-light-1 mt-10">Nonstop</div></div><div class="col-auto"><div class="lh-15 fw-500">{new Date(selectedFlight?.arrivalDateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).split(' ')}</div><div class="text-15 lh-15 text-light-1">{`${selectedFlight?.arrivalAirport.locationCode}`}</div></div></div>
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
                        <br />
                      {fareItem.pricingInfo.totalFare.currencyCode + " " + fareItem.pricingInfo.totalFare.amount}
                      </div>
                    </div>
                  </div>
                </div>
                ))}
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
                  <div className="row y-gap-10 justify-between">
                    <div className="col-auto">
                      <div className="d-flex items-center mb-15">
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
    </>
    // End px-30
  );
};

export default BookingDetailsHotel;
