import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAPI from "./api";
//console.log("...",(process.env.NEXT_PUBLIC_AUTH_API_ENDPOINT))
const API = createAPI("https://api-userauth.azurewebsites.net");//(process.env.NEXT_PUBLIC_AUTH_API_ENDPOINT?? "https://api-userauth.azurewebsites.net"));
export const registerUser = createAsyncThunk(
  "auth/Register",
  async ({ registerData, router, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/Auth/register", registerData);
      toast.success("Added Successfully");
      router.push("/login");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCoTraveller = createAsyncThunk(
  "auth/createCoTraveller",
  async ({ coTravellerData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("api/Auth/cotravelers", coTravellerData);
      const userResponse = await getCoTravellers();
      toast.success("Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCoTraveller = createAsyncThunk(
  "auth/updateCoTraveller",
  async ({ coTravellerData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "api/Auth/update-cotravelers",
        coTravellerData
      );
      toast.success("Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCoTravellers = createAsyncThunk(
  "auth/getCoTravellers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`api/Auth/cotravelers`);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      if(localStorage.getItem("userToken")){
      const response = await API.get(`/api/Auth/user`);
      return response;
    }
    return rejectWithValue();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userDataRQ, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(`api/Auth/update-profile`, userDataRQ);
      toast.success("Module Updated Successfully");
      //navigate("/dashboard");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteCoTraveller = createAsyncThunk(
  "auth/deleteCoTraveller",
  async ({ id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/api/Auth/coTravellers/${id}`);
      toast.success("Module Updated Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ loginRQ, toast, router, currentPath }, { rejectWithValue }) => {
    try {
      
      const response = await API.post(`/api/auth/login`, loginRQ);
      toast.success("Module Updated Successfully");
      currentPath ? router.push(currentPath) : router.push("/");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async ({ loginRQ, toast, router, currentPath}, { rejectWithValue }) => {
    try {
      const response = await API.post(`/api/auth/loginWithGoogle`, loginRQ);
       toast.success("Module Updated Successfully");
       currentPath ? router.push(currentPath) : router.push("/");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ router, toast }, { rejectWithValue }) => {
    try {
      // You might want to add an API call to revoke the user's session on the server side
      // For now, just remove the user token from localStorage and reset the state
      localStorage.removeItem("userToken");
      router.push("/login"); // Redirect to the login page or any other desired page
      toast.success("Logout Successful");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ loginRQ, toast, router }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/api/auth/forgotPassword`, loginRQ);
       toast.success("Module Updated Successfully");
       router.push("/login");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ loginRQ, toast, router }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/api/auth/resetPassword`, loginRQ);
       toast.success("Module Updated Successfully");
       router.push("/login");
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentPath:"",
    user: {},
    coTravellers: [],
    isUserLoggedIn: null,
    error: "",
    loading: false,
    token: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      try {
        
        if (action.payload.data && action.payload.data.result.token)
          localStorage.setItem("userToken", action.payload.data.result.token);

        state.loading = false;
        state.isUserLoggedIn = true;
        state.user = action.payload.data.result.user;
        // Call the getUser async thunk to fetch user data
        // const userResponse = getUser(); // Make sure to dispatch the async thunk
        // if (userResponse.payload) {
        //   // If the user response is successful, update the state accordingly
        //   const user = userResponse.payload;
        //   localStorage.setItem("userToken", user.token);
        //   state.loading = false;
        //   state.isUserLoggedIn = true;
        //   // Update state with the user data, assuming `user` is the user data returned from the getUser async thunk
        //   state.user = user;
        // }
      } catch (error) {
        // Handle any errors that occur during the getUser async thunk
        console.error(error);
      }
      // // state.user = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.isUserLoggedIn = false;
      state.error = action.payload.message;
      localStorage.removeItem("userToken");
    });
    builder.addCase(loginWithGoogle.pending, (state, action) => {
      
      state.loading = true;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      
      try {
        if (action.payload.data && action.payload.data.token)
          localStorage.setItem("userToken", action.payload.data.token);

        state.loading = false;
        state.isUserLoggedIn = true;
        state.user = action.payload.data.user;
        //state.user = action.payload;
        // Call the getUser async thunk to fetch user data
        // const userResponse = getUser(); // Make sure to dispatch the async thunk
        // if (userResponse.payload) {
        //   // If the user response is successful, update the state accordingly
        //   const user = userResponse.payload;
        //   localStorage.setItem("userToken", user.token);
        //   state.loading = false;
        //   state.isUserLoggedIn = true;
        //   // Update state with the user data, assuming `user` is the user data returned from the getUser async thunk
        //   state.user = user;
        // }
      } catch (error) {
        // Handle any errors that occur during the getUser async thunk
        console.error(error);
      }
      // // state.user = action.payload;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      
      state.loading = false;
      state.isUserLoggedIn = false;
      state.error = action.payload.message;
      localStorage.removeItem("userToken");
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(createCoTraveller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCoTraveller.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createCoTraveller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // builder.addCase(getUser.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(getUser.fulfilled, (state, action) => {
    //   state.loading = false;

    //   state.isUserLoggedIn = true;
    //   state.user = action.payload.data.appUser;
    //   state.coTravellers = action.payload.data.appUser.coTravellers;
    // });
    // builder.addCase(getUser.rejected, (state, action) => {
    //   localStorage.removeItem("userToken");
    //   state.isUserLoggedIn = false;
    //   state.loading = false;
    //   state.error = action.payload;
    // });
    builder.addCase(getCoTravellers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCoTravellers.fulfilled, (state, action) => {
      state.loading = false;
      state.coTravellers = action.payload.data;
    });
    builder.addCase(getCoTravellers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      
      state.loading = false;
      state.user = action.payload.data.result.user;
      state.isUserLoggedIn = true;
      //state.coTravellers = action.payload.data.appUser.coTravellers;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      
      localStorage.removeItem("userToken");
      state.isUserLoggedIn = false;
      state.loading = false;
      state.user = {};
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
state.user = action.payload.data.result.user;
      // Call the getUser async thunk to fetch user data
      //const userResponse = getUser();
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateCoTraveller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCoTraveller.fulfilled, (state, action) => {
      state.loading = false;

      // Call the getUser async thunk to fetch user data
      const userResponse = getCoTravellers();
    });
    builder.addCase(updateCoTraveller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(deleteCoTraveller.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCoTraveller.fulfilled, (state, action) => {
      state.loading = false;

      // Call the getUser async thunk to fetch user data
      const userResponse = getCoTravellers();
    });
    builder.addCase(deleteCoTraveller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    
    builder.addCase(logoutUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isUserLoggedIn = false;
      state.user = {};
      state.coTravellers = [];
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

  },
});

export const { setUserData, setCurrentPath } = userSlice.actions;

export default userSlice.reducer;
