import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";

const API = createAPI((process.env.NEXT_PUBLIC_CART_API_ENDPOINT?? "https://api-cart.azurewebsites.net"));

export const getCartById = createAsyncThunk(
  "cart/getCartById",
  async ({ sessionCartId, router }, { rejectWithValue }) => {   
    try {
      const response = await API.get(`api/Cart/${sessionCartId}`);
      //router.push('/payment-page')
   //   router.push('/booking-confirm-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCart = createAsyncThunk(
  "cart/createCart",
  async ({ rqAddSessionCart, router }, { rejectWithValue }) => {   
    try {      
      //console.log(JSON.stringify(rqAddSessionCart));
      const sessionCartId = localStorage.getItem('sessioncart');
      if (sessionCartId) {
        const response = await API.post(`api/Cart/${sessionCartId}/items`,  rqAddSessionCart );
        return response.data;
      }
      else{
        const response = await API.post(`api/Cart`,  rqAddSessionCart );
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ rqAddSessionCart, router }, { rejectWithValue }) => {   
    try {      
      //console.log(JSON.stringify(rqAddSessionCart));
      const response = await API.post(`api/SessionCart/add`,  rqAddSessionCart );
      //router.push('/cart-page')
      // Dispatch getCartById action after addCartItem is fulfilled
      //await dispatch(getCartById()); // Dispatch getCartById action
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ rqAddSessionCart, router }, { rejectWithValue }) => {   
    try {      
      //console.log(JSON.stringify(rqAddSessionCart));
      const response = await API.post(`api/SessionCart/update`,  rqAddSessionCart );
      //router.push('/cart-page')
      // Dispatch getCartById action after addCartItem is fulfilled
      //await dispatch(getCartById()); // Dispatch getCartById action
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteSessionCartItem = createAsyncThunk(
  "cart/deleteSessionCartItem",
  async ({ id }, { rejectWithValue }) => {
    
    try {
      const sessionCartId = localStorage.getItem('sessioncart');
      const response = await API.delete(`api/Cart/${sessionCartId}/items/${id}`);
      //await dispatch(getCartById());
      // toast.success("Module Updated Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSessionCartSC = createAsyncThunk(
  "cart/getSessionCartSC",
  async ({ bookingid, router }, { rejectWithValue }) => {
   
    try {
      const response = await API.get("api/SessionCartControllerSC");
      //router.push('/payment-page')
   //   router.push('/booking-confirm-page')
      await dispatch(getSessionCartTR());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getSessionCartTR = createAsyncThunk(
  "cart/getSessionCartTR",
  async ({ bookingid, router }, { rejectWithValue }) => {
   
    try {
      const response = await API.get("api/SessionCartControllerTR");
      //router.push('/payment-page')
   //   router.push('/booking-confirm-page')
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const clearSessionCart = createAsyncThunk(
  "cart/clearSessionCart",
  async ({ }, { rejectWithValue }) => {
    try {
      const sessionCartId = localStorage.getItem('sessioncart');
      const response = await API.delete(`api/Cart/${sessionCartId}`);
      // toast.success("Module Updated Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false, 
    error: null, 
    cartItems:[],
    totalCost:0
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    // updateFilterParam: (state, action) => {
    //   // Merge the payload with the existing FlightAvailRQ
    //   state.filterParam = {
    //     ...state.filterParam,
    //     ...action.payload,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartById.pending, (state) => {      
      state.loading = true;
    });
    builder.addCase(getCartById.fulfilled, (state, action) => {      
      state.loading = false;
      if(action.payload.items.length > 0){
        state.cartItems = action.payload.items;
        state.totalCost = action.payload.totalCost;
      }
      else{
        localStorage.removeItem("sessioncart");
        state.cartItems = [];
        state.totalCost = 0;
      }
    });
    builder.addCase(getCartById.rejected, (state, action) => {      
      state.cartItems = [];
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCart.fulfilled, (state, action) => {   
      state.loading = false;
     
      state.cartItems = action.payload.items;
      state.totalCost = action.payload.totalCost;
      //console.log(JSON.stringify(rqAddSessionCart));
      const sessionCartId = localStorage.getItem('sessioncart');
      if (!sessionCartId) {
        localStorage.setItem("sessioncart", action.payload.id);
      }
    });
    builder.addCase(createCart.rejected, (state, action) => { 
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCartItem.fulfilled, (state, action) => {   
      state.loading = false;     
      state.cartItems = action.payload.items;
      state.totalCost = action.payload.totalCost;
      //console.log(JSON.stringify(rqAddSessionCart));
        localStorage.setItem("sessioncart", action.payload.id);
    });
    builder.addCase(addCartItem.rejected, (state, action) => { 
      state.loading = false;
      state.error = action.payload;
    });
    
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {   
      state.loading = false;
       
      state.cartItems = action.payload.items;
      state.totalCost = action.payload.totalCost;
      //console.log(JSON.stringify(rqAddSessionCart));
      const sessionCartId = localStorage.getItem('sessioncart');
      if (!sessionCartId) {
        localStorage.setItem("sessioncart", action.payload.id);
      }
      //state.cartItems = action.payload;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => { 
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteSessionCartItem.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSessionCartItem.fulfilled, (state, action) => {
      state.loading = false;  
      state.cartItems = action.payload.items;
      state.totalCost = action.payload.totalCost;
      //console.log(JSON.stringify(rqAddSessionCart));
      const sessionCartId = localStorage.getItem('sessioncart');
      if (!sessionCartId) {
        localStorage.setItem("sessioncart", action.payload.id);
      }
    });
    builder.addCase(deleteSessionCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(clearSessionCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clearSessionCart.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.removeItem("sessioncart");
      state.cartItems = [];
    });
    builder.addCase(clearSessionCart.rejected, (state, action) => {
      state.loading = false;
      state.error = [];
    });
  },
});

export const { clearError } = cartSlice.actions;

export default cartSlice.reducer;
