import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [
    { id: 1, name: "Flight", icon: "icon-tickets" },
    { id: 2, name: "Hotel", icon: "icon-bed" },
    // { id: 3, name: "Tour", icon: "icon-destination" },
    // { id: 4, name: "Package", icon: "icon-ski" },
    // { id: 5, name: "Holyday Rentals", icon: "icon-home" },
    // { id: 6, name: "Car", icon: "icon-car" },
    // { id: 7, name: "Cruise", icon: "icon-yatch" },
  ],
  currentTab: "Flight",
};

export const findPlaceSlice = createSlice({
  name: "find-place",
  initialState,
  reducers: {
    addCurrentTab: (state, { payload }) => {
      
      state.currentTab = payload;
    },
  },
});

export const { addCurrentTab } = findPlaceSlice.actions;
export default findPlaceSlice.reducer;
