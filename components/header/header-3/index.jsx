
'use client'

import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import LanguageMegaMenu from "../LanguageMegaMenu";
import HeaderSearch from "../HeaderSearch";
import MobileMenu from "../MobileMenu";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getUser, logoutUser  } from '../../../features/hero/authSlice';

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isUserLoggedIn } = useSelector((state) => state.user);

const handleLogout = async() => {
  await dispatch(logoutUser({ router, toast })); 
  
  router.push("/"); // Redirect to the login page or any other desired page
  toast.success("Logout Successful");// Pass the necessary parameters
};
useEffect(() => {
  
  //if(localStorage.getItem("userToken")){
  if (!user.firstname) {
    dispatch(getUser());
  }
//}
}, [dispatch]);
  const logOut = () => {
    
    router.push('/login')
  };
  return (
    <>
      <header className={`header shadow-4 bg-white ${navbar ? "is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <img src="/img/general/SkySun.png" alt="logo icon" />
                  <img src="/img/general/SkySun.png" alt="logo icon" />
                </Link>
                {/* End logo */}

                {/* <HeaderSearch /> */}
                {/* End logo */}

                <div className="header-menu ms-5">
                  <div className="header-menu__content">
                    <MainMenu style="text-dark-1" />
                  </div>
                </div>
                {/* End header-menu */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                {/* Start btn-group */}
                
        {isUserLoggedIn == true ? (
          
          <div className="header-menu">
          <div className="header-menu__content">
<nav className="menu js-navList">
<ul className={`menu__nav text-dark-1 -is-active`}>
<li
  className={"current menu-item-has-children"}
>
  <a href="#"><i
width={30}
height={30}
className=" icon-user text-22 px-10 text-blue-3"
></i>
    <span className="ms-2 mr-10 " style={{minWidth:"120px"}}>{user?.firstName + " " + user?.lastName} </span>
    <i className="icon icon-chevron-sm-down" />
  </a>
  <ul className="subnav" style={{minWidth:"200px"}}>
      <li
        key={0}
        className={
          "current menu-item-has-children"
        }
      >
        <Link href={"/user-profile"}>My Profile</Link>
      </li>
      <li
        key={1}
        className={
          "current menu-item-has-children"
        }
      >
      <Link href={"/my-bookings"}>My Bookings</Link>
      </li>
      {/* <li
        key={2}
        className={
          "current menu-item-has-children"
        }
      >
        <Link href={"#"}>My Co-Travellers</Link>
      </li> */}
      <li
        key={3}
        className={
          "current menu-item-has-children"
        }
      >
        <Link href={"#"} onClick={()=>handleLogout()}>Sign Out</Link>
      </li>
  </ul>
</li>
</ul>
</nav>
</div>
</div>
        ) : ( isUserLoggedIn === false ? (
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  <Link
                    href="/login"
                    className="button px-30 fw-400 text-14 -blue-1 bg-blue-1 h-50 text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="button ml-10 px-30 fw-400 text-14 -blue-1 bg-blue-1 h-50 text-white"
                  >
                    Register
                  </Link>
                </div>) : <></>)}
                {/* End btn-group */}
                
                <div className="row x-gap-20 items-center xxl:d-none">
                  {/* <CurrenctyMegaMenu textClass="text-dark-1" /> */}
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                  {/* End vertical devider*/}

                  <LanguageMegaMenu textClass="text-dark-1" />
                  {/* End Megamenu for Language */}
                </div>
                {/* End language and currency selector */}


                {/* Start mobile menu icon */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-10 text-dark-1">
                  
        {isUserLoggedIn == true ? (
          <>
          <a href="#" className="loggedInLink" onClick={toggleMenu}>
            <i width={30} height={30} className="icon-user text-18 px-5 text-blue-3"></i>
            <span className="ms-1 mr-5" style={{ minWidth: "120px" }}>{user?.firstName + " " + user?.lastName}</span>
            <i className="icon icon-chevron-sm-down"></i>
          </a>
          <ul className={`subnav shadow-1 shadow-lg ${isMenuOpen ? 'open' : ''}`} tabIndex="-1" id="mobile-sidebar_menu1" style={{ minWidth: "200px" }}>
            <li key={0} className={"current menu-item-has-children"}>
              <Link href={"/user-profile"}>My Profile</Link>
            </li>
            <li key={1} className={"current menu-item-has-children"}>
              <Link href={"/my-bookings"}>My Bookings</Link>
            </li>
            {/* <li key={2} className={"current menu-item-has-children"}>
              <Link href={"#"}>My Co-Travellers</Link>
            </li> */}
            <li key={3} className={"current menu-item-has-children"}>
              <Link href={"#"} onClick={handleLogout}>Sign Out</Link>
            </li>
          </ul></>
        ) : ( isUserLoggedIn === false ? (<div className="d-inline-flex">
                    <Link
                      href="/login"
                      className="items-center icon-user text-inherit text-18"
                    />
                    {/* <Link
                      href="/signup"
                      className="items-center icon-customer text-inherit text-18 ms-3"
                    /> */}
                  </div>) : <></>)}
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet"
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
      {/* End Header */}
    </>
  );
};

export default Header1;
