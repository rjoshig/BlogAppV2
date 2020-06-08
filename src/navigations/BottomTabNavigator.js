import React from 'react'
import color from 'color'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { useTheme, Portal, FAB } from 'react-native-paper'
import { useSafeArea } from 'react-native-safe-area-context'
import { useIsFocused, RouteProp } from '@react-navigation/native'

import HomeScreen from '../screens/HomeScreen'
import Feed from '../screens/Feed'
import Header from '../components/Header'
import Preferences from '../screens/Preferences'
import Bookmarks from '../screens/Bookmarks'

import Overlay from '../components/Overlay'
import Messages from '../screens/Messages'
import Notifications from '../screens/Notifications'

const Tab = createMaterialBottomTabNavigator()

export default function BottomTabNavigator(props) {
  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : 'Feed'

  const theme = useTheme()
  // console.log(theme)
  const safeArea = useSafeArea()
  const isFocused = useIsFocused()

  let icon = 'feather'

  switch (routeName) {
    case 'Messages':
      icon = 'email-plus-outline'
      break
    default:
      icon = 'feather'
      break
  }
  const tabBarColor = theme.dark ? Overlay(6, theme.colors.surface) : theme.colors.surface

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: 'home-account',
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: 'bell-outline',
            tabBarColor,
          }}
        />

        <Tab.Screen
          name="Comments"
          component={Messages}
          options={{
            tabBarIcon: 'comment-eye-outline',
            tabBarColor,
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: 'absolute',
            bottom: safeArea.bottom + 65,
            right: 16,
          }}
          color="white"
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          onPress={() => {}}
        />
      </Portal>
    </React.Fragment>
  )
}
