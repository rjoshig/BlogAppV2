import React from 'react'
import logoImg from '../assets/images/logo.png'
import { View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Text } from 'react-native-paper'

export default function Logo() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.logocontainer}>
        <Image source={logoImg} style={styles.logoimage} />
        <Text style={styles.logotext}>REACT NATIVE</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  logocontainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  logoimage: {
    height: 80,
    width: 80,
  },
  logotext: {
    backgroundColor: 'transparent',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
  },
})
