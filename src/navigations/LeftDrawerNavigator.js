import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'

import LeftDrawerContent from '../navigations/LeftDrawerContent'
// import BottomTabNavigator from '../navigations/BottomTabNavigator'
import ProfileStackNavigator from '../navigations/ProfileStackNavigator'
import MainStackNavigator from '../navigations/MainStackNavigator'
import SettingsScreen from '../screens/SettingsScreen'
const Drawer = createDrawerNavigator()

export default function LeftDrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <LeftDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="ProfileScreen1" component={ProfileStackNavigator} />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  )
}
