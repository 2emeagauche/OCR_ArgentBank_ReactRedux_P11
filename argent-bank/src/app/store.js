import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice'
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});
