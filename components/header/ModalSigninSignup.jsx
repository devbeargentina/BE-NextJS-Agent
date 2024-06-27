
'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import SignUpForm from "../common/SignUpForm";
import LoginForm from "../common/LoginForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginWithSocial from "../common/LoginWithSocial";
import { setCurrentPath } from "@/features/hero/authSlice";
import { useDispatch } from "react-redux";

const ModalSigninSignup = ({ currentPath }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(true);
  const handleCurrency = () => setClick((prevState) => !prevState);

  const languageContent = [
    { id: 1, language: "English", country: "United States" },
    { id: 2, language: "Türkçe", country: "Turkey" },
    { id: 3, language: "Español", country: "España" },
    { id: 4, language: "Français", country: "France" },
    { id: 5, language: "Italiano", country: "Italia" },
    { id: 6, language: "Dari, Pashto", country: "Afghanistan" },
    { id: 7, language: "Albanian", country: "Albania" },
    { id: 8, language: "Arabic, Berber", country: "	Algeria" },
    { id: 9, language: "Catalan", country: "Andorra" },
    { id: 10, language: "Kongo, Portuguese	", country: "Angola" },
    { id: 11, language: "Spanish", country: "Argentina" },
    { id: 12, language: "Armenian", country: "Armenia" },
    { id: 13, language: "English", country: "Australia" },
    { id: 14, language: "German", country: "Austria" },
    { id: 15, language: "Azerbaijani", country: "Azerbaijan" },
    { id: 16, language: "Bengali", country: "Bangladesh" },
    { id: 17, language: "English", country: "Barbados" },
    { id: 18, language: "Belarusian", country: "Belarus" },
    { id: 19, language: "Dutch, French", country: "Belgium" },
    { id: 20, language: "English", country: "Belize" },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(languageContent[0]);

  const handleItemClick = (item) => {
    setSelectedCurrency(item);
    setClick(false);
  };
  useEffect(()=>{
    dispatch(setCurrentPath(currentPath?currentPath:""));
  },[])

  return (
    <>
      <div className={`signinPopup js-langMenu ${click ? "" : "is-hidden"}`}>
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div className="signinPopup__content bg-white rounded-4">
          {/* <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">Select your language</div>
            <button className="pointer" onClick={handleCurrency}>
              <i className="icon-close" />
            </button>
          </div> */}
          {/* Emd flex-wrapper */}
          <div className="modalFlex px-30 py-30 sm:px-15 sm:py-15">
          <LoginForm />
                {/* End .Login */}

                <div className="row y-gap-20 pt-30">
                  <div className="col-12">
                    <div className="text-center">or sign in with</div>
                    
                    <div className="text-center"><GoogleOAuthProvider 
      clientId="387946406507-3akrm9q830gnja0pdspabuemif5fnd1e.apps.googleusercontent.com">
                  <LoginWithSocial />
</GoogleOAuthProvider></div>
                    
                  </div>
    
                  <div className="col-12">
                    <div className="text-center px-30">
                      By creating an account, you agree to our Terms of Service
                      and Privacy Statement.
                    </div>
                  </div>
                </div>
                
          </div>
        </div>
        {/* End langMenu */}
      </div>
    </>
  );
};

export default ModalSigninSignup;
