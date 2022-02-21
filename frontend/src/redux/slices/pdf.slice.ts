import { createSlice } from '@reduxjs/toolkit';
import { PdfReducerInterface } from '../../shared/models/pdfModel/reducerModel';
import { uploadPdf } from '../actions/pdf.action';

const initialState: PdfReducerInterface = {
   loading: null,
   pdfData: null,
   error: null
};

export const pdfSlice = createSlice({
   name: 'pdf',
   initialState,
   reducers: {
      removeProgress: (state) => {
         state.loading = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(uploadPdf.pending, (state) => {
            state.loading = 50;
         })
         .addCase(uploadPdf.fulfilled, (state, action) => {
            const { data, message } = action.payload;
            state.loading = 100;
            if(data) {
               state.error = null;
               state.pdfData = data;
            } else {
               state.error = message;
               state.pdfData = null;
            }
         })
         .addCase(uploadPdf.rejected, (state, action) => {
            state.loading = null;
            state.error = action.error;
            state.pdfData = null;
         })
   },
});

export const { removeProgress } = pdfSlice.actions;

export default pdfSlice.reducer;
