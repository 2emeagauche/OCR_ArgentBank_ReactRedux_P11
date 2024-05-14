import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  firstName: '' || localStorage.getItem('firstName'),
  lastName: '' || localStorage.getItem('lastName'),
  userName: '' || localStorage.getItem('userName'),
  status: 'idle',
  apiStatus: null,
  error: null
}

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: myHeaders,
    redirect: 'follow'
  })
  const data = await response.json()
  return data
})

export const fetchUserName = createAsyncThunk('profile/fetchUserName', async (arg) => {
  const raw = JSON.stringify({
    "userName": arg[1]
  });
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${arg[0]}`);
  
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  const data = await response.json()
  return data
})

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.firstName = ''
      state.lastName = ''
      state.userName = ''
      state.status = 'idle'
      state.apiStatus = null
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.apiStatus = action.payload.status
        if(action.payload.status === 400) {
          state.error = action.payload.message
        } else if(action.payload.status === 200) {
          state.error = null
          state.firstName = action.payload.body.firstName
          state.lastName = action.payload.body.lastName
          state.userName = action.payload.body.userName
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed"
      })
      builder
      .addCase(fetchUserName.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchUserName.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.apiStatus = action.payload.status
        if(action.payload.status === 400) {
          state.error = action.payload.message
        } else if(action.payload.status === 200) {
          state.error = null
          state.userName = action.payload.body.userName
        }
      })
      .addCase(fetchUserName.rejected, (state, action) => {
        state.status = "failed"
      })
  }
})

export const {resetProfile} = profileSlice.actions
export default profileSlice.reducer