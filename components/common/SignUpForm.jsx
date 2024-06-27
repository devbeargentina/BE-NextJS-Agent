import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/hero/authSlice';
//import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const initialState = {
  email : "",
  firstname : "",
  lastname : "",
  password : "",
  confirmPassword: "", // Added confirmPassword field
};
const SignUpForm = () => {
  const [registerData, setregisterData] = useState(initialState);
  const [validation, setValidation] = useState({
    email: true,
    firstname: true,
    lastname: true,
    password: true,
    confirmPassword: true,
  });
  const { loading, error } = useSelector((state) => state.user);
  const { email, firstname, lastname, password, confirmPassword } = registerData;
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const validationRules = {
    email: true,
    firstname: true,
    lastname: true,
    password: true,
    confirmPassword: true,
  };

  const validateEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateInput = () => {
    const newValidation = {
      email: !validationRules.email || validateEmail(email),
      firstname: !validationRules.firstname || !!firstname,
      lastname: !validationRules.lastname || !!lastname,
      password: !validationRules.password || !!password,
      confirmPassword: !validationRules.confirmPassword || !!confirmPassword,
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };

  const handleSubmit = async (e) => {
    if (validateInput()) {
      try {
          await dispatch(registerUser({ registerData,router,toast }));        
        } catch (error) {
          console.error('Login error:', error);
        }
      }
  };
  const onInputChange = (e) => {
    
    let { name, value } = e.target;
    setregisterData({ ...registerData, [name]: value });
    if(value) {
      setValidation({...validation, [name]:true});
    }
    else{
      setValidation({...validation, [name]:false});
    }
  };

  return (
    <div className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Already have an account yet?{" "}
          <Link href="/login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className={`col-12`}>
        <div className={`form-input ${validationRules.firstname && !validation.firstname ? 'error' : ''}`}>
          <input type="text" required id="firstname" name="firstname" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">First Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-12`}>
        <div className={`form-input ${validationRules.lastname && !validation.lastname ? 'error' : ''}`}>
          <input type="text" required id="lastname" name="lastname" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Last Name</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-12`}>
        <div className={`form-input ${validationRules.email && !validation.email ? 'error' : ''}`}>
          <input type="email" required id="email" name="email" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-12`}>
        <div className={`form-input ${validationRules.password && !validation.password ? 'error' : ''}`}>
          <input type="password" required id="password" name="password" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className={`col-12`}>
        <div className={`form-input ${validationRules.confirmPassword && !validation.confirmPassword ? 'error' : ''}`}>
          <input type="password" required id="confirmpassword" name="password" onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
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
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="button"
          onClick={()=>handleSubmit()}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up {loading ? <i class="spinner-border spinner-border-sm"></i>:<div className="icon-arrow-top-right ml-15" />}
        </button>
      </div>
      {/* End .col */}
    </div>
  );
};

export default SignUpForm;
