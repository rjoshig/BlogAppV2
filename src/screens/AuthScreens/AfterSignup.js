import * as React from 'react'
import { Text, View, Button } from 'react-native'

export default function AfterSignup({ route, navigation }) {
  const message = route.params
  console.log(route)

  const goToSignin = () => {
    navigation.navigate('SigninScreen')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>After SignupScreen</Text>
      <Text>{message}</Text>
      <Button
        title="Go to Sign in"
        onPress={goToSignin}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
      />
    </View>
  )
}
