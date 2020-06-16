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
    console.log('DEBUG:: \x1b[36m   readUserTable THUNK -> userData --> ', userData)
    console.log('DEBUG:: \x1b[36m   readUserTable THUNK -> userData --> ', userData.val())
    //  const profileData = { userData }
    // const profileData1 = {
    //   aboutme: userData.aboutme,
    //   displayName: userData.displayName,
    //   email: userData.email,
    //   uid: userData.uid,
    // }
    // // console.log('DEBUG:: readUserTable -> profileData', profileData)
    // console.log('DEBUG:: readUserTable -> profileData1', profileData1)

    //   if (userData) {
    //     const user = {
    //       fullName: userData.user.displayName,
    //       emailId: userData.user.email,
    //       photoUrl: userData.user.photoUrl,
    //       emailVerified: userData.user.emailVerified,
    //       uid: userData.user.uid,
    //     }
    //     console.log('THUNK USER', user)
    //     return user
    //   }

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
  isReAuthenticateFormVisible: false, //! start from here
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
  // thunk can be called here
  extraReducers: {
    [readUserTable.pending]: (state, action) => {},
    [readUserTable.rejected]: (state, action) => {},
    [readUserTable.fulfilled]: (state, action) => {
      console.log('DEBUG:: action', action)

      state.userTableData = action.payload
    },
  },
})

// actions generated from the slice
export const { setIsReAuthenticateFormVisible, setIsNewPasswordFormVisible } = profileSlice.actions
// const authReducer = authSlice.reducer
// A selector
export const profileSelector = (state) => state.profile // This exports the state so that useSelector Hook can use it in components
// The reducer
export default profileSlice.reducer

// createSlice returns an object that looks like this:
// {
//   name: "todos",
//   reducer: (state, action) => newState,
//   actions: {
//     addTodo: (payload) => ({type: "todos/addTodo", payload}),
//     toggleTodo: (payload) => ({type: "todos/toggleTodo", payload})
//   },
//   caseReducers: {
//     addTodo: (state, action) => newState,
//     toggleTodo: (state, action) => newState,
//   }
// }

// import auth from '@react-native-firebase/auth'
// thunk

// export const onAuthStateChanged = createAsyncThunk('users/onAuthStateChangedStatus', async () => {

//   const response =  await auth().onAuthStateChanged((user) => {return user})

//   return response
// })
