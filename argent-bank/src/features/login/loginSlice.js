import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: ''
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
      [state.email, state.password] = action.payload
    }
  }
})

export const { setLoginInfo } = loginSlice.actions

export default loginSlice.reducer