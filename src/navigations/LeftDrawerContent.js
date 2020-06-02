import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthContext } from '../components/Context'
// Functions
// onPressProfile
// onPressBookmarks
// onPressNewPost

// Main Function

const ProtectedLeftDrawerContent = (props) => {
  const authContext = useContext(AuthContext)

  return (
    <View>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
          size={50}
        />
        <Title style={styles.title}>John Doe</Title>

        <TouchableRipple onPress={() => props.navigation.navigate('ProfileScreen')}>
          <Caption style={styles.caption}>{authContext.state.userName}</Caption>
        </TouchableRipple>

        <View style={styles.row}>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>202</Paragraph>
            <Caption style={styles.caption}>Posts</Caption>
          </View>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>159</Paragraph>
            <Caption style={styles.caption}>Comments</Caption>
          </View>
        </View>
      </View>

      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          )}
          label="Profile"
          onPress={() => props.navigation.navigate('ProfileScreen')}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="tune" color={color} size={size} />
          )}
          label="My Posts"
          onPress={() => props.navigation.navigate('MyPosts')}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="bookmark-outline" color={color} size={size} />
          )}
          label="Bookmarks"
          onPress={() => props.navigation.navigate('Bookmarks')}
        />
      </Drawer.Section>

      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="pencil-plus-outline" color={color} size={size} />
          )}
          label="New Post"
          onPress={() => props.navigation.navigate('NewPost')}
        />
      </Drawer.Section>

      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="settings" color={color} size={size} />
          )}
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
        />
      </Drawer.Section>
    </View>
  )
}

const PublicLeftDrawerContent = (props) => {
  return (
    <Drawer.Section style={styles.drawerSection}>
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="login" color={color} size={size} />
        )}
        label="Sign In"
        onPress={() => props.navigation.navigate('SigninScreen')}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="account-plus" color={color} size={size} />
        )}
        label="Sign Up"
        onPress={() => props.navigation.navigate('SignupScreen')}
      />
    </Drawer.Section>
  )
}

export default function LeftDrawerContent(props) {
  const authContext = useContext(AuthContext)

  const handleLogout = () => {
    authContext.signOut()
  }
  // const [isSignedIn, setisSignedIn] = useState(true)

  // rjoshi use redux for this later
  console.log('DEBUG: LeftDrawerContent: ')
  // NOTE:This is where  is signed in is defined

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {authContext.state.userName ? (
          <ProtectedLeftDrawerContent {...props} />
        ) : (
          <PublicLeftDrawerContent {...props} />
        )}

        <Drawer.Section title="App Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Logout"
            onPress={handleLogout}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  )
}

// Styles
const styles = StyleSheet.create({
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 15,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
})
