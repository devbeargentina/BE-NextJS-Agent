import { createSlice } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";

const initialState = {
  business:"Flight",
  lang:"en-US",
  hotelCriteria:{
      locationCode: "",
      locationName: "",
      locationToCode: "",
      locationToName: "",
      cutOfDays: 2,
      stayInDays: 2,
      startDate: new Date(new DateObject().add(8,"days")).toISOString(),
      endDate:new Date(new DateObject().add(10,"days")).toISOString(),
      adult: 2,
      child: 0,
      room: 1
    },    
  flightAvailRQ: {
    searchParam: {
      destinationLocationCode: "",//"MIA",
      destinationLocationName: "",//"Miami - MIA INTL APT - Miami",
      originLocationCode: "",//"EZE",
      originLocationName: "",//"Buenos Aires - EZE INTL APT - Buenos Aires",
      startDate: new Date(new DateObject().add(15,"days")).toISOString(),
      endDate: new Date(new DateObject().add(17,"days")).toISOString(),
      adult: 1,
      child: 0,
      infant: 0,
      tripType: "ROUND_TRIP"//"ONE_WAY"
    },
    isApplySearchParam: true,
    filterParam: {
      cabin: [],
      priceMinMax: [0, 100000],
      stops: [],
      pageNumber: 0,
      pageSize: 10,
      returnCabin: [],
      returnPriceMinMax: [0, 100000],
      returnStops: [],
      returnPageNumber: 0,
      returnPageSize: 10
    },
    isApplyFilterParam: true,
    sortParam: {
      sortBy: "rewr",
      sortType: "string",
      returnSortBy: "rewr",
      returnSortType: "string"
    },
    isApplySortParam: true
  },
};

export const searchCriteriaSlice = createSlice({
  name: "searchCriteria",
  initialState,
  reducers: {
    updateHotelCriteria: (state, action) => {
      state.hotelCriteria = {
        ...state.hotelCriteria,
        ...action.payload,
      };
    },    
    updateFlightAvailRQ: (state, action) => {
      // Merge the payload with the existing FlightAvailRQ
      state.flightAvailRQ = {
        ...state.flightAvailRQ,
        ...action.payload,
      };
    },
    updateLang: (state, action) => {
      debugger;
      // Merge the payload with the existing FlightAvailRQ
      state.lang = action.payload;
    },
  },
});

export const { updateFlightAvailRQ, updateHotelCriteria, updateLang } = searchCriteriaSlice.actions;
export default searchCriteriaSlice.reducer;
