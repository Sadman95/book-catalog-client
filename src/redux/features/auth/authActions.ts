import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UseEncrypt } from '@/hooks/useEncrypt';
import { envConfig } from '@/config/env.config';

const backendURL = envConfig.apiUrl;

interface ILogin {
  email: string;
  password: string;
}

interface ISignUp extends ILogin {
  firstName: string;
  lastName: string;
}

export const signupAction = createAsyncThunk(
  'auth/signup',
  async (
    { firstName, lastName, email, password }: ISignUp,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        `${backendURL}auth/signup`,
        { firstName, lastName, email, password },
        config
      );
      localStorage.setItem('token', UseEncrypt(res.data.data.token, '12'));
      return res.data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginAction = createAsyncThunk(
  'auth/login',
  async ({ email, password }: ILogin, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        `${backendURL}auth/login`,
        { email, password },
        config
      );
      localStorage.setItem('token', UseEncrypt(res.data.data.token, '12'));
      return res.data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
