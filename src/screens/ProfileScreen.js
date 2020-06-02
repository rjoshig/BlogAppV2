/* eslint-disable react-native/no-inline-styles */
// import * as React from 'react'
// import { Text, View } from 'react-native'

// export default function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile Screen</Text>
//     </View>
//   )
// }

import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper'

import { AuthContext } from '@components/Context'
import { DEVICE_WIDTH } from '@utilities/Dimensions'
import { b4aGetUserInfo } from '@services/parse//ParseQuery.service'

export default function ProfileScreen() {
  const theme = useTheme()
  const authContext = useContext(AuthContext)
  // const [name, setName] = useState('John Doe')

  // if (authContext.state.userName) {
  //   setName(authContext.state.userName)
  // }
  // ! TEST CALL
  b4aGetUserInfo(authContext.state.userName)

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <Avatar.Image
        style={styles.avatar}
        source={require('@assets/images/avatar1.png')}
        size={150}
      />
      {/* 
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
        }}
      /> */}
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{authContext.state.fullName}</Text>
          <Text style={styles.info}>@{authContext.state.userName}</Text>
          <Text style={styles.info}>email@example.com</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
            omittam deseruisse consequuntur ius an, Lorem ipsum dolor sit amet, saepe sapientem eu
            name
          </Text>

          <View style={styles.touchable}>
            <TouchableOpacity onPress={() => console.log('Update Profile Pressed')}>
              <Text style={{ color: theme.colors.primary }}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Change Password Pressed')}>
              <Text style={{ color: theme.colors.primary }}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    // borderColor: 'white',
    // // borderRadius: 63,
    // borderWidth: 4,
    // height: 130,
    // marginBottom: 10,
    // marginTop: 130,
    position: 'absolute',
    // width: 130,
  },
  body: {
    marginTop: 10,
  },
  bodyContent: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    width: 250,
  },

  touchable: {
    alignItems: 'center',
    // backgroundColor: '#00BFFF',
    // borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 20,
    width: DEVICE_WIDTH,
  },

  description: {
    color: '#696969',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 150,
  },
  info: {
    color: '#00BFFF',
    fontSize: 16,
    marginTop: 5,
  },
  // name: {
  //   color: '#FFFFFF',
  //   fontSize: 22,
  //   fontWeight: '600',
  // },
  name: {
    color: '#696969',
    fontSize: 28,
    fontWeight: '600',
  },
})
