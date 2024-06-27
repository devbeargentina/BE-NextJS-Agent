'use client'

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../features/hero/authSlice';

const LoginWithSocial = () => {
  const dispatch = useDispatch();
  
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      
      await dispatch(
        userLogin({
          loginRQ: {
            // Provide necessary login request parameters
            // For example, if your login request requires a Google access token:
            accessToken: credentialResponse.clientId,
          },
          // Pass other necessary parameters like toast, navigate, etc.
        })
      );
      // Perform the login action here by dispatching the userLogin action
      await dispatch(
        userLogin({
          loginRQ: {
            // Provide necessary login request parameters
            // For example, if your login request requires a Google access token:
            accessToken: credentialResponse.credential,
          },
          // Pass other necessary parameters like toast, navigate, etc.
        })
      ); 
      
      // Handle successful login, e.g., redirect to the dashboard
      // toast.success("Module Updated Successfully");
      // navigate("/dashboard");
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }
  };
  return (
    <>
      <div className="col-md-6 col-12">
        <button className="button col-12 -outline-blue-1 text-blue-1 py-15 rounded-8 ">
          <i className="icon-apple text-15 mr-10" />
          Facebook
        </button>
      </div>

      <div className="col-md-6 col-12">
        <button className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8 ">
          <i className="icon-apple text-15 mr-10" />
          Google
        </button>
        
        <GoogleOAuthProvider clientId="387946406507-3akrm9q830gnja0pdspabuemif5fnd1e.apps.googleusercontent.com">
          
        <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              
              //console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default LoginWithSocial;
