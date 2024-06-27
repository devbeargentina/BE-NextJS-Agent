'use client'

// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin, loginWithGoogle } from '../../features/hero/authSlice';

import { insertProduct } from '../../features/hero/productSlice';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginWithSocial = () => {  
  const { loading, currentPath, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleGoogleLoginSuccess1 = async () => {
    try {
      await dispatch(
        insertProduct({
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
        })
      ); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      
    //console.log('Login Success', credentialResponse);
      
      // await dispatch(
      //   userLogin({
      //     loginRQ: {
      //       // Provide necessary login request parameters
      //       // For example, if your login request requires a Google access token:
      //       accessToken: credentialResponse.clientId,
      //     },
      //     // Pass other necessary parameters like toast, navigate, etc.
      //   })
      // );
      // Perform the login action here by dispatching the userLogin action
      await dispatch(
        loginWithGoogle({
          loginRQ: {
            accessToken: credentialResponse.credential,
          },
          toast, router, currentPath
        })
      ); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className="col-md-12 col-12">
        {/* <button className="button col-12 -outline-blue-1 text-blue-1 py-15 rounded-8 ">
          <i className="icon-apple text-15 mr-10" />
          Facebook
        </button> */}
      </div>

      <div className="col-md-12 col-12 loginWithGoogle">
        {/* <button className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8 "
        onClick={(e) => handleGoogleLoginSuccess1(e)}>
          <i className="icon-apple text-15 mr-10" />
          Google
        </button> */}
        {/* <GoogleLogin
      clientId="387946406507-3akrm9q830gnja0pdspabuemif5fnd1e.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    /> */}
<GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
  onError={() => {
    //console.log('Login Failed');
  }}
/>
        {/* <GoogleOAuthProvider clientId="387946406507-3akrm9q830gnja0pdspabuemif5fnd1e.apps.googleusercontent.com">
          
        <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              
              //console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider> */}
      </div>
    </>
  );
};

export default LoginWithSocial;
