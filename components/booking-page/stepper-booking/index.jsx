
'use client'

import React, { useEffect, useState } from "react";
import CustomerInfo from "../CustomerInfo";
import PaymentInfo from "../PaymentInfo";
import OrderSubmittedInfo from "../OrderSubmittedInfo";
import FlightTravellerInfo from "../FlightTravellerInfo";
import HotelTravellerInfo from "../HotelTravellerInfo";
import { FLIGHT_TAB_NAME, HOTEL_TAB_NAME } from "@/utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { getCartById } from "@/features/hero/cartSlice";
import { useRouter } from "next/navigation";
import MainCart from "../MainCart";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  
  useEffect(() => {
    
    const sessionCartId = localStorage.getItem('sessioncart');
    if (sessionCartId) {
            dispatch(getCartById({ sessionCartId, router, undefined })).then((action) => {
      // Check if cart is empty, then redirect
      if (!action.payload.items || action.payload.items.length === 0) {
        router.push('/'); // Assuming you have access to router here
      } else {
        router.push('/cart-page'); // Or redirect to cart page
      }
    });
  }
  }, [dispatch]);
  const steps = [
    {
      title: "Personal Detailss",
      stepNo: "1",
      stepBar: (
        <>
          <div className="col d-none d-sm-block">
            <div className="w-full h-1 bg-border"></div>
          </div>
        </>
      ),
      content: <MainCart />//<FlightTravellerInfo />,//currentTab === HOTEL_TAB_NAME ? <HotelTravellerInfo /> : <FlightTravellerInfo />,
    },
    {
      title: "Payment Details",
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
      stepNo: "3",
      stepBar: "",
      content: <OrderSubmittedInfo />,
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
      <div className="row x-gap-40 y-gap-30 items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="col-auto">
              <div
                className="d-flex items-center cursor-pointer transition"
                onClick={() => setCurrentStep(index)}
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

      <div className="row x-gap-20 y-gap-20 pt-20">
        <div className="col-auto">
          <button
            className="BPI button h-60 px-24 -blue-1 bg-light-2"
            disabled={currentStep === 0}
            onClick={previousStep}
          >
            Previous
          </button>
        </div>
        {/* End prvious btn */}

        <div className="col-auto">
          <button
            className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
            disabled={currentStep === steps.length - 1}
            onClick={nextStep}
          >
            Next <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
        {/* End next btn */}
      </div>
      {/* End stepper button */}
    </>
  );
};

export default Index;
