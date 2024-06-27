
'use client'

import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import LanguageMegaMenu from "../LanguageMegaMenu";

import MobileMenu from "../MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getUser } from "@/features/hero/authSlice";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);

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


const handleLogout = async () => {
  
  await dispatch(logoutUser({ router, toast })); // Pass the necessary parameters
  
  router.push("/"); // Redirect to the login page or any other desired page
  toast.success("Logout Successful");
};
useEffect(() => {
  
  if(localStorage.getItem("userToken")){
  if (!user.firstname) {
    dispatch(getUser());
  }
}
}, [dispatch]);
  const logOut = () => {
    
    router.push('/login')
  };
  return (
    <>
      <header className={`header bg-dark-3 ${navbar ? "is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <img src="/img/general/SkySun.png" alt="logo icon" />
                  <img src="/img/general/SkySun.png" alt="logo icon" />
                </Link>
                {/* End logo */}

                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-white" />
                  </div>
                </div>
                {/* End header-menu */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  {/* <CurrenctyMegaMenu textClass="text-white" /> */}
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  {/* <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div> */}
                  {/* End vertical devider*/}

                  {/* <LanguageMegaMenu textClass="text-white" /> */}
                  {/* End Megamenu for Language */}
                </div>
                {/* End language and currency selector */}

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
width={20}
height={20}
className=" icon-user text-22 px-10 text-blue-3"
></i>
    <span className="mr-10" style={{minWidth:"120px"}}>{user?.firstName + " " + user?.lastName} </span>
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
            className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
          >
            Sign Up / Register
          </Link>
        </div>) : <></>)}
                {/* End btn-group */}

                {/* Start mobile menu icon */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                  <div>
                    <Link
                      href="/login"
                      className="d-flex items-center icon-user text-inherit text-22"
                    />
                  </div>
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
    </>
  );
};

export default Header1;
