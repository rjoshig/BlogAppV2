import React, { useReducer, useEffect, useMemo } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import RootStackNavigator from '../src/navigations/RootStackNavigator'

import { AuthContext } from '../src/components/Context'
import SplashScreen from '../src/screens/SplashScreen'
import AsyncStorage from '@react-native-community/async-storage'

import AuthService from '../src/services/api/auth.service'

const USER = 'user'

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

  const authContext = useMemo(() => ({
    signIn: async (username, password) => {
      // Call Signin API Save it in AsyncStorage for use in App bootup
      return AuthService.signinAPI(username, password).then((result) => {
        if (result.data.accessToken) {
          console.log('DEBUG: RESPONSE DATA from MAIN', result.data.username)
          AsyncStorage.setItem(USER, JSON.stringify(result.data))

          dispatch({
            type: 'SIGN_IN',
            token: result.data.accessToken,
            username: result.data.username,
          })
        }
      })
    },

    signOut: () => {
      // NOTE: Delete Token from Storage as well
      AsyncStorage.removeItem(USER)
      dispatch({ type: 'SIGN_OUT' })
    },
    signUp: async (username, email, password) => {
      return AuthService.signupAPI(username, email, password)
    },
    state: state,
  }))

  if (state.isLoading) {
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
