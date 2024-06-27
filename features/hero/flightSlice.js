import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";
import { DateObject } from "react-multi-date-picker";

const API = createAPI("https://api-flight.azurewebsites.net");//(process.env.NEXT_PUBLIC_FLIGHT_API_ENDPOINT?? "https://api-flight.azurewebsites.net"));//"https://argentinaflightapi.azurewebsites.net"));
// Async Thunk for Fetching Hotel Location List
export const fetchLocationList = createAsyncThunk(
  "flight/fetchLocationList",
  async ({ query, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/flight/fetchLocationList?searchQuery=${query}`);
      //const response = await API.get(`flight/locations?searchQuery=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLocationToList = createAsyncThunk(
  "flight/fetchLocationToList",
  async ({ query, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/flight/fetchLocationList?searchQuery=${query}`);
      //const response = await API.get(`flight/locations?searchQuery=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const flightAvailResult = createAsyncThunk(
  "flight/flightAvailResult",
  async ({ flightAvailRQ, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`api/flight/flightAvailResult`,  flightAvailRQ );
      //console.log(JSON.stringify(flightAvailRQ));
      //const response = await API.post(`flight/flights`,  flightAvailRQ );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const flightExtraCharges = createAsyncThunk(
  "flight/flightExtraCharges",
  async ({ flightExtraChargesRQ }, { rejectWithValue }) => {
    try {
      const response = await API.post(`api/flight/GetAirExtraCharges`,  flightExtraChargesRQ );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Fetching Hotel List with Filter and Sorting
export const createCart = createAsyncThunk(
  "flight/createCart",
  async ({ createCartRQ, router, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/flight/CreateCart", createCartRQ);
      //const response = await API.post("flight/book", createCartRQ);
      //router.push('/payment-page')
      router.push('/booking-confirm-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Fetching Hotel Details
export const fetchHotelDetails = createAsyncThunk(
  "hotel/fetchHotelDetails",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/hotel/${hotelId}/details`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Adding Hotel to Cart
export const addToCart = createAsyncThunk(
  "hotel/addToCart",
  async ({ hotelId, quantity }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/cart/add", { hotelId, quantity });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Completing Hotel Reservation
export const completeReservation = createAsyncThunk(
  "hotel/completeReservation",
  async ({ cartItems, paymentInfo }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/reservation/complete", { cartItems, paymentInfo });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    filterParam: {
      cabin: [],
      priceMinMax: [],
      stops: [],
      pageNumber: 0,
      pageSize: 10
    },
    returnFilterParam: {
      cabin: [],
      priceMinMax: [],
      stops: [],
      pageNumber: 0,
      pageSize: 10
    },
    locationList: [],
    returnLocationList: [],
    createBookingRQ: null,
    returnCreateBookingRQ: [],
    flightList: [],
    extraCHARGES: {},
    returnFlightList: [],
    hotelDetails: null,
    selectedFlight:{},
    selectedReturnFlight:{},
    cart: [],
    reservationStatus: null,
    resCart: {},
    error: "",
    totalFlights:0,
    totalPages:0,
    totalReturnFlights:0,
    totalRetutrnPages:0,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    updateFlightCart: (state, action) => {
      // Assuming the payload contains information about the flight cart
      const cartPayload = action.payload;
    
      // Update the state.cart with the payload
      state.cart = cartPayload;
    
      // If you need to merge the payload with an existing array in state.cart, use a spread operator
      // For example, if cartPayload is an array of items to add to the cart
      // state.cart = [...state.cart, ...cartPayload];
    },
    updateSelectedFlight: (state, action) => {
      // Assuming the payload contains information about the flight cart
      const cartPayload = action.payload;
    
      // Update the state.cart with the payload
      state.selectedFlight = cartPayload;
    
      // If you need to merge the payload with an existing array in state.cart, use a spread operator
      // For example, if cartPayload is an array of items to add to the cart
      // state.cart = [...state.cart, ...cartPayload];
    },
    updateSelectedReturnFlight: (state, action) => {
      // Assuming the payload contains information about the flight cart
      const cartPayload = action.payload;
    
      // Update the state.cart with the payload
      state.selectedReturnFlight = cartPayload;
    
      // If you need to merge the payload with an existing array in state.cart, use a spread operator
      // For example, if cartPayload is an array of items to add to the cart
      // state.cart = [...state.cart, ...cartPayload];
    },
    updateCreateBookingRQ: (state, action) => {
      state.createBookingRQ = action.payload;
    },
    updateReturnCreateBookingRQ: (state, action) => {
      state.returnCreateBookingRQ = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocationList.pending, (state) => {
      
      state.loading = false;
    });
    builder.addCase(fetchLocationList.fulfilled, (state, action) => {
      
      state.loading = false;
      //state.locationList = action.payload.result;
      state.locationList = action.payload.result.filter(segment => segment.segmentType === 'DIRECT');
      state.returnLocationList = action.payload.result.filter(segment => segment.segmentType === 'ORIGIN');

    });
    builder.addCase(fetchLocationList.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(fetchLocationToList.pending, (state) => {
      
      state.loading = false;
    });
    builder.addCase(fetchLocationToList.fulfilled, (state, action) => {
      
      state.loading = false;
      state.locationToList = action.payload.result;
    });
    builder.addCase(fetchLocationToList.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(flightAvailResult.pending, (state) => {
      
      state.loading = true;
      state.selectedFlight={};
      state.selectedReturnFlight={};
    });
    builder.addCase(flightAvailResult.fulfilled, (state, action) => {
      
      state.loading = false;
      if(action.payload.result)
      {
      state.flightList = action.payload.result?.flightList;
      state.filterParam = action.payload.result?.filterCriteria;
      //state.flightAvailRQ.filterParam = action.payload.result?.filterCriteria; // Corrected assignment
      state.returnFlightList = action.payload.result?.flightReturnList;
      state.returnFilterParam = action.payload.result?.returnFilterCriteria;
      state.totalPages = action.payload.result?.totalPages;
      state.totalFlights = action.payload.result?.totalFlights;
      state.totalRetutrnPages = action.payload.result?.totalPagesReturn;
      state.totalReturnFlights = action.payload.result?.totalFlightsReturn;
      state.selectedFlight={};
      state.selectedReturnFlight={};
      }
    });
    builder.addCase(flightAvailResult.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    
    builder.addCase(flightExtraCharges.pending, (state) => {
      
      state.loading = false;
    });
    builder.addCase(flightExtraCharges.fulfilled, (state, action) => {
      
      state.loading = false;
      state.extraCHARGES = action.payload.result
    });
    builder.addCase(flightExtraCharges.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });    

    builder.addCase(createCart.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(createCart.fulfilled, (state, action) => {
      
      state.loading = false;
      state.resCart = JSON.parse(action.payload.result);
    });
    builder.addCase(createCart.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });

    // Similar handling for other async actions
    // ...

    builder.addCase(clearError, (state) => {
      state.error = "";
    });
  },
});

export const { clearError, updateFlightCart, updateSelectedFlight, updateSelectedReturnFlight, updateCreateBookingRQ, updateReturnCreateBookingRQ } = flightSlice.actions;

export default flightSlice.reducer;
