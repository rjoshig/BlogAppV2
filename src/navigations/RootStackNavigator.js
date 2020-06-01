import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import LeftDrawerNavigator from '../navigations/LeftDrawerNavigator'
import AuthStackNavigator from '../navigations/AuthStackNavigator'

const RootStack = createStackNavigator()

export default function RootStackNavigator({ userToken }) {
  return (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
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
