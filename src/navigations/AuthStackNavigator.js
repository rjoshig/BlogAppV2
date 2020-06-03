import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SigninScreen from '../screens/AuthScreens/SigninScreen.firebase'
import SignupScreen from '../screens/AuthScreens/SignupScreen.firebase'
import AfterSignup from '../screens/AuthScreens/AfterSignup'
import ResetPassword from '../screens/AuthScreens/ResetPasswordScreen'

const AuthStack = createStackNavigator()

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{ title: 'Sign In' }}
      />
      <AuthStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ title: 'Create Account' }}
      />
      <AuthStack.Screen
        name="AfterSignup"
        component={AfterSignup}
        // options={{ title: 'Congratulations' }}
      />

      <AuthStack.Screen
        name="ResetPasswordScreen"
        component={ResetPassword}
        options={{ title: 'Reset Password' }}
      />
    </AuthStack.Navigator>
  )
}
