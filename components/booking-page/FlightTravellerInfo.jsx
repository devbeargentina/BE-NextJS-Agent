import Link from "next/link";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { DateObject } from "react-multi-date-picker";
import { createCart } from "@/features/hero/flightSlice"
import { getCartById } from "@/features/hero/cartSlice";
import FlightFareInfo from "./FlightFareInfo";
import FlightTravellers from "./FlightTravellers";
import PricingSummary from "./sidebar/PricingSummary";
const initialStatePassenger = {
  passengerTypeCode:"ADLT",
  gender : "",
  givenName : "",
  surname : "",
  birthDate: "",
  hasStretcher: false,
  nationality: "AR", // Added confirmPassword field
  nationalIdNumber : "91",
  passportNumber:"",
  passportExpiryDate: ""
};

const intialStateContact = {  
  givenName:"",
  surname:"",
  phoneNumberAreaCode: "845",
  phoneNumberCountryCode:"+91",
  phoneNumberSubscriberNumber:"",
  email:"",
  socialSecurityNumber: "",
  phoneNumberMarkedForSendingRezInfo:true,
  emailMarkedForSendingRezInfo:true,
}
  const FlightTravellerInfo = (props) => {
   
    const { cartItems, loading } = useSelector((state) => state.cart);
    const filteredItems = (cartItems && cartItems && cartItems.length > 0) ? cartItems.filter(item => item.product.business === "Flight") : {};
    const  flightAvailRQ  = filteredItems.length > 0 ? JSON.parse(filteredItems[0].product.request) :{};
    const selectedFlight = filteredItems.length > 0 ? JSON.parse(filteredItems[0].product.response) :{};
    ////console.log(selectedFlight);
    const selectedReturnFlight = filteredItems.length > 0 ? JSON.parse(filteredItems[0].product.returnFlightResponse) :{};
    const [adultData, setAdultData] = useState(Array(flightAvailRQ?.searchParam?.adult).fill(initialStatePassenger));
    const [childData, setChildData] = useState(Array(flightAvailRQ?.searchParam?.child).fill(initialStatePassenger));
    const [infantData, setInfantData] = useState(Array(flightAvailRQ?.searchParam?.infant).fill(initialStatePassenger));
    const [contactData, setContactData] = useState(intialStateContact);
    const [validation, setValidation] = useState(Array(flightAvailRQ?.searchParam?.adult).fill({
      gender : true,
      givenName : true,
      surname : true,
      birthDate: true,
      nationality: true, // Added confirmPassword field
      nationalIdNumber : true,
      passportNumber: true, 
      passportExpiryDate: true,
    }));
    const [validationContact, setValidationContact] = useState({
      givenName: true,
      surname: true,
      phoneNumberCountryCode: true,
      phoneNumberSubscriberNumber: true,
      email: true,
    });
    const { error,isUserLoggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
  // 
  const clearCart =()=>{
    dispatch(clearCart());
  }
    // useEffect(() => {
    //   addToCart("adasdasd","asdsadsad");
    // }, []);
    useEffect(() => {
      const sessionCartId = localStorage.getItem('sessioncart');
      if (cartItems.length === 0 && sessionCartId) {
              dispatch(getCartById({ sessionCartId, router })).then((action) => {
          // Check if cart is empty, then redirect
          if (!action.payload.items || action.payload.items.length === 0) {
            router.push('/'); // Assuming you have access to router here
          } else {
            router.push('/cart-page'); // Or redirect to cart page
          }
        });
      }
    }, [dispatch]);
    useEffect(() => {
      error && toast.error(error);
    }, [error]);
  
    const validationRules = {
      gender : true,
      givenName : true,
      surname : true,
      birthDate: true,
      nationality: true, // Added confirmPassword field
      nationalIdNumber : true,
      passportNumber: true,
      passportExpiryDate:true,
      phoneNumberCountryCode: true,
      phoneNumberSubscriberNumber: true,
      email: true,
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
     };
    const validateContactInput = () => {
      const newValidation = {
        givenName: !validationRules.givenName || !!contactData.givenName,
        surname: !validationRules.surname || !!contactData.surname,
        email: !validationRules.email || validateEmail(contactData.email),
        phoneNumberSubscriberNumber: !validationRules.phoneNumberSubscriberNumber || !!contactData.phoneNumberSubscriberNumber,
        phoneNumberCountryCode: !validationRules.phoneNumberCountryCode || !!contactData.phoneNumberCountryCode,
      };
  
      setValidationContact(newValidation);
  
      return Object.values(newValidation).every((isValid) => isValid);
    };
    const validateInput = () => {
      const sixMonthsFromNow = new DateObject(flightAvailRQ.searchParam.startDate).add(6, 'month');
    
      const newValidation = adultData.map((passenger) => {    
        return {
          gender: !validationRules.gender || !!passenger.gender,
          givenName: !validationRules.givenName || !!passenger.givenName,
          surname: !validationRules.surname || !!passenger.surname,
          nationality: !validationRules.gender || !!passenger.nationality,
          birthDate: !validationRules.birthDate || !!passenger.birthDate,
          nationalIdNumber: !validationRules.phonenumber || !!passenger.nationalIdNumber,
          passportNumber: !validationRules.passportNumber || !!passenger.passportNumber,
          passportExpiryDate: !validationRules.passportExpiryDate || !! passenger.passportExpiryDate,
        };
      });
    
      setValidation(newValidation);
    
      return newValidation.every((passengerValidation) =>
        Object.values(passengerValidation).every((isValid) => isValid)
      );
    };
    
    const handleSubmit = async (e) => {
      if (validateInput() && validateContactInput()) {
        try {
          if(selectedReturnFlight?.fareComponentList){            
          await Promise.all(adultData.map((passenger) =>            
                dispatch(createCart({ createCartRQ : {
                  requestXML: selectedFlight.fareComponentList[0].rqCreateBooking,
                  returnFlightRequestXML: selectedReturnFlight?.fareComponentList[0]?.rqCreateBooking,
                  airTravelerDtoList: [...adultData, ...childData, ...infantData],
                  contactInformationDto: contactData
              }, router, undefined }))
            ));
          }
          else{
          await Promise.all(adultData.map((passenger) =>            
                            dispatch(createCart({ createCartRQ : {
                              requestXML: selectedFlight.fareComponentList[0].rqCreateBooking,
                              airTravelerDtoList: [...adultData, ...childData, ...infantData],
                              contactInformationDto: contactData
                          }, router, undefined }))
                        ));
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    };
      
  const onContactInputChange = (e) => {
      
    let { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
    if(value) {
      setValidationContact({...validationContact, [name]:true});
    }
    else{
      setValidationContact({...validationContact, [name]:false});
    }
  };
    return (!loading && cartItems && cartItems.length > 0 && cartItems.length > 0) ? (
      <>
      {!isUserLoggedIn ?? <div className="col-xl-12 col-lg-12 mt-30">
      <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
            Sign in to book with your saved details or{" "}
            <Link href="/signup" className="text-blue-1 fw-500">
              register
            </Link>{" "}
            to manage your bookings on the go!
          </div>
          </div>}
        <div className="col-xl-8 col-lg-8 mt-30">
          
  {cartItems.map((cartItem, index) => (
          <FlightTravellers {...cartItem} />   
          ))}
      
      <hr className="mt-20 p-0" />
      <div className="row x-gap-20 y-gap-20 pt-20">
  
      <div className={`col-12`}>
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
            Contact/ Communication Information (Ticket(s) will be sent in this number)
          </div>
          </div>
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.givenName && !validationContact.givenName ? 'error' : ''}`}>
            <input type="text" required id={`givenName`} name={`givenName`} value={contactData.givenName} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">First Name *</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.surname && !validationContact.surname ? 'error' : ''}`}>
            <input type="text" required id={`surname`} name={`surname`} value={contactData.surname} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Last Name *</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.email && !validationContact.email ? 'error' : ''}`}>
            <input type="text" required id={`email`} value={contactData.email} name={`email`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Email *</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.phoneNumberSubscriberNumber && !validationContact.phoneNumberSubscriberNumber ? 'error' : ''}`}>
            <input type="text" value={contactData.phoneNumberSubscriberNumber} required id="phoneNumberSubscriberNumber" name="phoneNumberSubscriberNumber" onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Phone *</label>
          </div>
        </div>
        
        </div>       
      </div>

      <div className="col-xl-4 col-lg-4 mt-30">
        <div className="row x-gap-20 y-gap-20 pt-20">
          <div className="col-xl-12">
        <button
                      className="button -dark-1 px-30 h-40 mb-20 bg-blue-1 text-white float-end"
                      onClick={()=> clearCart()}
                    >
                      Clear Cart
                    </button>
          </div>
        </div>
        <div className="booking-sidebarw">
  {cartItems.map((cartItem, index) => (
    <>
          {cartItem.business === "Hotel" ? <PricingSummary {...cartItem} /> :<FlightFareInfo {...cartItem} />  } 
          </>
          ))}
          </div>
      </div>
      {/*  */}
      

      <div className="row x-gap-20 y-gap-20 pt-20">
        <div className="col-auto">
          <button
            className="FTI button h-60 px-24 -blue-1 bg-light-2"
            // disabled={currentStep === 0}
            //onClick={previousStep}
          >
            Previous
          </button>
        </div>
        {/* End prvious btn */}

        <div className="col-auto">
          <button
            className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
            //disabled={currentStep === steps.length - 1}
            onClick={handleSubmit}
          >
            Next &nbsp;&nbsp;{loading ? <React.Fragment><i class="spinner-border spinner-border-sm ml-5"></i>&nbsp;&nbsp;</React.Fragment>:<div className="icon-arrow-top-right ml-15" />}
          </button>
        </div>
        {/* End next btn */}
      </div>
      {/* End stepper button */}
    </>
    ):(<></>);
  };
  

export default FlightTravellerInfo;
