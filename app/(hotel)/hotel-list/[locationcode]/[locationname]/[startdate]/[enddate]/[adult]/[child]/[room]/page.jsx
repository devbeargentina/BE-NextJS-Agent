
'use client'
import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-3";
import { hotelsData } from "@/data/hotels";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/hotel-list/hotel-list/MainFilterSearchBox";
import TopHeaderFilter from "@/components/hotel-list/hotel-list/TopHeaderFilter";
import HotelProperties from "@/components/hotel-list/hotel-list/HotelProperties";
import Pagination from "@/components/hotel-list/common/Pagination";
import Sidebar from "@/components/hotel-list/hotel-list/Sidebar";
import { hotelAvailResult } from "@/features/hero/hotelSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { updateHotelCriteria } from "@/features/hero/searchCriteriaSlice";

// export const metadata = {
//   title: "Hotel List v1 || BE - Argentina - Travel & Tour React NextJS Template",
//   description: "BE - Argentina - Travel & Tour React NextJS Template",
// };

const index = ({params}) => {
  
  const dispatch = useDispatch();
  const { hotelCriteria } = useSelector((state) => state.searchCriteria) || {};
  const { hotelList,hotelAvailRQ,loading,filterParam } = useSelector((state) => state.hotel);
  const router = useRouter();
  
  // const id = params.id;
  // const hotel = hotelsData.find((item) => item.id == id) || hotelsData[0];
  
  useEffect(() => {
    const hotelAvailRQ = {
      searchParam: {
        startDate: new Date(decodeURIComponent(params.startdate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        endDate: new Date(decodeURIComponent(params.enddate)).toISOString() ||  new Date(new DateObject()).toISOString(),
        cityJPDCode: params.locationcode,
        pax: [
          {
            age: 25
          }
        ]
      },
      isApplySearchParam: true,
      filterParam: {
        amenities: [],
        priceMinMax: [
          0,1000
        ],
       hotelName: "",
        starRating: [],
        pageNumber: 0,
        pageSize: 10
      },
      isApplyFilterParam: false,
      sortParam: {
        "sortBy": "string",
        "sortType": "string"
      },
      isApplySortParam: false
    };

    dispatch(
      updateHotelCriteria({
            ...hotelCriteria,
            startDate: new Date(decodeURIComponent(params.startdate)).toISOString() ||  new Date(new DateObject()).toISOString(),
            endDate: new Date(decodeURIComponent(params.enddate)).toISOString() ||  new Date(new DateObject()).toISOString(),
            adult: params.adult|| 1,
            child:params.child || 0,
            room: params.room        
       })
    );

    // Dispatch the action
    dispatch(hotelAvailResult({ hotelAvailRQ, router, undefined }));
  }, []);
  // if(hotelList){
  //   sessionStorage?.setItem("HotelListRS",JSON.stringify(hotelList));
  // }
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-40 pb-40 bg-light-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600">{`Find Your Dream Luxury Hotel`}</h1>
              </div>
              {/* End text-center */}
              <MainFilterSearchBox params={params}/>
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      {/* Top SearchBanner */}
      
      { true &&
        

            <section className="layout-pt-md layout-pb-lg">
              <div className="container">
                <div className="row y-gap-30">
                  {hotelList.length > 0 ?
                  <div className="col-xl-3">

                    <aside className="sidebar y-gap-40 xl:d-none">
                      <Sidebar type="outbound" filterParam={filterParam}  />
                    </aside>
                    {/* End sidebar for desktop */}
                      <div
                        className="offcanvas offcanvas-start"
                        tabIndex="-1"
                        id="listingSidebar"
                      >
                        <div className="offcanvas-header">
                          <h5 className="offcanvas-title" id="offcanvasLabel">
                            Filter Hotels
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          ></button>
                        </div>
                        {/* End offcanvas header */}

                        <div className="offcanvas-body">
                          <aside className="sidebar y-gap-40  xl:d-block">
                            <Sidebar />
                          </aside>
                        </div>
                        {/* End offcanvas body */}
                      </div>
                  </div>
                  :""}

                  {/* End col */}

                  <div className="col-xl-9 ">
                    <TopHeaderFilter />
                    <div className="mt-30"></div>
                    {/* End mt--30 */}
                    <div className="row y-gap-30">
                      <HotelProperties />
                    </div>
                    {/* End .row */}
                    <Pagination />
                  </div>
                  {/* End .col for right content */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </section>
      }
      {/* End layout for listing sidebar and content */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
