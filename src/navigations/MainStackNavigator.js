import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from '@navigations/BottomTabNavigator'

import Feed from '@screens/Feed'
import HomeScreen from '@screens/HomeScreen'
import ProfileScreen from '@screens/ProfileScreen'
import Header from '@components/Header'
import Preferences from '@screens/Preferences'
import Bookmarks from '@screens/Bookmarks'
import SigninScreen from '@screens/AuthScreens/SigninScreen.firebase'
import SignupScreen from '@screens/AuthScreens/SignupScreen.firebase'
import MyPosts from '@screens/MyPosts'
import SettingsScreen from '@screens/SettingsScreen'

const Stack = createStackNavigator()

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: 'Home' }} /> */}
      <Stack.Screen name="Feed" component={Feed} options={{ headerTitle: 'Feed' }} />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <Stack.Screen
        name="Preferences"
        component={Preferences}
        options={{ headerTitle: 'Preferences' }}
      />
      <Stack.Screen name="Bookmarks" component={Bookmarks} options={{ headerTitle: 'Bookmarks' }} />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerTitle: 'Create New Account' }}
      />
      <Stack.Screen
        name="SigninScreen"
        component={SigninScreen}
        options={{ headerTitle: 'Signin' }}
      />
      <Stack.Screen name="MyPosts" component={MyPosts} options={{ headerTitle: 'My Posts' }} />
      <Stack.Screen name="NewPost" component={MyPosts} options={{ headerTitle: 'NewPost' }} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />

      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={({ route }) => {
          //    console.log('!@# options', { route })
          const routeName = route.state ? route.state.routes[route.state.index].name : 'Home'
          return { headerTitle: routeName }
        }}
      />
    </Stack.Navigator>
  )
}
