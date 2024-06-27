import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrderSubmittedInfoHotel = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { bookingRS } = useSelector((state) => ({ ...state.hotel }));
  const { resCart } = useSelector((state) => ({ ...state.flight }));
  const Router = useRouter();
  let GoToDetails = (itemcode)=>{
    Router.push(`/viewreservation/hotel/${itemcode}`);
  };

  //console.log(bookingRS);
  return (
    <>
    { cartItems && cartItems && cartItems.length > 0 && cartItems.map((cartItem, index) => (
      <>
            {cartItem?.product?.business === "Hotel" ? 
      <div className="col-xl-12 col-lg-12">
        <div className="order-completed-wrapper border-type-1  mt-40 rounded-8">
          <div className="d-flex flex-column items-center mt-40 lg:md-40 sm:mt-24">
            <div className="size-80 flex-center rounded-full bg-dark-3">
              <i className="icon-check text-30 text-white" />
            </div>
            <div className="text-30 lh-1 fw-600 mt-20">
              Hotel is Booked successfully!
            </div>
            <div className="text-15 text-light-1 mt-10">
              Booking details has been sent to your mail
            </div>
          </div>

          <div className="border-top-light px-50 py-35 mt-40">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Boking Ref Number</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {bookingRS?.BookingRS?.Reservations?.Reservation["@Locator"]}
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Booking Date</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                {bookingRS?.BookingRS["@TimeStamp"] ? new Intl.DateTimeFormat('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                        }).format(new Date(bookingRS?.BookingRS["@TimeStamp"])) : ""}
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Total</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {bookingRS?.BookingRS?.Reservations?.Reservation?.Items?.HotelItem?.Prices?.Price["@Currency"]} {bookingRS?.BookingRS?.Reservations?.Reservation?.Items?.HotelItem?.Prices?.Price?.TotalFixAmounts["@Nett"]}
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <Link class="button -md h-60 bg-blue-1 text-white"
                  href={`/viewreservation/hotel/${bookingRS?.BookingGuid}`}
                  //onClick={()=> {//console.log("Button clicked"+bookingRS?.BookingGuid);GoToDetails(bookingRS?.BookingGuid)}}
                >View Reservation</Link>
              </div>
            </div>
          </div>
        </div>
      </div> :
      <div className="col-xl-12 col-lg-12">
        <div className="order-completed-wrapper border-type-1  mt-40 rounded-8">
          <div className="d-flex flex-column items-center mt-40 lg:md-40 sm:mt-24">
            <div className="size-80 flex-center rounded-full bg-dark-3">
              <i className="icon-check text-30 text-white" />
            </div>
            <div className="text-30 lh-1 fw-600 mt-20">
              Flight is Booked successfully!
            </div>
            <div className="text-15 text-light-1 mt-10">
              Booking details has been sent to your mail
            </div>
          </div>

          <div className="border-type-1 rounded-8 px-50 py-35 mt-40">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Boking Ref Number</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {resCart?.airBookingList?.airReservation?.bookingReferenceIDList?.ID}
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Booking Date</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                {resCart?.airBookingList?.airReservation?.dateCreated ? new Intl.DateTimeFormat('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                        }).format(new Date(resCart?.airBookingList?.airReservation?.dateCreated)) : ""}
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Total</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {resCart?.airBookingList?.ticketInfo?.totalAmount?.currency?.code} {resCart?.airBookingList?.ticketInfo?.totalAmount?.value}
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <Link class="button -md h-60 bg-blue-1 text-white"
                  href={`/viewreservation/flight/${resCart?.BookingGuid}`}
                  //onClick={()=> {//console.log("Button clicked"+bookingRS?.BookingGuid);GoToDetails(bookingRS?.BookingGuid)}}
                >View Reservation</Link>
              </div>
            </div>
          </div>
        </div>
      </div>  } 
            </>
            ))}
    </>
  );
};

export default OrderSubmittedInfoHotel;
