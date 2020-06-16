import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  ReadUserTableService,
  UpdateUserTableService,
} from '@services/firebase/FirebaseCrud.service'

// a single value, containing the first parameter that was passed to the thunk action creator when it was dispatched.
// This is useful for passing in values like item IDs that may be needed as part of the request. If you need to pass
// in multiple values, pass them
// together in an object when you dispatch the thunk, like dispatch(fetchUsers({status: 'active', sortBy: 'name'})).
// export const signOut = createAsyncThunk('users/signOutStatus', async () => {
//     return SignOutService()
//   })

export const readUserTable = createAsyncThunk('users/readUserTableStatus', async (uid) => {
  try {
    const userData = await ReadUserTableService(uid)
    return userData.val() // .val is needed because Thunk will throw error serialiazable error
  } catch (err) {
    const resMessage =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString()
    console.log('DEBUG:: \x1b[36m  readUserTable ERROR -> resMessage', resMessage)
    throw resMessage
  }
})

// INITIAL AUTH STATE
const initialState = {
  userTableData: {},
  isReAuthenticateFormVisible: false,
  isNewPasswordFormVisible: false,
  // aboutMe
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setIsReAuthenticateFormVisible: (state, action) => {
      state.isReAuthenticateFormVisible = action.payload // true or false
    },
    setIsNewPasswordFormVisible: (state, action) => {
      state.isNewPasswordFormVisible = action.payload // true/false
    },
  },

  extraReducers: {
    [readUserTable.pending]: (state, action) => {},
    [readUserTable.rejected]: (state, action) => {},
    [readUserTable.fulfilled]: (state, action) => {
      state.userTableData = action.payload
    },
  },
})

// actions generated from the slice
export const { setIsReAuthenticateFormVisible, setIsNewPasswordFormVisible } = profileSlice.actions

// A selector
export const profileSelector = (state) => state.profile // This exports the state so that useSelector Hook can use it in components
// The reducer
export default profileSlice.reducer
