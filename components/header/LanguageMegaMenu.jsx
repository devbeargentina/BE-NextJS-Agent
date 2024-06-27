
'use client'

import Image from "next/image";
import { useState } from "react";
import { updateLang } from "@/features/hero/searchCriteriaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from '../../app/LanguageContext';
import Link from "next/link";

const LanguageMegaMenu = ({ textClass }) => {
  const [click, setClick] = useState(false);
  const { changeLanguage } = useLanguage();
  const { flightAvailRQ, hotelCriteria } = useSelector((state) => state.searchCriteria);
  const dispatch = useDispatch(); // Hook to dispatch actions
  const handleCurrency = () => setClick((prevState) => !prevState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { language } = useLanguage();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const languageContent = [
    { id: 1, language: "English", lang: "en-US" },
    { id: 2, language: "Spanish", lang: "gu-IN"  },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(languageContent[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleItemClick = (item) => {
    debugger;
    localStorage.setItem("lang", item.lang)
    setSelectedCurrency(item);
    setSelectedLanguage(item.lang);
    changeLanguage(item.lang);
    dispatch(
      updateLang(item.lang)
    );
    setClick(false);
  };

  return (
    <>
    <div className="header-menu">
    <div className="header-menu__content">
<nav className="menu js-navList">
<ul className={`menu__nav text-dark-1 -is-active`}>
<li
className={"current menu-item-has-children"}
>
<a href="#">
          <Image
            width={20}
            height={20}
            src={`/img/general/${selectedLanguage}.png`}
            alt="image"
            className="rounded-full mr-10"
          />
          <span className="js-language-mainTitle">
            {" "}
            {selectedLanguage === "en-US" ? "English" : "Spanish"}
          </span>
          <i className="icon-chevron-sm-down text-7 ml-15" />
</a>
<ul className="subnav" style={{minWidth:"200px"}}>
            {languageContent.map((item) => (
<li
                key={item.id}
                onClick={() => handleItemClick(item)}
  className={
    `current mb-5 pointer menu-item-has-children ${
      selectedLanguage === item.lang ? "active" : ""
    }`
  }
><Image
            width={20}
            height={20}
            src={`/img/general/${item.lang}.png`}
            alt="image"
            className="rounded-full mr-10"
          />
                  <span className="text-15 lh-15 fw-500 text-dark-1">
                    {item.language}
                  </span>
  {/* <Link href={"#"} onClick={()=>handleLogout()}>Sign Out</Link> */}
</li>
            ))}
</ul>
</li>
</ul>
</nav>
</div>
</div>
      {/* Start language currency Selector */}
      {/* End language currency Selector */}

      <div className={`langMenu js-langMenu ${click ? "" : "is-hidden"}`}>
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div className="langMenu__content bg-white rounded-4">
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">Select your language</div>
            {/* End title */}
            <button className="pointer" onClick={handleCurrency}>
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* Emd flex-wrapper */}
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {languageContent.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  selectedCurrency.language === item.language ? "active" : ""
                }`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-500 text-dark-1">
                    {item.language}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* End langMenu */}
      </div>
    </>
  );
};

export default LanguageMegaMenu;
