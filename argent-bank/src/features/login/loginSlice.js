import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  token: '' || localStorage.getItem('token'),
  persist: false,
  status: 'idle',
  apiStatus: null,
  error: null
}

export const fetchLogin = createAsyncThunk('login/fetchLogin', async (submission) => {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    body: submission,
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json()
  return data
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    settingPersist: (state, action) => {
      state.persist = action.payload
    },
    resetLogin: (state) => {
      state.status = 'idle'
      state.apiStatus = null
      state.error = null
    },
    nukeToken: (state) => {
      state.token = ''
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchLogin.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.apiStatus = action.payload.status
      if(state.apiStatus === 400) {
        state.error = action.payload.message
      } else if(state.apiStatus === 200) {
        state.error = null
        state.token = action.payload.body.token
      }
    })
    .addCase(fetchLogin.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export const {settingPersist, resetLogin, nukeToken} = loginSlice.actions

export default loginSlice.reducer