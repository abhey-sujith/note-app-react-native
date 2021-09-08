import { createAction,createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUser,LoginUser } from './authAPI';

const initialState = {
  isAuthenticated:false,
  token: "",
  name: "",
  email: "",
  id:0,
  status: 'idle',
}

export const nuke = createAction('NUKE');

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userDetails,{ rejectWithValue }) => {
    try {
      console.log('inside createAsyncThunk');
      const response = await registerUser(userDetails);
      console.log("register",response);
      if (response.message==="The given data was invalid."){
        return rejectWithValue(response.errors)
      }
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const LoginAsync = createAsyncThunk(
  'auth/login',
  async (userDetails,{ rejectWithValue }) => {
    try {
      console.log('inside createAsyncThunk');
      const response = await LoginUser(userDetails);
      console.log("login",response.message);
      if (response.message==='Email not found' || response.message==='Bad Credentials'){
        return rejectWithValue(response.message)
      }
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const LogoutAsync = createAsyncThunk(
  'auth/logout',
  async (_,{getState}) => {
    try {
      console.log('inside createAsyncThunk');
      const response = await LogoutUser(getState().token);
      console.log("LogoutUser",response.message);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addDetails: (state) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.email= action.payload.user.email,
        state.name =  action.payload.user.name,
        state.name =  action.payload.user.id,
        state.token =  action.payload.token,
        state.isAuthenticated = true
        console.log("----------------------------fulfilled",action.payload); 
      }).addCase(registerAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log("----------------------------rejected",action.payload); 
      }) 
      .addCase(LoginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.email= action.payload.user.email,
        state.name =  action.payload.user.name,
        state.id =  action.payload.user.id,
        state.token =  action.payload.token,
        state.isAuthenticated = true
        console.log("----------------------------fulfilled",action.payload); 
      }).addCase(LoginAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log("----------------------------rejected",action.payload); 
      });
  },
})

// Action creators are generated for each case reducer function
export const { addDetails} = authSlice.actions

export default authSlice.reducer

export const getAuthenticationState = (state) => state.auth.isAuthenticated;