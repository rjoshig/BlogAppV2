import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  SignUpService,
  SignOutService,
  SignInService,
} from '@services/firebase/FirebaseAuth.service'

// a single value, containing the first parameter that was passed to the thunk action creator when it was dispatched.
// This is useful for passing in values like item IDs that may be needed as part of the request. If you need to pass
// in multiple values, pass them
// together in an object when you dispatch the thunk, like dispatch(fetchUsers({status: 'active', sortBy: 'name'})).
export const signIn = createAsyncThunk('users/signInStatus', async (cred) => {
  const email = cred.email
  const password = cred.password

  console.log('DEBUG:: signUp -> cred', cred)
  try {
    const userData = await SignInService(email, password)
    console.log('DEBUG:: \x1b[36m  signIn111111 -> userData', userData)
    if (userData) {
      const user = {
        fullName: userData.user.displayName,
        emailId: userData.user.email,
        photoUrl: userData.user.photoUrl,
        emailVerified: userData.user.emailVerified,
        uid: userData.user.uid,
      }
      console.log('THUNK USER', user)
      return user
    }
  } catch (err) {
    const resMessage =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString()
    console.log('DEBUG:: \x1b[36m  signIn ERROR -> resMessage', resMessage)
    throw resMessage
  }
})

export const signUp = createAsyncThunk('users/signUpStatus', async (cred) => {
  const email = cred.email
  const password = cred.password
  console.log('DEBUG:: signUp -> cred', cred)
  try {
    const userData = await SignUpService(email, password)
    console.log('DEBUG:: \x1b[36m  signUp111111 -> userData', userData)
    if (userData) {
      const user = {
        fullName: userData.displayName,
        emailId: userData.email,
        photoUrl: userData.photoUrl,
        emailVerified: userData.emailVerified,
        uid: userData.uid,
      }
      return user
    }
  } catch (err) {
    const resMessage =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString()

    throw resMessage
  }
})

export const signOut = createAsyncThunk('users/signOutStatus', async () => {
  return SignOutService()
})

// INITIAL AUTH STATE
const initialState = {
  isLoading: true, // like initializing
  isLoggedIn: true,
  user: {},
  authErrorMessage: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    restoreAuthSuccess: (state, action) => {
      console.log('DEBUG:: restoreAuthSuccess action-->', action)
      state.isLoggedIn = true
      state.isLoading = false
      state.user = action.payload
    },
    restoreNoAuth: (state, action) => {
      console.log('DEBUG:: restoreNoAuth action-->', action)
      state.isLoading = false
      state.isLoggedIn = false
    },
    signInSuccess: (state, action) => {
      console.log('DEBUG:: signInSuccess -> action -->', action)
      state.user = action.payload
      state.isLoggedIn = true
    },
    signInFailed: (state, action) => {
      console.log('DEBUG:: authErrorMessage -> authErrorMessage-->', action)
      state.authErrorMessage = action.payload
      state.isLoggedIn = false
    },
  },
  // thunk can be called here
  extraReducers: {
    [signOut.pending]: (state, action) => {
      state.isLoading = true
    },
    [signOut.rejected]: (state, action) => {
      state.isLoading = false
    },
    [signOut.fulfilled]: (state, action) => {
      state.isLoggedIn = false
      state.user = null
      state.authErrorMessage = null
    },
    [signIn.pending]: (state, action) => {},
    [signIn.rejected]: (state, action) => {
      console.log('DEBUG:: rejected authErrorMessage -> authErrorMessage-->', action)
      state.authErrorMessage = action.error.message
      state.isLoggedIn = false
      state.isLoading = false
    },
    [signIn.fulfilled]: (state, action) => {
      console.log('DEBUG:: FULFILLED signInSuccess -> action -->', action)
      state.user = action.payload
      state.isLoggedIn = true
      state.authErrorMessage = null
    },
    [signUp.pending]: (state, action) => {},
    [signUp.rejected]: (state, action) => {
      console.log('DEBUG:: rejected authErrorMessage -> authErrorMessage-->', action)
      state.authErrorMessage = action.error.message
      state.isLoggedIn = false
      state.isLoading = false
    },
    [signUp.fulfilled]: (state, action) => {
      console.log('DEBUG:: FULFILLED signUp -> action -->', action)
      state.user = action.payload
      state.isLoggedIn = true
      state.authErrorMessage = null
    },
  },
})

// actions generated from the slice
export const { signInSuccess, signInFailed, restoreAuthSuccess, restoreNoAuth } = authSlice.actions
// const authReducer = authSlice.reducer
// A selector
export const authSelector = (state) => state.auth // This exports the state so that useSelector Hook can use it in components
// The reducer
export default authSlice.reducer

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
