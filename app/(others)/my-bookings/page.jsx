import React from "react";
import CallToActions from "@/components/common/CallToActions";
import DashboardPage from "../../../components/db-booking";
import DefaultHeader from "@/components/header/default-header";
import DefaultFooter from "@/components/footer/default";
import BookingTable from "@/components/db-booking/components/BookingTable";
import Image from "next/image";
import FilterBox from "@/components/dashboard/vendor-dashboard/booking/components/filter-box";

export const metadata = {
  title: "Booking History || BE - Argentina - Travel & Tour React NextJS Template",
  description: "BE - Argentina - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
    {/* End Page Title */}

    <div className="header-margin"></div>
    {/* header top margin */}

    <DefaultHeader />
    {/* End Header 1 */}

    <section className="section-bg layout-pt-lg layout-pb-lg">
      <div className="section-bg__item col-12">
        <Image
          width={1920}
          height={400}
          src="/img/pages/about/1.png"
          alt="image"
          priority
        />
      </div>
      {/* End section-bg__item */}

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <h1 className="text-40 md:text-25 fw-600 text-white">
              My Bookings
            </h1>
            <div className="text-white mt-15">
              List of your bookings
            </div>
          </div>
        </div>
      </div>
      {/* End .container */}
    </section>
    {/* End About Banner Section */}

    <section className="layout-pt-md layout-pb-md bg-light-2">
      <div className="container">
        
        <div className="tabs js-tabs">
              <BookingTable />
        </div>
      </div>
    </section>
    {/* End terms section */}

    <CallToActions />
    {/* End Call To Actions Section */}

    <DefaultFooter />
    {/* End Call To Actions Section */}
    </>
  );
}
