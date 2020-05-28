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

export const SignupSection = () => {
  const theme = useTheme()
  return (
    <View style={styles.signupcontainer}>
      <TouchableOpacity onPress={() => console.log('Create Account Pressed')}>
        <Text style={{ color: theme.colors.primary }}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Forgot Password Pressed')}>
        <Text style={{ color: theme.colors.primary }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function SigninScreen() {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.signincontainer}>
      <Logo />
      <KeyboardAvoidi
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      ainer}>
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
            returnKeyType={'done'}
            secureTextEntry={true}
            value={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholder="Password"
            style={styles.textInput}
          />

          <View style={styles.buttonContainer}>
            {/* <Button style={({ color: theme.colors.primary }, styles.button)} title="Signin" onPress={() => null} /> */}

            <Button
              loading={false}
              theme={theme}
              style={({ color: theme.colors.primary }, styles.button)}
              // style={styles.button}
              // icon={({ color, size }) => <MaterialCommunityIcons name="account-plus" color={color} size={size} />}
              mode="contained"
              onPress={() => console.log('Sign in Pressed')}
            >
              Signin
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
      <SignupSection />
    </View>
  )
}

const styles = StyleSheet.create({
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

  signincontainer: {
    flex: 1,
  },

  signupcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 95,
    width: DEVICE_WIDTH,
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
