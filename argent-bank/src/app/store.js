import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice'
import profileReducer from '../features/profile/profileSlice'
import userNameReducer from '../features/profile/updateUserNameSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    username: userNameReducer,
  },
});
