/* eslint-disable react-native/no-color-literals */

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import React, { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'

import Main from './src/Main'
import ParseInit from '@services/parse.init'

// NOTE: REMOVE BELOW LINE IN PROD
// ;<script src="http://localhost:8097/"></script>

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00BFFF',
    accent: '#f1c40f',
  },
}
//    primary: '#3498db',

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
})

export default function App() {
  useEffect(() => {
    console.log('DEBUG: APP USE EFFECT: INIT PARSE')
    ParseInit()
    // rjoshi: This can be puit in MAin during Bootstrapping
  })

  return (
    <PaperProvider theme={theme}>
      <Main></Main>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#4F6D7A',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#F5FCFF',
    // color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcome: {
    color: '#F5FCFF',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
})

// #4F6D7A
// #F5FCFF
