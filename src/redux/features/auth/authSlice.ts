import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { signupAction, loginAction } from './authActions';
import { UseEncrypt } from '@/hooks/useEncrypt';

const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userToken = null;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAction.fulfilled, (state, action: PayloadAction<any>) => {
        const { token, ...userInfo } = action.payload.data;
        state.loading = false;
        state.success = true;
        state.userInfo = userInfo;
        state.userToken = UseEncrypt(token, '12');
        state.error = null;
      })
      .addCase(signupAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<any>) => {
        const { token, ...userInfo } = action.payload.data;
        state.loading = false;
        state.success = true;
        state.userInfo = userInfo;
        state.userToken = UseEncrypt(token, '12');
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export const { logOut } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
