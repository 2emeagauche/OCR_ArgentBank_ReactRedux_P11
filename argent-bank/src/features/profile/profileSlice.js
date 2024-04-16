import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: 'Tony',
  lastName: 'Jarvis',
  userName: 'Tummy',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileInfos: (state, action) => {
      [state.firstName, state.lastName, state.userName] = action.payload
    }
  }
})

export default profileSlice.reducer