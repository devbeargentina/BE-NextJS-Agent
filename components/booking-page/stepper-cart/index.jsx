
'use client'

import React, { useState } from "react";
import CustomerInfo from "../CustomerInfo";
import PaymentInfo from "../PaymentInfo";
import OrderSubmittedInfo from "../OrderSubmittedInfo";
import OrderSubmittedInfoHotel from "../OrderSubmittedInfoHotel";
import FlightTravellerInfo from "../FlightTravellerInfo";
import HotelTravellerInfo from "../HotelTravellerInfo";
import { useRouter } from "next/navigation";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";
import { useSelector, useDispatch } from "react-redux";
import ModalSigninSignup from "@/components/header/ModalSigninSignup";
import MainCart from "../MainCart";

const Index = () => {
  const { user, isUserLoggedIn } = useSelector((state) => state.user);
  const [currentStep, setCurrentStep] = useState(0);
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const router = useRouter();
  const steps = [
    {
      title: "Personal Details",
      route: "/cart-page",
      stepNo: "1",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <MainCart />,//<FlightTravellerInfo />,//currentTab === HOTEL_TAB_NAME ? <HotelTravellerInfo /> : <FlightTravellerInfo />,
    },
    {
      title: "Payment Details",
      route: "/payment-page",
      stepNo: "2",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <PaymentInfo />,
    },
    {
      title: "Final Step",
      route: "/booking-confirm-page",
      stepNo: "3",
      stepBar: "",
      content: currentTab === HOTEL_TAB_NAME ? <OrderSubmittedInfoHotel /> : <OrderSubmittedInfo />,
    },
  ];

  const renderStep = () => {
    const { content } = steps[currentStep];
    return <>{content}</>;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
    {isUserLoggedIn !== true && <ModalSigninSignup currentPath="cart-page" />}
      <div className="row x-gap-40 y-gap-30 items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="col-auto">
              <div
                className="d-flex items-center cursor-pointer transition"
                onClick={() => router.push(step.route)}
              >
                <div
                  className={
                    currentStep === index
                      ? "active size-40 rounded-full flex-center bg-blue-1"
                      : "size-40 rounded-full flex-center bg-blue-1-05 text-blue-1 fw-500"
                  }
                >
                  {currentStep === index ? (
                    <>
                      <i className="icon-check text-16 text-white"></i>
                    </>
                  ) : (
                    <>
                      <span>{step.stepNo}</span>
                    </>
                  )}
                </div>

                <div className="text-18 fw-500 ml-10"> {step.title}</div>
              </div>
            </div>
            {/* End .col */}

            {step.stepBar}
          </React.Fragment>
        ))}
      </div>
      {/* End stepper header part */}

      <div className="row">{renderStep()}</div>
      {/* End main content */}
    </>
  );
};

export default Index;
