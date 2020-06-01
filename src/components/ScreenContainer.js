import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function ScreenContainer({ children }) {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
