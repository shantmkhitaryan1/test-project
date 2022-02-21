import { createAsyncThunk } from '@reduxjs/toolkit';
import { PdfApi } from '../../shared/api/pdf.api';

export const uploadPdf = createAsyncThunk(
   'pdf/upload',
   async (data: FormData) => {
      const result = await PdfApi.uploadPdf(data);
      if (result.error) {
         throw new Error(result.errorInfo);
      }
      return result;
   },
);
