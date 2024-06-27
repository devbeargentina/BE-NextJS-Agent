
'use client'

import { hotelsData } from "../../../data/hotels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Skeleton from "@/components/common/skeletons/Skeleton";
import { useRouter } from "next/navigation";

const HotelProperties = () => {
  const { hotelList,loading,totalNights } = useSelector((state) => state.hotel);

  const Router = useRouter()

  let GoToDetails = (itemcode)=>{
    Router.push(`/hotel-details/${itemcode}`);
  };

  return (
    <>
    
      {loading ? <Skeleton /> : hotelList.length > 0 ? (hotelList.map((item) => (
        <div className="col-12" key={item?.code}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4  custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        {item?.images?.map((slide, i) => (
                          <SwiperSlide key={i}>
                            <Image
                              width={250}
                              height={250}
                              className="rounded-4 col-12 js-lazy"
                              src={slide.url}
                              onError={(e) => {
                                e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqttQPU5LFQgFKhRczOnjd8_9blH69mSr3sw9bsVQj41fh9tCvF1X0Bk7Y3g&s"; // Replace with the URL of your default image
                              }}
                              alt="image"
                            />
                          </SwiperSlide>
                        ))}
                        {item?.images.length === 0 && (
                            <Image
                            width={250}
                            height={250}
                            className="rounded-4 col-12 js-lazy"
                            src="data:image/jpeg;base64,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"
                            alt="Hotel Image"
                          />
                        )
                        }
                      </Swiper>
                    </div>
                  </div>
                  {/* End image */}

                  {/* <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div> */}
                </div>
              </div>
              {/* End .col */}

              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">
                  {item?.name}
                  <br className="lg:d-none" /> {item?.address1?.address}
                  <div className="d-inline-block ml-10">
                  {item.hotelCategory.type === '5est' ? (
                      <React.Fragment>
                        {Array(5).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : item.hotelCategory.type === '4est' ? (
                      <React.Fragment>
                        {Array(4).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : item.hotelCategory.type === '3est' ? (
                      <React.Fragment>
                        {Array(3).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : item.hotelCategory.type === '2est' ? (
                      <React.Fragment>
                        {Array(2).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : (
                      <i className="icon-star text-10 text-yellow-2"></i>
                    )}
                  </div>
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">{item?.address.address}</p>
                  </div>

                  {/* <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      className="d-block text-14 text-blue-1 underline"
                    >
                      Show on map
                    </button>
                  </div> */}

                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1"></div>
                  </div>

                  {/* <div className="col-auto">
                    <p className="text-14">2 km to city center</p>
                  </div> */}
                </div>

                {/* {item?.hotelOptions?.hotelOption?.hotelRooms?.hotelRoomList?.map((room, i) => (
  <div className="text-14 lh-15 mt-20" key={i}>
    <div className="fw-500">{room.name}</div>
    <div className="text-light-1">{`${room.roomOccupancy.adults} adult${room.roomOccupancy.adults !== 1 ? 's' : ''}`}</div>
    {room.roomOccupancy.children > 0 && (
      <div className="text-light-1">{`${room.roomOccupancy.children} child${room.roomOccupancy.children !== 1 ? 'ren' : ''}`}</div>
    )}
  </div>
))} */}

{item?.hotelOptions?.hotelOption?.additionalElements?.hotelOffers?.hotelOffer?.category === "GEN" && (
  <div className="text-14 text-green-2 lh-15 mt-10">
    <div className="fw-500">{item?.hotelOptions?.hotelOption?.additionalElements?.hotelOffers?.hotelOffer?.name}</div>
    <div className="">
    {item?.hotelOptions?.hotelOption?.additionalElements?.hotelOffers?.hotelOffer?.description}
    </div>
  </div>
)}

                <div className="row x-gap-10 y-gap-10 pt-20">
                {item.features.map((item) => (
                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                      {item.name}
                    </div>
                  </div>
                  ))}
                </div>
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  {/* <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">
                      3,014 reviews
                    </div>
                  </div> */}
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {item?.hotelCategory?.type.replace("est","")}
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-14 text-light-1 mt-50 md:mt-20">
                    {totalNights} night(s)
                  </div>
                  <div className="text-22 lh-12 fw-600 mt-5">
                  {item?.currency} {item?.indicativePrice}

                  </div>
                  <div className="text-14 text-light-1 mt-5">
                  {item?.currency} {item?.indicativePrice} taxes and charges
                  </div>

                  <button
                    onClick={()=> GoToDetails(item.code)}
                    //href={`/hotel-details/${item.code}`}
                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  >
                    See Availability{" "}
                    {loading ? <i class="spinner-border spinner-border-sm"></i>:<div className="icon-arrow-top-right ml-15" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))): <><div className="js-accordion">
      <div className="py-30 px-30 bg-white rounded-4 base-tr mt-30">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col text-center">No Hotel(s) Found</div></div></div></div></>}
    </>
  );
};

export default HotelProperties;
