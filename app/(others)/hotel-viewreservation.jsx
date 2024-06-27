import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton from "@/components/common/skeletons/Skeleton";
import { useDispatch, useSelector } from "react-redux";

const HotelViewReservation = ({params}) => {
//console.log("enter into Hotel view reservation page");
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
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">Hotel</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <h4>Hotel Details</h4>
                <div class="border-type-1 rounded-8 px-50 py-35">
                  
                  <div class="row">
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Name</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem?.HotelInfo?.Name}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Category</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem?.HotelInfo?.HotelCategory["#text"]}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Address</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem?.HotelInfo?.Address}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Room Name</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem?.HotelRooms?.HotelRoom?.Name}</div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Check In</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem["@Start"]}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Check Out</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem["@End"]}</div>
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
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Paxes?.Pax[0].Name + " " + params?.bookingResponse?.Reservation?.Paxes?.Pax[0].Surname}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Email</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Paxes?.Pax[0].Email}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Document Number</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Paxes?.Pax[0].Document["#text"]}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Phone Number</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Paxes?.Pax[0].PhoneNumbers.PhoneNumber}</div>
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
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem?.Prices?.Price["@Currency"] + " " + params?.bookingResponse?.Reservation?.Items?.HotelItem?.Prices?.Price?.TotalFixAmounts?.Service["@Amount"]}</div>
                    </div>
                    
                    {params?.bookingResponse?.Reservation?.Items?.HotelItem?.Prices?.Price?.TotalFixAmounts?.ServiceTaxes &&
                      <div class="col-lg-3 col-md-6">
                        <div class="text-15 lh-12">Service Tax</div>
                        <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem?.Prices?.Price["@Currency"] + " " + params?.bookingResponse?.Reservation?.Items?.HotelItem?.Prices?.Price?.TotalFixAmounts?.ServiceTaxes["@Amount"]}</div>
                      </div>
                    }
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12">Total</div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10">{params?.bookingResponse?.Reservation?.Items?.HotelItem?.Prices?.Price["@Currency"] + " " + params?.bookingResponse?.Reservation?.Items?.HotelItem?.Prices?.Price?.TotalFixAmounts["@Nett"]}</div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="text-15 lh-12"></div>
                      <div class="text-15 lh-12 fw-500 text-blue-1 mt-10"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <h4>Cancellation Policy</h4>
                <div class="border-type-1 rounded-8 px-50 py-35">
                  <div class="row">
                    <ul>
                    {params?.bookingResponse?.Reservation?.Items?.HotelItem?.CancellationPolicy?.PolicyRules?.Rule.map(
                          (item) => (item["@To"] !== "" && item["@PercentPrice"] !== "0") ? (
                            <li key={item["@To"]}>
                              If you cancel booking before {item["@To"]} days of check-in then {item["@PercentPrice"]} percentage charges apply
                            </li>
                          ): null
                        )}
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotelViewReservation;
