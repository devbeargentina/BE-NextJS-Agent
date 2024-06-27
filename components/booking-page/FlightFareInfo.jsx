import React from "react";
import { useSelector } from "react-redux";
import BookingDetailsFlight from "./sidebar/BookingDetailsFlight";
  const FlightFareInfo = (props) => {   
    const { cartItems, extraCHARGES } = useSelector((state) => state.cart);
    const filteredItems = (cartItems && cartItems && cartItems.length > 0) ? cartItems.filter(item => item.product.business === "Flight") : {};
    return (
          <BookingDetailsFlight {...props} />
    );
  };
  

export default FlightFareInfo;
