import React, { useReducer, useEffect, useMemo } from 'react'

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
    case 'RESTORE_AUTH':
      return {
        ...prevState,
        isLoading: false,
        emailId: action.email,
        fullName: action.name,
        emailId: action.email,
        photoUrl: action.photourl,
        emailVerified: action.emailverified,
      }
    case 'NO_AUTH':
      return {
        ...prevState,
        isLoading: false,
        isLoggedIn: false,
      }
    case 'SIGN_IN':
      return {
        ...prevState,
        isLoggedIn: true,
        fullName: action.name,
        emailId: action.email,
        photoUrl: action.photourl,
        emailVerified: action.emailverified,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        isLoggedIn: false,
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
  }

  // useREducer Hook
  const [state, dispatch] = useReducer(authReducer, initialState)

  console.log('DEBUG: Reducer State:', state)

  useEffect(() => {
    const onAuthStateChanged = (user) => {
      if (user) {
        console.log('DEBUG:: onAuthStateChanged -> user', user)
        dispatch({
          type: 'RESTORE_AUTH',
          name: user.displayName,
          email: user.email,
          photourl: user.photoURL,
          emailverified: user.emailVerified,
        })
      } else {
        dispatch({
          type: 'NO_AUTH',
        })
      }
    }

    const userObj = auth().onAuthStateChanged(onAuthStateChanged)
    return userObj // unsubscribe on unmount
  }, [])

  const authContext = useMemo(() => ({
    signIn: (user) => {
      console.log('DEBUG:: Main -> user', user)
      // Use the logged in user and Session Token and save it in AsyncStorage
      // Dispatch correct state for App so that it takes it to Home page

      // try {
      //   await AsyncStorage.setItem(STORAGE_SESSION_TOKEN, sessionToken)
      // } catch (error) {
      //   console.log('DEBUG:ERROR FROM Main.js (signIn)', error)
      // }

      dispatch({
        type: 'SIGN_IN',
        fullName: user.displayName,
        emailId: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
      })
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
    state: state,
  }))

  if (state.isloading) {
    return <SplashScreen />
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackNavigator isLoggedIn={state.isLoggedIn} />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
