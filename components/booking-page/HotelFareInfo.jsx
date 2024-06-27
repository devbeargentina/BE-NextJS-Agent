import Link from "next/link";
import { toast } from "react-toastify";
import BookingDetails from "./sidebar/BookingDetails";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import BirthDate from "../common/BirthDate";
import DateSearch from "../common/BirthDate";
import { DateObject } from "react-multi-date-picker";
import PricingSummary from "./sidebar/PricingSummary";
import { createCart } from "@/features/hero/hotelSlice";

const initialStatePassenger = {
  passengerTypeCode:"ADLT",
  gender : "M",
  givenName : "",
  surname : "",
  birthDate: "",
  hasStretcher: false,
  nationality: "ES", // Added confirmPassword field
  nationalIdNumber : "",
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
  const HotelFareInfo = () => {
    const { hotelCriteria } = useSelector((state) => ({ ...state.searchCriteria }));
    const { loading,selectedHotel,checkavailbookingrulesRS,selectedRoomTypeCode } = useSelector((state) => state.hotel);

    
    const [passengerData, setPassengerData] = useState(Array(hotelCriteria?.room).fill(initialStatePassenger));
    const [contactData, setContactData] = useState(intialStateContact);
    const [validation, setValidation] = useState(Array(hotelCriteria?.room).fill({
      gender : true,
      firstname : true,
      lastname : true,
      birthdate: true,
      nationality: true, // Added confirmPassword field
      nationalIdNumber : true,
      passportNumber: true, 
    }));
    const [validationContact, setValidationContact] = useState({
      ContactFirstname: true,
      ContactLastname: true,
      ContactCountry: true,
      ContactPhone: true,
      ContactEmail: true,
    });
    const [dates, setDates] = useState();
    const { error,isUserLoggedIn } = useSelector((state) => state.user);
    const { firstname, lastname, email, gender, birthdate, phonenumber, socialsecuritynumber } = passengerData;
    const dispatch = useDispatch();
    const router = useRouter();
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
  
    // const handleSubmit = async (e) => {
    //   if (validateInput()) {
    //     try {
    //         await dispatch(registerUser({ passengerData,router,toast }));        
    //       } catch (error) {
    //         console.error('Login error:', error);
    //       }
    //     }
    // };
    const validateInput = () => {
      const newValidation = passengerData.map((passenger) => ({
        gender: !validationRules.gender || !!passenger.gender,
        firstname: !validationRules.firstname || !!passenger.firstname,
        lastname: !validationRules.lastname || !!passenger.lastname,
        nationality: !validationRules.gender || !!passenger.nationality,
        birthdate: !validationRules.birthdate || !!passenger.birthdate,
        nationalIdNumber: !validationRules.phonenumber || !!passenger.nationalIdNumber,
        //passportNumber: !validationRules.passportNumber || !!passenger.passportNumber,
      }));
    
      setValidation(newValidation);
    
      return newValidation.every((passengerValidation) =>
        Object.values(passengerValidation).every((isValid) => isValid)
      );
    };
    const pax = Array(hotelCriteria.room).fill().map(() => ({ age: 25 }));
    const handleSubmit = async (e) => {
      if (validateInput() && validateContactInput()) {
        try {
          dispatch(createCart({ createCartRQ : {
                      searchParam: {
                        startDate: new Date(decodeURIComponent(hotelCriteria.startDate)).toISOString() ||  new Date(new DateObject()).toISOString(),
                        endDate: new Date(decodeURIComponent(hotelCriteria.endDate)).toISOString() ||  new Date(new DateObject()).toISOString(),
                        pax: pax
                      },
                      BookingCode:checkavailbookingrulesRS?.bookingCode,
                      selectedRoomTypeCode:checkavailbookingrulesRS?.hotelOptions?.hotelOption[0]?.ratePlanCode,
                      HotelCode:selectedHotel?.jpCode,
                      PriceRangeMinimum:checkavailbookingrulesRS?.priceRangeMinimum,
                      PriceRangeMaximum:checkavailbookingrulesRS?.priceRangeMaximum,
                      Currency:checkavailbookingrulesRS?.priceRangeCurrency,
                      HotelTravelerDtoList: [...passengerData],
                      contactInformationDto: contactData
                  }, router, undefined }));
          // await Promise.all(passengerData.map((passenger) =>
          //   dispatch(registerUser({ passengerData: passenger, router, toast })
          // )));
        } catch (error) {
          console.error('Login error:', error);
        }
      }
    };
    
  const onInputChange = (e, passengerIndex) => {
    const { name, value } = e.target;
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[passengerIndex] = {
      ...updatedPassengerData[passengerIndex],
      [name]: value,
    };
    setPassengerData(updatedPassengerData);

    const updatedValidation = [...validation];
    updatedValidation[passengerIndex] = {
      ...updatedValidation[passengerIndex],
      [name]: !!value,
    };
    setValidation(updatedValidation);
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

    const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);
    
    const toggleCancellationPolicy = () => {
      setShowCancellationPolicy(!showCancellationPolicy);
    };

    return (
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
          {/* End register notify */}
{/*   
          <h2 className="text-22 fw-500 mt-40 md:mt-24">
            Let us know who you are
          </h2> */}
        {checkavailbookingrulesRS?.warningCode && checkavailbookingrulesRS?.warningCode === "warnPriceChanged" &&
          <div className="row x-gap-20 y-gap-20">
            <div className={`col-12`}>
              <div className="alert alert-warning">
                OOPS!! Price Changed
              </div>
            </div>
          </div>
        }
        {checkavailbookingrulesRS?.cancellationPolicy && (
          <div className="row x-gap-20 y-gap-20">
            <div className={`col-12`}>
              <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
                <div className="d-flex">
                  <h5>Cancellation Policy</h5>
                  
                  {/* Show/hide button */}
                  <button
                    className="text-blue-1 fw-500"
                    style={{ marginLeft: '74%' }} // Use double curly braces for an object
                    onClick={toggleCancellationPolicy}
                  >
                    {showCancellationPolicy ? 'Hide' : 'Show'}
                  </button>
                </div>
                {/* Cancellation policy content */}
                {showCancellationPolicy && (
                  <ul>
                    {checkavailbookingrulesRS?.cancellationPolicy.policyRules.map(
                      (item) => (
                        <li key={item.to}>
                          If you cancel booking before {item?.to} days of check-in then {item?.percentagePrice} percentage charges apply
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
        

  {passengerData.map((passenger, index) => (
        <div key={index} className="row x-gap-20 y-gap-20">
        {index !== 0 ? <hr className="mt-20 p-0" /> : <></>}
      {/* End .col */}

      <div className={`col-12`}>
      <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
          Passenger {`${index + 1}`}
        </div>
        </div>
      <div className={`col-2`}>
        <div className={`form-input h-full ${validationRules.gender && !validation[index].gender ? 'error' : ''}`}>            
          <select value={passenger.gender} className="form-select rounded-4 border-light select-float justify-between pt-3 text-16 fw-500 pt-25 px-15 h-full w-140 sm:w-full text-14" id={`gender-${index}`} name={`gender`} onChange={(e) => onInputChange(e, index)} >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          {/* <input type="text" required/> */}
          <label className="lh-1 text-14 text-light-1 label-float">Gender</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-5`}>
        <div className={`form-input ${validationRules.givenName && !validation[index].givenName ? 'error' : ''}`}>
          <input type="text" value={passenger.givenName} required id={`givenName-${index}`} name={`givenName`} onChange={(e) => onInputChange(e, index)} />
          <label className="lh-1 text-14 text-light-1">First Name *</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-5`}>
        <div className={`form-input ${validationRules.surname && !validation[index].surname ? 'error' : ''}`}>
          <input type="text" value={passenger.surname} required id={`surname-${index}`} name={`surname`} onChange={(e) => onInputChange(e, index)} />
          <label className="lh-1 text-14 text-light-1">Last Name *</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-6`}>
        <div className={`form-input ${validationRules.birthDate && !validation[index].birthDate ? 'error' : ''}`}>
          {/* <input type="text" required id="birthDate" name="birthDate" onChange={(e) => onInputChange(e, index)} /> */}
          <DateSearch
              name={`birthDate`}
              placeholder={"Sdfsdfs "}
              dates={passenger.birthDate ? new DateObject(passenger.birthDate) : null}
              minDate={new DateObject().add(-60, "year")}
              maxDate={new DateObject()}
              isSingle={true}
              onChange={(e) => onInputChange(e, index)}
            />
          <label className="lh-1 text-14 text-light-1 label-float">Date Of Birth *</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-6`}>
        <div className={`form-input h-full ${validationRules.nationality && !validation[index].nationality ? 'error' : ''}`}>
          <select
            id={`nationality-${index}`}
            name={`nationality`}
            value={passenger.nationality}
            required
            className="form-select rounded-4 border-light select-float justify-between pt-3 text-16 fw-500 pt-25 px-15 h-full sm:w-full text-14"
            onChange={(e) => onInputChange(e, index)}
          >
            <option value="" disabled>Select Nationality</option>
            <option value="AF">Afghanistan</option>
            <option value="AX">Åland Islands</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AQ">Antarctica</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia, Plurinational State of</option>
            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BV">Bouvet Island</option>
            <option value="BR">Brazil</option>
            <option value="IO">British Indian Ocean Territory</option>
            <option value="BN">Brunei Darussalam</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CV">Cape Verde</option>
            <option value="KY">Cayman Islands</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CX">Christmas Island</option>
            <option value="CC">Cocos (Keeling) Islands</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CG">Congo</option>
            <option value="CD">Congo, the Democratic Republic of the</option>
            <option value="CK">Cook Islands</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CW">Curaçao</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FK">Falkland Islands (Malvinas)</option>
            <option value="FO">Faroe Islands</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GF">French Guiana</option>
            <option value="PF">French Polynesia</option>
            <option value="TF">French Southern Territories</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Greece</option>
            <option value="GL">Greenland</option>
            <option value="GD">Grenada</option>
            <option value="GP">Guadeloupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GG">Guernsey</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HM">Heard Island and McDonald Islands</option>
            <option value="VA">Holy See (Vatican City State)</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran, Islamic Republic of</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IM">Isle of Man</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JE">Jersey</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="KP">Korea, Democratic People's Republic of</option>
            <option value="KR">Korea, Republic of</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Lao People's Democratic Republic</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MO">Macao</option>
            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MQ">Martinique</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="YT">Mayotte</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia, Federated States of</option>
            <option value="MD">Moldova, Republic of</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="NC">New Caledonia</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NU">Niue</option>
            <option value="NF">Norfolk Island</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PS">Palestinian Territory, Occupied</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PN">Pitcairn</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="RE">Réunion</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="RW">Rwanda</option>
            <option value="BL">Saint Barthélemy</option>
            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="LC">Saint Lucia</option>
            <option value="MF">Saint Martin (French part)</option>
            <option value="PM">Saint Pierre and Miquelon</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SX">Sint Maarten (Dutch part)</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="SB">Solomon Islands</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="GS">South Georgia and the South Sandwich Islands</option>
            <option value="SS">South Sudan</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard and Jan Mayen</option>
            <option value="SZ">Swaziland</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TJ">Tajikistan</option>
            <option value="TZ">Tanzania, United Republic of</option>
            <option value="TH">Thailand</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TK">Tokelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="TM">Turkmenistan</option>
            <option value="TC">Turks and Caicos Islands</option>
            <option value="TV">Tuvalu</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UM">United States Minor Outlying Islands</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela, Bolivarian Republic of</option>
            <option value="VN">Viet Nam</option>
            <option value="VG">Virgin Islands, British</option>
            <option value="VI">Virgin Islands, U.S.</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="EH">Western Sahara</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </select>
          <label className="lh-1 text-14 text-light-1 label-float">Nationality *</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-3`}>
        <div className={`form-input ${validationRules.nationalIdNumber && !validation[index].nationalIdNumber ? 'error' : ''}`}>
          <input type="text" value={passenger.nationalIdNumber} required id={`nationalIdNumber-${index}`} name={`nationalIdNumber`} onChange={(e) => onInputChange(e, index)} />
          <label className="lh-1 text-14 text-light-1">Id Proof Number *</label>
        </div>
      </div>
      {/* End .col */}

      {/* <div className={`col-4`}>
        <div className={`form-input ${validationRules.passportNumber && !validation[index].passportNumber ? 'error' : ''}`}>
          <input type="text" value={passenger.passportNumber} required id={`passportNumber-${index}`} name={`passportNumber`} onChange={(e) => onInputChange(e, index)} />
          <label className="lh-1 text-14 text-light-1">Passport Number</label>
        </div>
      </div>
          <div className={`col-4`}>
            <div className={`form-input ${validationRules.passportExpiryDate && !validation[index].passportExpiryDate ? 'error' : ''}`}>
              <DateSearch
          name={`passportExpiryDate`}
          dates={new DateObject(passenger.passportExpiryDate)}
          isSingle={true}
          maxDate={new DateObject().add(10, "year")}
          minDate={new DateObject()}
          onChange={(e) => onInputChange(e, index)}
        />
              <label className="lh-1 text-14 text-light-1 label-float">Passport Expiry Date</label>
            </div>
          </div> */}
      {/* End .col */}
{/*   
      <div className="col-6">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input type="checkbox" name="name" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            Email me exclusive Agoda promotions. I can opt out later as stated
            in the Privacy Policy.
          </div>
        </div>
      </div> */}
      {/* End .col */} 
      
      </div>       
      ))}
      
      <div className="row x-gap-20 y-gap-20 pt-20">
  
      <div className={`col-12`}>
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05 border-bottom">
            Contact/ Communication Information (Ticket(s) will be sent in this number)
          </div>
          </div>
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.givenName && !validationContact.givenName ? 'error' : ''}`}>
            <input type="text" required id={`givenName`} name={`givenName`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">First Name *</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.surname && !validationContact.surname ? 'error' : ''}`}>
            <input type="text" required id={`surname`} name={`surname`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Last Name *</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.email && !validationContact.email ? 'error' : ''}`}>
            <input type="text" required id={`email`} name={`email`} onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Email *</label>
          </div>
        </div>
        {/* End .col */}
  
        <div className={`col-6`}>
          <div className={`form-input ${validationRules.phoneNumberSubscriberNumber && !validationContact.phoneNumberSubscriberNumber ? 'error' : ''}`}>
            <input type="text" required id="phoneNumberSubscriberNumber" name="phoneNumberSubscriberNumber" onChange={(e) => onContactInputChange(e)} />
            <label className="lh-1 text-14 text-light-1">Phone *</label>
          </div>
        </div>
        {/* End .col */}
  
        {/* <div className="col-6">
          <div className="d-flex ">
            <div className="form-checkbox mt-5">
              <input type="checkbox" name={`phoneNumberMarkedForSendingRezInfo`} id={`phoneNumberMarkedForSendingRezInfo`} onChange={(e) => onContactInputChangege(e)} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
            </div>
            <div className="text-15 lh-15 text-light-1 ml-10">
              Yes send phone msg PNR
            </div>
          </div>
        </div> */}
        {/* End .col */}
        {/* End .col */}
  
        {/* <div className="col-6">
          <div className="d-flex ">
            <div className="form-checkbox mt-5">
              <input type="checkbox" name={`emailMarkedForSendingRezInfo`} id={`emailMarkedForSendingRezInfo`} onChange={(e) => onContactInputChangege(e)} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
            </div>
            <div className="text-15 lh-15 text-light-1 ml-10">
              Yes send email msg PNR
            </div>
          </div>
        </div> */}
        {/* End .col */} 
        
        </div>       
        {/* End .row */}
      </div>
      {/* End .col-xl-7 */}

      <div className="col-xl-4 col-lg-4 mt-30">
        <div className="booking-sidebarw">
          <PricingSummary />
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
    );
  };
  

export default HotelFareInfo;
