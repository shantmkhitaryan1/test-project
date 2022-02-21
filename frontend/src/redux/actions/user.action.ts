import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserApi } from '../../shared/api/user.api';
import { storeToken } from '../../shared/helpers/helper';
import { LoginModel, UserModel } from '../../shared/models/signModel';

export const loginUser = createAsyncThunk(
   'user/login',
   async (credentials: LoginModel) => {
      const result = await UserApi.login(credentials);
      if (result.error) {
         throw new Error(result.errorInfo);
      }
      storeToken(result.data.token);
      return result;
   },
);

export const registerUser = createAsyncThunk(
   'user/register',
   async (data: UserModel) => {
      const result = await UserApi.register(data);
      if (result.error) {
         throw new Error(result.errorInfo);
      }
      storeToken(result.data.token);
      return result;
   },
);

export const getCurrentUser = createAsyncThunk(
   'user/current',
   async () => {
      const result = await UserApi.getLogedInUser();
      if (result.error) {
         throw new Error(result.errorInfo);
      }
      return result;
   },
);
