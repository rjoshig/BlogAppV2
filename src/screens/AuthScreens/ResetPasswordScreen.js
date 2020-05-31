import * as React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default function ResetPassword({ route, navigation }) {
  const message = route.params

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
      <Text>Reset Password Screen </Text>
      {/* <Text>{message}</Text> */}
      <Button
        title="Go Back"
        onPress={goBack}
        titleStyle={{
          color: '#F57C00',
        }}
        type="clear"
      />
      {/* </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 25,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
})
