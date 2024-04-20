import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  userName: '',
  status: 'idle',
  apiStatus: null,
  error: null
}

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

const updateUserNameSlice = createSlice({
  name: 'updateUserName',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchUserName.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(fetchUserName.fulfilled, (state, action) => {
      state.status = "succeeded"
      console.log(action.payload)
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

export default updateUserNameSlice.reducer