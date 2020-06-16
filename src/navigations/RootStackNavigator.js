import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import LeftDrawerNavigator from '@navigations/LeftDrawerNavigator'
import AuthStackNavigator from '@navigations/AuthStackNavigator'

const RootStack = createStackNavigator()

export default function RootStackNavigator({ isLoggedIn }) {
  console.log('DEBUG:: RootStackNavigator -> isLoggedin', isLoggedIn)

  return (
    <RootStack.Navigator headerMode="none">
      {isLoggedIn ? (
        <RootStack.Screen
          name="App"
          component={LeftDrawerNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  )
}
