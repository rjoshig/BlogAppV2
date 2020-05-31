import React, { useReducer, useEffect, useMemo } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import RootStackNavigator from '@navigations/RootStackNavigator'

import { AuthContext } from '@components/Context'
import SplashScreen from '@screens/SplashScreen'
import AsyncStorage from '@react-native-community/async-storage'

import { b4aSignup, b4aSignout, b4aGetCurrentUserFromToken } from '@services/parse.service'

const STORAGE_SESSION_TOKEN = 'sessionToken'

function authReducer(prevState, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        userName: action.username,
      }
    case 'NO_TOKEN':
      return {
        ...prevState,
        isLoading: false,
      }
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        userName: action.username,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      }
  }
}

// rjoshi: the isloading here is for the startup screen.. not the signin button
export default function Main() {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    userName: null,
  }

  // useREducer Hook
  const [state, dispatch] = useReducer(authReducer, initialState)

  console.log('DEBUG: Reducer State:', state)
  /*
  useEffect(() => {
    const bootstrapAsync = async () => {
      let user
      try {
        user = await AsyncStorage.getItem(USER)
      } catch (error) {
        console.log('DEBUG: Restoring token failed', error)
      }

      if (user) {
        const parsedUser = JSON.parse(user)
        dispatch({
          type: 'RESTORE_TOKEN',
          token: parsedUser.accessToken,
          username: parsedUser.username,
        })
      } else {
        dispatch({ type: 'NO_TOKEN' })
      }
    }

    bootstrapAsync()
  }, [])
*/
  useEffect(() => {
    const bootstrapAsync = async () => {
      // Restore Token from Storage
      try {
        const sessionTokenStorage = await AsyncStorage.getItem(STORAGE_SESSION_TOKEN)
        const userObj = await b4aGetCurrentUserFromToken(sessionTokenStorage)
        // const userObj = await Parse.User.me(sessionTokenStorage)
        const currentUser = userObj.currentUser
        const sessionToken = userObj.sessionToken

        console.log('bootstrap CurrentUser', currentUser, sessionToken)

        if (currentUser && sessionToken) {
          console.log('DISPATCH', currentUser, sessionToken)
          dispatch({
            type: 'RESTORE_TOKEN',
            username: currentUser,
            token: sessionToken,
          })
        } else {
          dispatch({ type: 'NO_TOKEN' })
        }
      } catch (error) {
        console.log('DEBUG: ERROR From Main.js (bootstrapAsync)', error)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = useMemo(() => ({
    signIn: async (username, sessionToken) => {
      // Use the logged in username and Session Token and save it in AsyncStorage
      // Dispatch correct state for App so that it takes it to Home page

      try {
        await AsyncStorage.setItem(STORAGE_SESSION_TOKEN, sessionToken)
      } catch (error) {
        console.log('DEBUG:ERROR FROM Main.js (signIn)', error)
      }

      dispatch({
        type: 'SIGN_IN',
        token: sessionToken,
        username: username,
      })
    },

    signOut: async () => {
      await b4aSignout()
      await AsyncStorage.removeItem(STORAGE_SESSION_TOKEN)
      dispatch({ type: 'SIGN_OUT' })
    },

    signUp: () => {
      // TODO: Implement this function to be called directly from Signup Screen.
      // You can probably set the state for Signup to activate the After SignupScreen from here
      // OR log in the user directly after signup. Need to think a bit
      //  return b4aSignup(username, email, password)
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
        <RootStackNavigator userToken={state.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
