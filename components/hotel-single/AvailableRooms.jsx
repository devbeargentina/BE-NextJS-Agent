import Image from "next/image";
import { hotelCheckavailBookingRules,hotelAvailResult, updateHotelAvailRQ ,updateSelectedHotel} from "@/features/hero/hotelSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { createCart, getCartById } from "@/features/hero/cartSlice";

const AvailableRooms = ({ hotel }) => {
  const { hotelList,hotelAvailRQ, filterParam,loading,selectedRoomTypeCode } = useSelector((state) => ({ ...state.hotel }));
  const { hotelCriteria } = useSelector((state) => state.searchCriteria);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleBooking = (ratePlanCode, itemPrice) => {
    // Your booking logic goes here
    //console.log(`Booking room with rate plan code: ${ratePlanCode}`);
    const modifiedHotel = {
      selectedHotel:hotel,
      selectedRoomTypeCode:ratePlanCode,
    };
    
    const startDate = new Date(decodeURIComponent(hotelCriteria.startDate));
    const endDate = new Date(decodeURIComponent(hotelCriteria.endDate));
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  dispatch(createCart({ rqAddSessionCart : {
    product: {
    business: "Hotel",
    request: JSON.stringify(hotelCriteria),
    response: JSON.stringify(modifiedHotel),
    adultPrice: itemPrice,
    childPrice: 0,
    infantPrice: 0,
    adult: (hotelCriteria?.room),
    child: 0,
    startDate: "2024-03-15T09:57:50.004Z",
    endDate: "2024-03-15T09:57:50.004Z",
    room: (hotelCriteria?.room),
    nights: (Math.ceil(differenceInDays)),
    extraServiceResponse: "string",
    extraServiceTotalAmount: 0,
    extraProcessingFeeAmount: 10,
    paxInformation: "string"
}}, router, undefined })).then((action) => {
  // Check if cart is empty, then redirect
  if (!action.payload.items || action.payload.items.length === 0) {
    router.push('/'); // Assuming you have access to router here
  } else {
    router.push('/cart-page'); // Or redirect to cart page
  }
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
   //dispatch(updateSelectedHotel(modifiedHotel));
   const pax = Array(hotelCriteria.room).fill().map(() => ({ age: 25 }));
   const hotelCheckAvailBookingRulesRQ = {
      searchParam: {
        startDate: new Date(decodeURIComponent(hotelCriteria.startDate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        endDate: new Date(decodeURIComponent(hotelCriteria.endDate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        pax: pax
      },
      selectedRoomTypeCode:ratePlanCode,
      HotelCode:hotel?.jpCode
    };
    
    //dispatch(hotelCheckavailBookingRules({ hotelCheckAvailBookingRulesRQ, router, undefined }));
    //router.push('/cart-page');
    // Add additional booking logic as needed
  };
  return (
    <>

    {hotel.hotelOptions.hotelOption.map((item) => (
      <div className="border-light rounded-4 px-30 py-30 sm:px-20 sm:py-20">
        <div className="row y-gap-20">
          <div className="col-12">
            <h3 className="text-18 fw-500 mb-15">{item?.hotelRooms?.hotelRoomList[0].name}</h3>
            <div className="roomGrid">
              <div className="roomGrid__header">
                <div>Room Type</div>
                <div>Benefits</div>
                <div>Sleeps</div>
                <div>Price</div>
                {/* <div>Select Rooms</div> */}
                <div />
              </div>
              {/* End .roomGrid__header */}

              <div className="roomGrid__grid">
                <div>
                  <div className="ratio ratio-1:1">
                    <Image
                      width={180}
                      height={180}
                      src="/img/backgrounds/1.png"
                      alt="image"
                      className="img-ratio rounded-4"
                    />
                  </div>
                  {/* End image */}
                  <div className="y-gap-5 mt-20">
                    {/* <div className="d-flex items-center">
                      <i className="icon-no-smoke text-20 mr-10" />
                      <div className="text-15">Non-smoking rooms</div>
                    </div>
                    <div className="d-flex items-center">
                      <i className="icon-wifi text-20 mr-10" />
                      <div className="text-15">Free WiFi</div>
                    </div>
                    <div className="d-flex items-center">
                      <i className="icon-parking text-20 mr-10" />
                      <div className="text-15">Parking</div>
                    </div>
                    <div className="d-flex items-center">
                      <i className="icon-kitchen text-20 mr-10" />
                      <div className="text-15">Kitchen</div>
                    </div> */}
                  </div>
                  {/* End room features */}
                  {/* <a
                    href="#"
                    className="d-block text-15 fw-500 underline text-blue-1 mt-15"
                  >
                    Show Room Information
                  </a> */}
                </div>
                {/* End roomgrid inner */}

                <div className="y-gap-30">
                  <div className="roomGrid__content">
                    <div>
                      <div className="text-15 fw-500 mb-10">
                        Your price includes:
                      </div>
                      <div className="y-gap-8">
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">Pay at the hotel</div>
                        </div>
                        {/* <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Pay nothing until March 30, 2022
                          </div>
                        </div>
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Free cancellation before April 1, 2022
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div>
                      <div className="d-flex items-center text-light-1">
                        {Array(item?.hotelRooms?.hotelRoomList[0].roomOccupancy.adults).fill().map((_, starIndex) => (
                          <div className="icon-man text-24" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-18 lh-15 fw-500">
                        {item?.prices.price.currency} {item?.prices.price.totalFixAmounts.gross}
                      </div>
                      <div className="text-14 lh-18 text-light-1">
                        Includes taxes and charges
                      </div>
                    </div>

                    {/* <div>
                      <div className="dropdown js-dropdown js-price-1-active">
                        <select className="form-select dropdown__button d-flex items-center rounded-4 border-light px-15 h-50 text-14">
                          <option value="1" defaultValue>
                            1 (US$ 3,120)
                          </option>
                          <option value="2">2 (US$ 3,120)</option>
                          <option value="3"> 3 (US$ 3,120)</option>
                          <option value="4"> 4 (US$ 3,120)</option>
                          <option value="5"> 5 (US$ 3,120)</option>
                        </select>
                      </div>
                    </div> */}
                  </div>
                  {/* End romm Grid horizontal content */}

                  {/* <div className="roomGrid__content">
                    <div>
                      <div className="text-15 fw-500 mb-10">
                        Your price includes:
                      </div>
                      <div className="y-gap-8">
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">Pay at the hotel</div>
                        </div>
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Pay nothing until March 30, 2022
                          </div>
                        </div>
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Free cancellation before April 1, 2022
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex items-center text-light-1">
                        <div className="icon-man text-24" />
                        <div className="icon-man text-24" />
                      </div>
                    </div>
                    <div>
                      <div className="text-18 lh-15 fw-500">
                        US${hotel?.price}
                      </div>
                      <div className="text-14 lh-18 text-light-1">
                        Includes taxes and charges
                      </div>
                    </div>
                    <div>
                      <div className="dropdown js-dropdown js-price-1-active">
                        <select className="form-select dropdown__button d-flex items-center rounded-4 border-light px-15 h-50 text-14">
                          <option value="1" defaultValue>
                            1 (US$ 3,120)
                          </option>
                          <option value="2">2 (US$ 3,120)</option>
                          <option value="3"> 3 (US$ 3,120)</option>
                          <option value="4"> 4 (US$ 3,120)</option>
                          <option value="5"> 5 (US$ 3,120)</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                  {/* End romm Grid horizontal content */}

                  {/* <div className="roomGrid__content">
                    <div>
                      <div className="text-15 fw-500 mb-10">
                        Your price includes:
                      </div>
                      <div className="y-gap-8">
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">Pay at the hotel</div>
                        </div>
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Pay nothing until March 30, 2022
                          </div>
                        </div>
                        <div className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">
                            Free cancellation before April 1, 2022
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex items-center text-light-1">
                        <div className="icon-man text-24" />
                        <div className="icon-man text-24" />
                      </div>
                    </div>
                    <div>
                      <div className="text-18 lh-15 fw-500">
                        US${hotel?.price}
                      </div>
                      <div className="text-14 lh-18 text-light-1">
                        Includes taxes and charges
                      </div>
                    </div>
                    <div>
                      <div className="dropdown js-dropdown js-price-1-active">
                        <select className="form-select dropdown__button d-flex items-center rounded-4 border-light px-15 h-50 text-14">
                          <option value="1" defaultValue>
                            1 (US$ 3,120)
                          </option>
                          <option value="2">2 (US$ 3,120)</option>
                          <option value="3"> 3 (US$ 3,120)</option>
                          <option value="4"> 4 (US$ 3,120)</option>
                          <option value="5"> 5 (US$ 3,120)</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                  {/* End romm Grid horizontal content */}
                </div>
                {/* End price features */}

                <div>
                  {/* <div className="text-14 lh-1">1 rooms for</div> */}
                  <div className="text-22 fw-500 lh-17 mt-5">
                  {item?.prices.price.currency} {item?.prices.price.totalFixAmounts.gross}
                  </div>
                  <a
                    className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-10"
                    onClick={() => handleBooking(item.ratePlanCode, item?.prices.price.totalFixAmounts.gross)}
                  >
                    Reserve {loading ? <i class="spinner-border spinner-border-sm  ml-15"></i>:<div className="icon-arrow-top-right ml-15" />}
                  </a>
                  <div className="text-15 fw-500 mt-30">
                    You&lsquo;ll be taken to the next step
                  </div>
                  <ul className="list-disc y-gap-4 pt-5">
                    <li className="text-14">Confirmation is immediate</li>
                    <li className="text-14">No registration required</li>
                    <li className="text-14">No booking or credit card fees!</li>
                  </ul>
                </div>
                {/* End right price info */}
              </div>
            </div>
            {/* End .roomGrid */}
          </div>
          {/* End .col-12 */}
        </div>
        {/* End .row */}
      </div>
    ))} 
    </>
  );
};

export default AvailableRooms;
