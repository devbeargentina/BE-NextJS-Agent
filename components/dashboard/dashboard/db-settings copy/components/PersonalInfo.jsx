import AvatarUploader from "./AvatarUploader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, userLogin } from '../../../../../features/hero/authSlice';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  birthdate: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipcode: "",
  phonenumber: "",
};
const PersonalInfo = () => {
  
  const [userData, setuserData] = useState(initialState);
  const [validation, setValidation] = useState({
    firstName: true,
    lastName: true,
    gender: true,
    birthdate: true,
    address: true,
    city: true,
    state: true,
    country: true,
    zipcode: true,
    phonenumber: true,
  });
  const { loading, error, user } = useSelector((state) => ({ ...state.user }));
  //console.log(user);
  const { firstName,
    lastName,
    gender,
    birthdate,
    address,
    city,
    state,
    country,
    zipcode,
    phonenumber } = userData;
  const dispatch = useDispatch();
  const router = useRouter();
  
  const validationRules = {
    firstName: true,
    lastName: true,
    gender: true,
    birthdate: true,
    address: true,
    city: true,
    state: true,
    country: true,
    zipcode: true,
    phonenumber: true,
  };
  useEffect(() => {
    
    //console.log(error);
    error && toast.error(error);
  }, [error]);

  
  useEffect(() => {
    // Populate userData with user data when user changes
    setuserData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || "",
      birthdate: user.birthdate || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      country: user.country || "",
      zipcode: user.zipcode || "",
      phonenumber: user.phonenumber || "",
    });

    // ... your other useEffect logic
  }, [user]);
  const validateEmail = (username) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(username);
  };
  const validateInput = () => {
    const newValidation = {
      firstName: !validationRules.firstName || !!firstName,
      lastName: !validationRules.lastName || !!lastName,
      //gender: !validationRules.gender || !!gender,
      birthdate: !validationRules.birthdate || !!birthdate,
      address: !validationRules.address || !!address,
      city: !validationRules.city || !!city,
      state: !validationRules.state || !!state,
      country: !validationRules.country || !!country,
      zipcode: !validationRules.zipcode || !!zipcode,
      //phonenumber: !validationRules.phonenumber || !!phonenumber,
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };
  const handleSubmit = async (e) => {
   
    if (validateInput()) {
      try {
        await dispatch(updateUser({ userDataRQ:{...userData},toast,router }));
        
        } catch (error) {
          console.error('Login error:', error);
        }
    }
  };
  const onInputChange = (e) => {
    
    let { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
    if(value) {
      setValidation({...validation, [name]:true});
    }
    else{
      setValidation({...validation, [name]:false});
    }
  };
  //console.log(userData);
  return (
    <>
        {/* <AvatarUploader /> */}
        {/* End AvatarUploader*/}

        {/* <div className="border-top-light mt-30 mb-30" /> */}

        <div className="col-xl-9">
          <div className="row x-gap-20 y-gap-20">
            {/* <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-16 text-light-1">
                  Business Name
                </label>
              </div>
            </div> */}
            {/* End col-12 */}
            <div className="col-md-6">
              <div className={`form-input ${validationRules.firstname && !validation.firstName ? 'error' : ''}`}>
                <input type="text" required id="firstName" name="firstName" onChange={onInputChange} 
                value={userData.firstName} />
                <label className="lh-1 text-16 text-light-1">First Name</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className={`form-input ${validationRules.lastName && !validation.lastName ? 'error' : ''}`}>
                <input type="text" required id="lastName" name="lastName" onChange={onInputChange}
                value={userData.lastName} />
                <label className="lh-1 text-16 text-light-1">Last Name</label>
              </div>
            </div>
            {/* End col-6 */}
            {/* <div className="col-12">
              <div className={`form-input ${validationRules.gender && !validation.gender  ? 'error' : ''}`}>
                <input type="text" required  id="gender" name="gender" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">User Name</label>
              </div>
            </div> */}
            {/* End col-12 */}

            <div className="col-md-6">
              <div className={`form-input ${validationRules.birthdate && !validation.birthdate  ? 'error' : ''}`}>
                <input type="text" required  id="birthdate" name="birthdate" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">Birthdate</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className={`form-input ${validationRules.address && !validation.address  ? 'error' : ''}`}>
                <input type="text" required  id="address" name="address" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">Address</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className={`form-input ${validationRules.city && !validation.city  ? 'error' : ''}`}>
                <input type="text" required  id="city" name="city" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">City</label>
              </div>
            </div>
            {/* End col-6 */}

            <div className="col-md-6">
              <div className={`form-input ${validationRules.state && !validation.state  ? 'error' : ''}`}>
                <input type="text" required  id="state" name="state" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">
                  State
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`form-input ${validationRules.country && !validation.country  ? 'error' : ''}`}>
                <input type="text" required  id="country" name="country" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">
                  Country
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`form-input ${validationRules.zipcode && !validation.zipcode  ? 'error' : ''}`}>
                <input type="text" required  id="zipcode" name="zipcode" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">
                  Zipcode
                </label>
              </div>
            </div>
            {/* End col-6 */}

            {/* <div className="col-12">
              <div className={`form-input ${validationRules.phonenumber && !validation.phonenumber  ? 'error' : ''}`}>
                <input type="text" required  id="phonenumber" name="phonenumber" onChange={onInputChange} />
                <label className="lh-1 text-16 text-light-1">Birthday</label>
              </div>
            </div> */}
            {/* End col-6 */}

            {/* <div className="col-12">
              <div className={`form-input ${validationRules.phonenumber && !validation.phonenumber  ? 'error' : ''}`}>
                <textarea required rows={5} defaultValue={""}  id="phonenumber" name="phonenumber" onChange={onInputChange}  />
                <label className="lh-1 text-16 text-light-1">
                  About Yourself
                </label>
              </div>
            </div> */}
          </div>
        </div>
        {/* End col-xl-9 */}

        <div className="d-inline-block pt-30">
          <button
            type="submit"
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
            onClick={() => handleSubmit()}
          >
            Save Changes {loading ? <i class="spinner-border spinner-border-sm"></i>:<div className="icon-arrow-top-right ml-15" />}
          </button>
        </div>
    </>
  );
};

export default PersonalInfo;
