import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../screens/ProfileScreen'

const ProfileStack = createStackNavigator()
export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  )
}
