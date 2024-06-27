
'use client'
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-3";
import DefaultFooter from "@/components/footer/default";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import HotelViewReservation from "@/app/(others)/hotel-viewreservation";
import HotelVoucher from "@/app/(others)/hotel-voucher";
import HotelInvoice from "@/app/(others)/hotel-invoice";
import FlightViewReservation from "@/app/(others)/flight-viewreservation";
import FlightVoucher from "@/app/(others)/flight-voucher";
import FlightInvoice from "@/app/(others)/flight-invoice";
import { getBooking } from "@/features/hero/bookingSlice";
import Skeleton from "@/components/common/skeletons/Skeleton";

const viewreservation = ({params}) => {
  
  const { loading } = useSelector((state) => ({...state.booking}));
  console.log("enter into index view reservation page");
  const dispatch = useDispatch();
  const router = useRouter();
  const bookingid = params.id;
  const type = params.type;
  useEffect(() => {
    dispatch(getBooking({ bookingid, router, undefined }));
  }, [dispatch]);
  const { getbookingRS } = useSelector((state) => state.booking);
  console.log("enter into index view reservation page BookingRS:"+getbookingRS);
  console.log("enter into index view reservation page params:"+params);
  
   return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}
 

      {type ?

      <section className="pt-40 pb-40 bg-light-2">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    {!type && 
                    <div className="text-center">
                      <h1 className="text-30 fw-600">{`Reservation Details`}</h1>
                    </div>
                    }
                    {(!getbookingRS || getbookingRS === null) ? <Skeleton /> :
                      params.business == "hotel" ? (type === "voucher" ? <HotelVoucher params={getbookingRS}/> : <HotelInvoice params={getbookingRS}/>) : (type === "voucher" ? <FlightVoucher params={getbookingRS}/> : <FlightInvoice params={getbookingRS}/>)
                    }
                  </div>
                  {/* End col-12 */}
                </div>
              </div>
            </section>
      :
      <section className="pt-40 pb-40 bg-light-2">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center">
                      <h1 className="text-30 fw-600">{`Reservation Details`}</h1>
                    </div>
                    {(!getbookingRS || getbookingRS === null) ? <Skeleton /> :
                      params.business == "hotel" ? <HotelViewReservation params={getbookingRS}/> : <FlightViewReservation params={getbookingRS}/>
                    }
                  </div>
                  {/* End col-12 */}
                </div>
              </div>
            </section>

      }

      

      {/* Top SearchBanner */}
      
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default viewreservation;
