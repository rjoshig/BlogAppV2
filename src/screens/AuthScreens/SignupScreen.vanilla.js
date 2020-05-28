/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import {
  TextInput,
  Platform,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native'

import { DEVICE_WIDTH } from '../../utilities/Dimensions'
import { Button, useTheme, Text } from 'react-native-paper'
import Logo from '../../components/Logo'

import { useHeaderHeight } from '@react-navigation/stack'
import { ScrollView } from 'react-native-gesture-handler'

import AuthService from '../../services/api/auth.service'


AuthService.register(username, email, password).then(
  (response) => {
    setMessage(response.data.message)
    setSuccessful(true)
  },
  (error) => {
    const resMessage =
      (error.response && error.response.data && error.respon
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      (resMessage)
    setSuccessful(false)
  },
)



export default function SignupScreen() {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  return (
    <ScrollView style={styles.Signupcontainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <Logo />
        <View style={styles.inner}>
          {/* <Text style={styles.header1}>Header</Text> */}
          {/* <Logo /> */}
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            returnKeyType={'done'} // can be made next as well
            value={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholder="Username"
            style={styles.textInput}
          />
          <TextInput
            returnKeyType={'next'}
            secureTextEntry={true}
            value={password1}
            onChangeText={(userPassword) => setPassword1(userPassword)}
            placeholder="Password"
            style={styles.textInput}
          />
          <TextInput
            returnKeyType={'done'}
            secureTextEntry={true}
            value={password2}
            onChangeText={(userPassword) => setPassword2(userPassword)}
            placeholder="Password"
            style={styles.textInput}
          />
          <View style={styles.buttonContainer}>
            {/* <Button style={({ color: theme.colors.primary }, styles.button)} title="Signup" onPress={() => null} /> */}

            <Button
              loading={false}
              theme={theme}
              style={({ color: theme.colors.primary }, styles.button)}
              // style={styles.button}
              // icon={({ color, size }) => <MaterialCommunityIcons name="account-plus" color={color} size={size} />}
              mode="contained"
              onPress={() => console.log('Sign in Pressed')}
            >
              Signup
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Signupcontainer: {
    flex: 1,
  },

  button: {
    alignItems: 'center',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
    width: DEVICE_WIDTH / 2.5,
    zIndex: 200,
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },

  container: {
    flex: 1,
  },

  inner: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 36,
  },

  textInput: {
    backgroundColor: '#3498db',
    // borderBottomWidth: 1,
    // borderColor: '#000000',
    borderRadius: 30,
    // borderWidth: 1,
    height: 50,
    marginBottom: 36,
    paddingLeft: 24,
    width: DEVICE_WIDTH - 80,
  },
})
