import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
}

const authSlice = createSlice({
  name:'authentication',
  initialState,
  reducers:{}
})

export default authSlice.reducer