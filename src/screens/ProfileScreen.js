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

import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { AuthContext } from '../components/Context'

export default function ProfileScreen() {
  const authContext = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.info}>@{authContext.state.userName}</Text>
          <Text style={styles.info}>UX Designer / Mobile developer</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis,
            omittam deseruisse consequuntur ius an,
          </Text>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    borderColor: 'white',
    borderRadius: 63,
    borderWidth: 4,
    height: 130,
    marginBottom: 10,
    marginTop: 130,
    position: 'absolute',
    width: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    alignItems: 'center',
    flex: 1,
    padding: 30,
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
  description: {
    color: '#696969',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  info: {
    color: '#00BFFF',
    fontSize: 16,
    marginTop: 10,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
  name: {
    color: '#696969',
    fontSize: 28,
    fontWeight: '600',
  },
})
