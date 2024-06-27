import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI("https://api-hotel.azurewebsites.net");//process.env.NEXT_PUBLIC_HOTEL_API_ENDPOINT ?? "https://api-hotel.azurewebsites.net");//("https://localhost:7500");
const APIGateway = createAPI("https://argentinaapis.azurewebsites.net");//process.env.NEXT_PUBLIC_HOTEL_API_ENDPOINT ?? "https://argentinaapis.azurewebsites.net");//("https://localhost:7500");
// Async Thunk for Fetching Hotel Location List
export const fetchHotelLocationList = createAsyncThunk(
  "hotel/fetchHotelLocationList",
  async ({ query, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await APIGateway.get(`hotel/fetchHotelLocationList?query=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const hotelAvailResult = createAsyncThunk(
  "hotel/hotelsbycity",
  
  async ({ hotelAvailRQ, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`api/hotel/hotelsbycity`,  hotelAvailRQ );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async Thunk for Fetching Hotel List with Filter and Sorting
export const fetchHotelList = createAsyncThunk(
  "hotel/fetchHotelList",
  async ({ filters, sortOptions }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/hotel/list", { filters, sortOptions });
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

export const hotelCheckavailBookingRules = createAsyncThunk(
  "hotel/hotelcheckavailbookingrules",
  async ({ hotelCheckAvailBookingRulesRQ, router, toast }, { rejectWithValue }) => {
    try {
      //console.log(JSON.stringify(hotelCheckAvailBookingRulesRQ));
      const response = await API.post(`api/hotel/hotelcheckavailbookingrules`,  hotelCheckAvailBookingRulesRQ );
      //navigate("/booking-page");
      //router.push('/cart-page')
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
export const createCart = createAsyncThunk(
  "hotel/createcart",
  async ({ createCartRQ, router, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/hotel/createcart", createCartRQ);
      //router.push('/payment-page')
      router.push('/booking-confirm-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotelAvailRQ: {
      searchParam: {
        startDate: "2024-05-01",
        endDate: "2024-05-05",
        cityJPDCode: "JPD053294",
        pax: [
          {
            age: 25
          }
        ]
      },
      isApplySearchParam: true,
      filterParam: {
        amenities: [],
        priceMinMax: [
          0,1000
        ],
       hotelName: "",
        starRating: [],
        pageNumber: 0,
        pageSize: 10
      },
      isApplyFilterParam: true,
      sortParam: {
        sortBy: "rewr",
        sortType: "string"
      },
      isApplySortParam: true
    },
    filterParam: {
      amenities: [],
        priceMinMax: [
          0,1000
        ],
       hotelName: "string",
        starRating: [],
        pageNumber: 0,
        pageSize: 10
    },
    locationList: [],
    hotelList: [],
    hotelDetails: null,
    selectedHotel:null,
    selectedRoomTypeCode:null,
    bookingCode:null,
    cart: [],
    reservationStatus: null,
    checkavailbookingrulesRS:null,
    bookingRS:null,
    error: "",
    totalHotels:0,
    totalPages:0,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    updateHotelAvailRQ: (state, action) => {
      // Merge the payload with the existing FlightAvailRQ
      state.hotelAvailRQ = {
        ...state.hotelAvailRQ,
        ...action.payload,
      };
    },
    updateSelectedHotel: (state, action) => {
      // Assuming the payload contains information about the flight cart
      const cartPayload = action.payload;
    
      // Update the state.cart with the payload
      state.selectedHotel = cartPayload.selectedHotel;
      state.selectedRoomTypeCode = cartPayload.selectedRoomTypeCode;
      // If you need to merge the payload with an existing array in state.cart, use a spread operator
      // For example, if cartPayload is an array of items to add to the cart
      // state.cart = [...state.cart, ...cartPayload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotelLocationList.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(fetchHotelLocationList.fulfilled, (state, action) => {
      
      state.loading = false;
      state.hotelLocations = action.payload.result;
    });
    builder.addCase(fetchHotelLocationList.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(hotelAvailResult.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(hotelAvailResult.fulfilled, (state, action) => {
      
      state.loading = false;
      state.hotelList = action.payload.result.hotelList;
      state.filterParam = action.payload.result?.filterCriteria;
      state.totalPages = action.payload.result?.totalPages;
      state.totalHotels = action.payload.result?.totalHotel;
      state.totalNights = action.payload.result?.nights;
    });
    builder.addCase(hotelAvailResult.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(hotelCheckavailBookingRules.pending, (state) => {
      
      state.loading = true;
      state.checkavailbookingrulesRS = null;
    });
    builder.addCase(hotelCheckavailBookingRules.fulfilled, (state, action) => {
      
      state.loading = false;
      state.checkavailbookingrulesRS = action.payload?.result;
      // state.selectedRoomTypeCode = action.payload?.result?.hotelOptions?.hotelOption?.ratePlanCode;
      // if(action.payload?.result?.warningCode && action.payload?.result?.warningCode == "warnPriceChanged"){
      //   state.selectedHotel.selectedHotel.hotelOptions = action.payload?.result.hotelOptions;
      // }
    });
    builder.addCase(hotelCheckavailBookingRules.rejected, (state, action) => {
      
      state.loading = false;
      state.checkavailbookingrulesRS = null;
      state.error = action.payload?.message;
    });
    
    // Similar handling for other async actions
    // ...

    builder.addCase(clearError, (state) => {
      state.error = "";
    });
    builder.addCase(createCart.pending, (state) => {
      
      state.loading = true;
    });
    builder.addCase(createCart.fulfilled, (state, action) => {
      
      state.loading = false;
      state.bookingRS = JSON.parse(action.payload.result);
    });
    builder.addCase(createCart.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearError, updateHotelAvailRQ, updateSelectedHotel } = hotelSlice.actions;

export default hotelSlice.reducer;
