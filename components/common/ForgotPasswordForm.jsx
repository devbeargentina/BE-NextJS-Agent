import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../features/hero/authSlice';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  email: "",
};
const ForgotPassword = () => {
  
  const [loginRQ, setloginRQ] = useState(initialState);
  const [validation, setValidation] = useState({
    email: true,
  });
  const { loading, error } = useSelector((state) => state.user);
  const { email } = loginRQ;
  const dispatch = useDispatch();
  const router = useRouter();
  
  const validationRules = {
    email: true,
  };
  useEffect(() => {
    
    // //console.log(error);
    error && toast.error(error);
  }, [error]);

  const validateEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateInput = () => {
    const newValidation = {
      email: !validationRules.email || validateEmail(email),
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };
  const handleSubmit = async (e) => {
    if (validateInput()) {
      try {
        await dispatch(forgotPassword({ loginRQ,toast,router }));
        
        } catch (error) {
          console.error('Login error:', error);
        }
    }
  };
  const onInputChange = (e) => {
    
    let { name, value } = e.target;
    setloginRQ({ ...loginRQ, [name]: value });
  };
  
  return (
    <div className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Forgot Password</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className={`form-input ${validationRules.email && !validation.email ? 'error' : ''}`}>
          <input type="text" required id="email" name="email"  onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>

      <div className="col-12">
      <Link href="/login" className="text-14 fw-500 text-blue-1 underline">
          Already Login ?
        </Link>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          onClick={() => handleSubmit()}
        >
          Submit {loading ? <i class="spinner-border spinner-border-sm"></i>:<div className="icon-arrow-top-right ml-15" />}
        </button>
      </div>
      {/* End .col */}
    </div>
  );
};

export default ForgotPassword;
