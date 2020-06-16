import React, { useContext, useState } from 'react'
import { Button, StyleSheet, TextInput, Text, View } from 'react-native'
import { DEVICE_WIDTH } from '@utilities/Dimensions'
import { AuthContext, ProfileContext } from '@components/Context'

export default function ProfileUpdateModalContent(props) {
  const profileContext = useContext(ProfileContext)
  const authContext = useContext(AuthContext)
  const [aboutme, setAboutMe] = useState(AuthContext)
  console.log('DEBUG:: ProfileUpdateModalContent -> profileContext', profileContext)

  return (
    <View style={styles.modalContent}>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{authContext.state.fullName}</Text>

          <Text style={styles.info}>{authContext.state.emailId}</Text>
          <Text style={styles.about}>About Me</Text>

          <TextInput
            multiline
            numberOfLines={4}
            maxLength={200}
            value={aboutme}
            onChangeText={(aboutme) => setAboutMe(aboutme)}
            style={styles.textInput}
          />
          {/* 
          <Text style={styles.description}>{aboutme}
          </Text>
 */}
        </View>
      </View>

      <Button onPress={props.onPress} title="Cancel" />
    </View>
  )
}

const styles = StyleSheet.create({
  about: {
    color: '#00BFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  body: {
    marginTop: 10,
  },
  bodyContent: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  contentTitle: {
    fontSize: 20,
  },
  description: {
    borderWidth: 1,
    color: '#696969',
    fontSize: 16,
    height: 50,
    marginTop: 10,
  },

  header: {
    backgroundColor: '#00BFFF',
    height: 150,
  },
  info: {
    borderWidth: 1,
    color: '#00BFFF',
    fontSize: 16,
    marginTop: 5,
  },
  modalContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
  name: {
    // color: '#696969',
    borderWidth: 1,
    color: '#00BFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInput: {
    borderWidth: 1,
    // borderColor: '#000000',
    // borderWidth: 1,

    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: DEVICE_WIDTH - 80,
    height: 150,
  },
})
