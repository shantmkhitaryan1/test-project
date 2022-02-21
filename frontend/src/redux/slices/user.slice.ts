import { createSlice } from '@reduxjs/toolkit';
import { removeToken } from '../../shared/helpers/helper';
import { UserReducerInterface } from '../../shared/models/userModel/reducerModel';
import { getCurrentUser, loginUser, registerUser } from '../actions';

const initialState: UserReducerInterface = {
   loading: false,
   currentUser: {},
   error: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            const { data, message } = action.payload;
            state.loading = false;
            if(data) {
               state.currentUser = data;
               state.error = null;
            } else {
               state.currentUser = {};
               state.error = message;
            }
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.currentUser = {};
         })
         .addCase(registerUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            const { data, message } = action.payload;
            state.loading = false;
            if(data) {
               state.currentUser = data;
               state.error = null;
            } else {
               state.currentUser = {};
               state.error = message;
            }
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.currentUser = {};
         })
         .addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(getCurrentUser.fulfilled, (state, action) => {
            const { data, message } = action.payload;
            state.loading = false;
            if(data) {
               state.currentUser = data;
               state.error = null;
            } else {
               removeToken();
               state.currentUser = {};
               state.error = message;
            }
         })
         .addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.currentUser = {};
         })
   },
});

export default userSlice.reducer;
