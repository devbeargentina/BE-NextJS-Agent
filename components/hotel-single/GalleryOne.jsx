
'use client'

import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import Link from "next/link";
import React, { useState } from 'react'

export default function GalleryOne({hotel}) {
    const [isOpen, setOpen] = useState(false);
  return (
    <>
     <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
      />
    <section className="pt-40">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="row x-gap-20  items-center">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-25 fw-600">{hotel?.hotelName}</h1>
                </div>
                {/* End .col */}
                <div className="col-auto">
                  {hotel?.hotelCategory.type === '5est' ? (
                      <React.Fragment>
                        {Array(5).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : hotel?.hotelCategory.type === '4est' ? (
                      <React.Fragment>
                        {Array(4).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : hotel?.hotelCategory.type === '3est' ? (
                      <React.Fragment>
                        {Array(3).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : hotel?.hotelCategory.type === '2est' ? (
                      <React.Fragment>
                        {Array(2).fill().map((_, starIndex) => (
                          <i key={starIndex} className="icon-star text-10 text-yellow-2"></i>
                        ))}
                      </React.Fragment>
                    ) : (
                      <i className="icon-star text-10 text-yellow-2"></i>
                  )}
                </div>
              </div>
              {/* End .row */}

              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <div className="d-flex items-center text-15 text-light-1">
                    <i className="icon-location-2 text-16 mr-5" />
                    {hotel?.address.address}
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    data-x-click="mapFilter"
                    className="text-blue-1 text-15 underline"
                  >
                    Show on map
                  </button>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto">
                  <div className="text-14">
                    From{" "}
                    <span className="text-22 text-dark-1 fw-500">
                      {hotel?.currency} {hotel?.indicativePrice}
                    </span>
                  </div>
                </div>
                <div className="col-auto">
                  <Link
                    //href="/booking-page"
                    href="#rooms"
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                  >
                    Select Room <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <Gallery>
            <div className="galleryGrid -type-1 pt-30">
              {hotel.images.map((item) => (

                  <div className="galleryGrid__item">
                    <Item
                      original={item?.fileName}
                      thumbnail={item?.fileName}
                      width={660}
                      height={660}
                    >
                      {({ ref, open }) => (
                        <img
                          src={item?.fileName}
                          ref={ref}
                          onClick={open}
                          alt="image"
                          role="button"
                          className="rounded-4"
                          onError={(e) => {
                            e.target.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqttQPU5LFQgFKhRczOnjd8_9blH69mSr3sw9bsVQj41fh9tCvF1X0Bk7Y3g&s"; // Replace with the URL of your default image
                          }}
                        />
                      )}
                    </Item>
                    {/* <div className="absolute px-20 py-20 col-12 d-flex justify-end">
                      <button className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1">
                        <i className="icon-heart text-16" />
                      </button>
                    </div> */}
                  </div>
              ))}
              
              <div className="galleryGrid__item">
                <img
                  src="/img/gallery/1/3.png"
                  alt="image"
                  className="rounded-4"
                  role="button"
                />
                <div className="absolute h-full col-12 flex-center">
                  <div
                    className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1 js-gallery"
                    role="button"
                    onClick={() => setOpen(true)}
                  >
                    <i className="icon-play text-16" />
                  </div>
                </div>
              </div>
              {/* End .galleryGrid__item */}

              <div className="galleryGrid__item">
                <Item
                  original="/img/gallery/1/4.png"
                  thumbnail="/img/gallery/1/4.png"
                  width={450}
                  height={375}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="/img/gallery/1/4.png"
                      alt="image"
                      className="rounded-4"
                      role="button"
                    />
                  )}
                </Item>
              </div>
              {/* End .galleryGrid__item */}

              <div className="galleryGrid__item relative d-flex">
                <img
                  src="/img/gallery/1/5.png"
                  alt="image"
                  className="rounded-4"
                />
                <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                  <Item
                    original="/img/gallery/1/5.png"
                    thumbnail="/img/gallery/1/5.png"
                    width={450}
                    height={375}
                  >
                    {({ ref, open }) => (
                      <div
                        className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                        ref={ref}
                        onClick={open}
                        role="button"
                      >
                        See All Photos
                      </div>
                    )}
                  </Item>
                </div>
              </div>
              {/* End .galleryGrid__item */}
            </div>
          </Gallery>
        </div>
        {/* End .container */}
      </section>
    </>
  )
}
