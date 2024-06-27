
'use client'

import { useEffect, useState } from "react";
import { myBookings, updateFilterParam } from "@/features/hero/bookingSlice";
import Pagination from "../common/Pagination";
import ActionsButton from "../components/ActionsButton";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { SkeletonMyBookings } from "@/components/common/skeletons/SkeletonMulti";
import FilterBox from "@/components/dashboard/vendor-dashboard/booking/components/filter-box";
import DateSearch from "@/components/dashboard/vendor-dashboard/booking/components/filter-box/DateSearch";
import SearchBox from "@/components/dashboard/vendor-dashboard/booking/components/filter-box/SearchBox";

const BookingTable = () => {
  
  const dispatch = useDispatch();
  const { bookings, filterParam, loading, totalPages, totalBookings } = useSelector((state) => state.booking);
  const router = useRouter();
  //const hotel = hotelsData.find((item) => item.id == id) || hotelsData[0];
  useEffect(() => {
   
    dispatch(myBookings({ filterParam, router, undefined }));
  }, [dispatch]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index, item) => {
    setActiveTab(index);
    
    dispatch(
      updateFilterParam({
          ...filterParam,
            ByStatus: item === "All Booking" ? "" : item
      })
      );
      dispatch(myBookings({ filterParam : {
      ...filterParam,
      ByStatus: item === "All Booking" ? "" : item
  }, router, undefined }));
    // dispatch(
    //   updateFilterParam({
    //       ...filterParam,
    //         StartDate: new Date(startDate).toISOString(),
    //         endDate: new Date(endDate).toISOString(),
    //   })
    //   );
  };

  const tabItems = [
    "All Booking",
    "Completed",
    // "Processing",
    "Confirmed",
    "Cancelled",
    // "Paid",
    // "Unpaid",
    // "Partial Payment",
  ];

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls overflow-visible roxw x-gap-40 y-gap-40 lg:x-gap-20 js-tabs-controls">
          <div className="row justify-between items-center">
            
          <div className="col-auto">
            <div className="d-flex items-center">
              
          {tabItems.map((item, index) => (
            <div className="col-auto me-5" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={() => handleTabClick(index,item)}
              >
                {item}
              </button>
            </div>
          ))}
        
        </div>
          </div>
          <div className="col-auto">
                  
    <div className="row x-gap-20 y-gap-20 items-center">
      <div className="col-auto">
        <DateSearch />
      </div>
      {/* End col-auto */}

      {/* <div className="col-auto">
        <DropdownFilter />
      </div> */}
      {/* End col-auto */}

      <div className="col-auto">
        <SearchBox />
      </div>
      {/* End col-auto */}
    </div>
                </div>
          </div>
        </div>
        {/* End tabs */}

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Type</th>
                    <th>Ref Number</th>
                    <th>Particular</th>
                    <th>Booking Date</th>
                    <th>Travell Time</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  
    {loading ? <SkeletonMyBookings />:  ((bookings && bookings.length > 0) ? (
      bookings?.map((item,index) => (
      <tr>
                    <td>{item.businessId === "117279ec-1a23-4c1d-8a58-599fde6b3043" ? "Flight" : "Hotel"}</td>
                    <td>{item.bookingRefNumber}</td>
                    <td>{item.itineraryName}</td>
                    <td>{new Date(item.bookingDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',})}</td>
                    <td className="lh-16" >
                      {item.businessId === "117279ec-1a23-4c1d-8a58-599fde6b3043" ? " Depart :" : "Check in :"} {new Date(item.firstDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',})}
                      {item.firstDate !== item.lastDate ? <br /> : <></>}
                      {item.firstDate !== item.lastDate ? (item.businessId === "117279ec-1a23-4c1d-8a58-599fde6b3043" ? ` Return :${new Date(item.lastDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',})}` : `Check out :${new Date(item.lastDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',})}`): ""}
                    </td>
                    <td className="fw-500">${item.bookingAmount}</td>
                    <td>
                    {item.bookingStatus === "Confirmed" ? <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                        Confirmed
                      </span>:<span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3">
                        Pending
                      </span>}
                    </td>
                    <td>
                      <ActionsButton business={item.businessId === "117279ec-1a23-4c1d-8a58-599fde6b3043" ? "flight" : "hotel"} bookingId={item.id} />
                    </td>
                  </tr>
                  ))): <tr><td colspan="8">
                      <div className="col text-center">No Bookings Found</div></td></tr>)}
                      {/* <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                        Confirmed
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-red-3 text-red-2">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                        Confirmed
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                        Confirmed
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
                {totalPages > 1 && <Pagination totalPages={totalPages} filterParam={filterParam} />}
    </>
  );
};

export default BookingTable;
