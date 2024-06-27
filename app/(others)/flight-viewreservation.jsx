import React, { useState, useEffect } from "react";

const FlightViewReservation = ({params}) => {

//console.log("enter into Flight view reservation page");
  return (
    <>
      
      <section className="layout-pt-sm layout-pb-sm bg-white">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-12">
              <div className="">
                <h4>Booking Details</h4>
                <div class="border-type-1 rounded-8 px-50 py-35">
                  <div class="row">
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Booking Ref Number</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingRefNumber}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Booking Date</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{new Intl.DateTimeFormat('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                        }).format(new Date(params?.bookingDate))}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Booking Status</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingStatus}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Itinerary Name</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{"Flight -" + params?.itineraryName}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <h4>Flight Info</h4>
                <div class="border-type-1 rounded-8 px-50 py-35">
                  <div class="row">
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Details</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.departureAirport?.locationName + " To " + params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.arrivalAirport?.locationName}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Flight Number</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.flightNumber}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Class</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.bookingClass?.cabin}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Duration</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.journeyDuration.replace("PT","").replace("P","").replace("T","").replace("D"," Day(s) ").replace("H"," Hour(s) ").replace("M"," Minute(s)")}</div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Departure</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.departureDateTime}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Arrival</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.flightSegment?.arrivalDateTime}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Baggage</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.maxAllowedPieces + " " + params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.allowanceType + "("+ params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.maxAllowedWeight.weight + " " + params?.bookingResponse?.airBookingList?.airReservation?.airItinerary?.bookOriginDestinationOptions?.bookOriginDestinationOptionList[0].bookFlightSegmentList?.fareInfo?.fareBaggageAllowance?.maxAllowedWeight.unitOfMeasureCode + ")"}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <h4>Pax Details</h4>
                <div class="border-type-1 rounded-8 px-50 py-35">
                  
                  <div class="row">
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Name</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airTravelerList?.personName?.givenName + " " + params?.bookingResponse?.airBookingList?.airReservation?.airTravelerList?.personName?.surname}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Type</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airTravelerList?.passengerTypeCode}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Document</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airTravelerList?.documentInfoList?.docType +" - "+params?.bookingResponse?.airBookingList?.airReservation?.airTravelerList?.documentInfoList?.docID}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Gender</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.airReservation?.airTravelerList?.gender}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <h4>Price Details</h4>
                <div class="border-type-1 rounded-8 px-50 py-35">
                  
                  <div class="row">
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Base Price</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.baseFare?.amount?.currency?.code + " " + params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.baseFare?.amount?.value}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Tax</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.taxes?.totalAmount?.currency?.code + " " + params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.pricingInfo?.taxes?.totalAmount?.value}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Total</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.airBookingList?.ticketInfo?.ticketItemList?.totalAmountText}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12"></div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="pt-2">
                <h4>Cancellation Policy</h4>
                <div class="border-type-1 rounded-8 px-50 py-35">
                  <div class="row">
                    <ul>
                      {params?.bookingResponse.Reservation.Items.HotelItem.CancellationPolicy?.PolicyRules.Rule.map(
                        (item) => (
                          <li key={item["@To"]}>
                            If you cancel booking before {item["@To"]} days of check-in then {item["@PercentPrice"]} percentage charges apply
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div> */}
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightViewReservation;
