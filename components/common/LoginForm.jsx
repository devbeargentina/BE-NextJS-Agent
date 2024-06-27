import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/hero/authSlice';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  username: "",
  password: "",
};
const LoginForm = () => {
  
  const [loginRQ, setloginRQ] = useState(initialState);
  const [validation, setValidation] = useState({
    username: true,
    password: true,
  });
  const { loading, currentPath, error } = useSelector((state) => state.user);
  const { username, password } = loginRQ;
  const dispatch = useDispatch();
  const router = useRouter();
  
  const validationRules = {
    username: true,
    password: true,
  };
  useEffect(() => {
    
    //console.log(error);
    error && toast.error(error);
  }, [error]);

  const validateEmail = (username) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(username);
  };
  const validateInput = () => {
    const newValidation = {
      username: !validationRules.username || validateEmail(username),
      password: !validationRules.password || !!password,
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };
  const handleSubmit = async (e) => {
    if (validateInput()) {
      try {
        await dispatch(userLogin({ loginRQ,toast,router, currentPath }));
        
        } catch (error) {
          console.error('Login error:', error);
        }
    }
  };
  const onInputChange = (e) => {
    
    let { name, value } = e.target;
    setloginRQ({ ...loginRQ, [name]: value });
  };
  const handleGoogleLoginSuccess1 = async () => {
    
    try {
      await dispatch(
        userLogin({
          productData: {
            productId: "0123123123",
            name: "string",
            price: 110,
            description: "string",
            categoryName: "string",
            imageUrl: "string",
            imageLocalPath: "string",
            image: null
          },
        },toast, router)
      ); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className={`form-input ${validationRules.username && !validation.username ? 'error' : ''}`}>
          <input type="text" required id="username" name="username"  onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className={`form-input ${validationRules.password && !validation.password ? 'error' : ''}`}>
          <input type="password" id="password" name="password" required  onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
      <Link href="/forgotpassword" className="text-14 fw-500 text-blue-1 underline">
          Forgot your password?
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
          Sign In {loading ? <i class="spinner-border spinner-border-sm"></i>:<div className="icon-arrow-top-right ml-15" />}
        </button>
      </div>
      {/* End .col */}
    </div>
  );
};

export default LoginForm;
