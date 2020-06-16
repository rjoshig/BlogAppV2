import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type Props = {
  onPress: () => any,
}

const DefaultModalContent: React.FC<Props> = (props) => (
  <View style={styles.content}>
    <Text style={styles.contentTitle}>Hi 👋!</Text>

    <Button testID={'close-button'} onPress={props.onPress} title="Close" />
  </View>
)

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    justifyContent: 'center',
    padding: 22,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
})

export default DefaultModalContent
