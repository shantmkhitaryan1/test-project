import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import pdfReducer from './slices/pdf.slice';

export const store = configureStore({
   reducer: {
      user: userReducer,
      pdf: pdfReducer 
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
   }),
});
