import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import APIProduct from "./apiProduct";

export const insertProduct = createAsyncThunk(
  "product",
  async ({ productData, navigate, toast }, { rejectWithValue }) => {
    try {
      
      const response = await APIProduct.post("api/product", productData);
      
      //toast.success("Added Successfully");
      //navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    products: [],
    isUserLoggedIn: false,
    error: "",
    loading: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(insertProduct.pending, (state, action) => {
      
      state.loading = true;
    });
    builder.addCase(insertProduct.fulfilled, (state, action) => {
      
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(insertProduct.rejected, (state, action) => {
      
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { setUserData } = productSlice.actions;

export default productSlice.reducer;
