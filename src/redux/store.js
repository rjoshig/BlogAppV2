import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from '@redux/slices/authSlice'
import profileReducer from '@redux/slices/profileSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    // middleware: getDefaultMiddleware({
    //   serializableCheck: false,
    // }),
  },
})

// you can use combine reducer and create 1 rootReducer
