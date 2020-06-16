import React, { useReducer, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, restoreAuthSuccess, restoreNoAuth } from '@redux/slices/authSlice'

import { NavigationContainer } from '@react-navigation/native'
import RootStackNavigator from '@navigations/RootStackNavigator'

import { AuthContext } from '@components/Context'
import SplashScreen from '@screens/SplashScreen'
import AsyncStorage from '@react-native-community/async-storage'

import auth from '@react-native-firebase/auth'
import { SignOutService } from '@services/firebase/FirebaseAuth.service'

const STORAGE_SESSION_TOKEN = 'sessionToken'

function authReducer(prevState, action) {
  switch (action.type) {
    case 'SIGN_IN_WITH_NAME':
      return {
        ...prevState,
        isLoggedIn: true,
        fullName: action.name, // ! NAME
        emailId: action.email,
        photoUrl: action.photourl,
        emailVerified: action.emailverified,
        uid: action.uid,
      }
    case 'SIGN_IN_NO_NAME':
      return {
        ...prevState,
        isLoggedIn: true,
        fullName: action.name,
        emailId: action.email,
        photoUrl: action.photourl,
        emailVerified: action.emailverified,
        uid: action.uid,
      }

    case 'SIGN_OUT':
      return {
        ...prevState,
        isLoggedIn: false,
      }

    case 'UPDATE_PROFILE':
      return {
        ...prevState,
        emailId: action.emailId,
        fullName: action.displayName,
      }
  }
}

// rjoshi: the isloading here is for the startup screen.. not the signin button
export default function Main() {
  const initialState = {
    isLoading: true, // like initializing
    isLoggedIn: true,
    fullName: 'John Doe',
    emailId: null,
    photoUrl: null,
    emailVerified: false,
    uid: null,
  }

  const dispatch = useDispatch()
  const { isLoading, isLoggedIn, user } = useSelector(authSelector)

  // useREducer Hook
  // * const [state, dispatch] = useReducer(authReducer, initialState)

  //* console.log('DEBUG: \x1b[36m Reducer State:', state)

  useEffect(() => {
    let isCurrent = true

    const onAuthStateChanged = (userData) => {
      if (userData) {
        console.log('DEBUG:: onAuthStateChanged -> userData', userData)

        const user = {
          fullName: userData.displayName,
          emailId: userData.email,
          photoUrl: userData.photoUrl,
          emailVerified: userData.emailVerified,
          uid: userData.uid,
        }

        dispatch(restoreAuthSuccess(user))
      } else {
        dispatch(restoreNoAuth())
      }
    }
    if (isCurrent) {
      auth().onAuthStateChanged(onAuthStateChanged)
    }

    return () => {
      isCurrent = false
    }

    //   return userObj // unsubscribe on unmount
  }, [dispatch])

  const authContext = useMemo(() => ({
    signIn: (userData) => {
      console.log('DEBUG:: Main authContext-> userData', userData)
      console.log(
        '\x1B[31m userData',
        userData.user.email,
        userData.user.uid,
        userData.user.emailVerified,
      )
      // Use the logged in user and Session Token and save it in AsyncStorage
      // Dispatch correct state for App so that it takes it to Home page

      // try {
      //   await AsyncStorage.setItem(STORAGE_SESSION_TOKEN, sessionToken)
      // } catch (error) {
      //   console.log('DEBUG:ERROR FROM Main.js (signIn)', error)
      // }

      // {
      //   "additionalUserInfo": {
      //       "isNewUser": false
      //   },
      //   "user": {
      //       "displayName": null,
      //       "email": "rjo@rjo.com",
      //       "emailVerified": false,
      //       "isAnonymous": false,
      //       "metadata": [Object
      //       ],
      //       "phoneNumber": null,
      //       "photoURL": null,
      //       "providerData": [Array
      //       ],
      //       "providerId": "firebase",
      //       "uid": "ouhc6i74slfyaantM6QfB9E342W2"
      //   }
      //   }

      if (userData.user.displayName) {
        dispatch({
          type: 'SIGN_IN_WITH_NAME',
          fullName: userData.user.displayName,
          emailId: userData.user.email,
          photoUrl: userData.user.photoURL,
          emailVerified: userData.user.emailVerified,
          uid: userData.user.uid,
        })
      } else {
        dispatch({
          type: 'SIGN_IN_NO_NAME',
          emailId: userData.user.email,
          photoUrl: userData.user.photoURL,
          emailVerified: userData.user.emailVerified,
          uid: userData.user.uid,
        })
      }
    },

    signOut: async () => {
      await SignOutService()
      // await AsyncStorage.removeItem(STORAGE_SESSION_TOKEN)
      dispatch({ type: 'SIGN_OUT' })
    },

    signUp: () => {
      // TODO: Implement this function to be called directly from Signup Screen.
      // You can probably set the state for Signup to activate the After SignupScreen from here
      // OR log in the user directly after signup. Need to think a bit
      //  return b4aSignup(user, email, password)
      console.log(
        'DEBUG: Signup Called in Main. (Placeholder Function for Signup Dispatch when implememnted, Its called from Signup Screen',
      )
    },
    updateProfile: (profileObj) => {
      dispatch({
        type: 'UPDATE_PROFILE',
        emailId: profileObj.emailId,
        fullName: profileObj.displayName,
      })
    },

    // state: "state",
  }))

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackNavigator isLoggedIn={isLoggedIn} />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
