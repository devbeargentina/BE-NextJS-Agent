import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import UserSlice from   "../features/hero/authSlice"
import searchCriteriaSlice from "@/features/hero/searchCriteriaSlice";
import hotelSlice from "@/features/hero/hotelSlice";
import flightSlice from "@/features/hero/flightSlice";
import bookingSlice from "@/features/hero/bookingSlice";
import cartSlice from "@/features/hero/cartSlice";

export const store = configureStore({
    reducer: {
        hero: findPlaceSlice,
        user: UserSlice,
        searchCriteria: searchCriteriaSlice,
        hotel: hotelSlice,
        flight: flightSlice,
        booking: bookingSlice,
        cart: cartSlice
    },
});
