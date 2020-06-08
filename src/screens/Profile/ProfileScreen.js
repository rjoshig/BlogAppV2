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

import React, { useContext, useState, useMemo, useEffect } from 'react'
import {
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { DEVICE_WIDTH } from '@utilities/Dimensions'
import {
  useTheme,
  Avatar,
  Divider,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Modal from 'react-native-modal'

import { AuthContext, ProfileContext } from '@components/Context'

import NewPasswordForm from '@screens/Profile/NewPasswordForm'

import ReAuthenticateForm from '@screens/Profile/ReAuthenticateForm'

export default function ProfileScreen() {
  // ! PUll Initial value this from Database later
  const initialValAboutMe =
    'Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis  omittam deseruisse consequuntur ius an, Lorem ipsum dolor sit amet, saepe sapientem eu name'

  // Get this from authContext authContext.state.fullName
  // When update, create a function in authContext (inside useMemo that will update the global state)
  // const initialValDisplayName = 'Jon Doo'

  const theme = useTheme()
  const authContext = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isReAuthenticateFormVisible, setIsReAuthenticateFormVisible] = useState(false)
  const [isNewPasswordFormVisible, setIsNewPasswordFormVisible] = useState(false)

  const [isEdit, setIsEdit] = useState(false)
  const [isEditDisplayName, setIsEditDisplayName] = useState(false)
  const [isEditAboutMe, setIsEditAboutMe] = useState(false)
  const [isChangePasswordSuccessToastVisible, setIChangePasswordSuccessToastVisible] = useState(
    false,
  )

  // Display Name (Tmp is for edit functions

  // Tmp = Initial State
  // When Changed, Tmp is changed, display remains the same
  // When User click Cancel (udate Tmp with Display name)
  // When user click Save Update displaayNm with Tmp

  const [displayName, setDisplayName] = useState(authContext.state.fullName)
  const [displayNameEdit, setDisplayNameEdit] = useState(displayName)
  const [email, setEmail] = useState(authContext.state.emailId)
  const [emailEdit, setEmailEdit] = useState(email)
  const [aboutMe, setAboutMe] = useState(initialValAboutMe)
  const [aboutMeEdit, setAboutMeEdit] = useState(aboutMe)

  console.log('DEBUG:: ProfileScreen -> displayName', displayName, displayNameEdit, email, aboutMe)

  // * aboutMe = Local State
  // * displayName = Globval state

  // const profileContext = { modalVisible }
  // const [name, setName] = useState('John Doe')

  // if (authContext.state.userName) {
  //   setName(authContext.state.userName)
  // }
  // ! START FROM HERE DEFINETHIS AS OBJECT AND THEN USE IT IN MODAL CONTENT,
  // !INCLUDE EMAILAND DISPLAY NM

  const profileContext = useMemo(() => ({
    onReAuthenticateCancel: () => {
      setIsReAuthenticateFormVisible(false)
      setIsModalVisible(false)
    },

    onReAuthenticateNext: () => {
      //   setIsModalVisible(true)
      setIsReAuthenticateFormVisible(false)
      setIsNewPasswordFormVisible(true)
    },

    onChangePasswordSuccess: () => {
      setIsNewPasswordFormVisible(false)
      setIsModalVisible(false)
    },
    onChangePasswordCancel: () => {
      setIsNewPasswordFormVisible(false)
      setIsModalVisible(false)
    },
  }))

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleEditDisplayName = () => {
    setIsEditDisplayName(!isEditDisplayName)
  }

  const handleEditAboutMe = () => {
    setIsEditAboutMe(!isEditAboutMe)
  }

  const handleSaveUpdate = () => {
    // Call Firebase Update Query here directly. ? NOT NECESSSART TO GO THROUGH MAIN BECAUSE THE STATE IS  IN SYNC
    // aLSO UPDATE gLOBAL state IN Main FOR fullName
    // setIsEditAboutMe(!isEditAboutMe)
    // Update Global State and It should re-render everything. May not need to update Local State below

    // const profileObj = {
    //   displayName: displayName,
    //   emailId: email,
    // }
    // authContext.updateProfile(profileObj)

    setDisplayName(displayNameEdit)
    setEmail(emailEdit)
    setAboutMe(aboutMeEdit)
    setIsEdit(false)
  }

  const handleCancelUpdate = () => {
    // reset to Global State since its not updated
    // setDisplayName(authContext.state.fullName)
    setDisplayNameEdit(displayName)
    setEmailEdit(email)
    setAboutMeEdit(aboutMe)
    setIsEdit(false)
  }

  const handleChangePassword = () => {
    setIsModalVisible(true)
    setIsReAuthenticateFormVisible(true)
  }

  // ! TODO: Create a Warapper for Profile Screen
  // ! Put COndition ion isEdit (use View if isEdit is false and Scrollview if isEdit is True)
  // ! something like { isEdit ? (<View> COMPONENT HERE </View>) : (<ScrollView> COMPONENT HERE </ScrollView>)}
  // ? Probably not needed since Profile view will be fixed view anyway
  return (
    <ProfileContext.Provider value={profileContext}>
      <ScrollView>
        <Modal
          backdropColor="#FFF"
          isVisible={isReAuthenticateFormVisible}
          // onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal} // Called when the Android back button is pressed
          swipeDirection={['down']}
          // animationOut="slideOutDown"
          coverScreen={true}
          backdropOpacity={0.96} // This gives the Opacity
          // style={styles.modalView}
          animationIn="slideInRight" // slideInLeft
          animationOut="slideOutLeft" // slideOutRight
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          animationInTiming={1000}
          animationOutTiming={1000}
        >
          <ReAuthenticateForm />
        </Modal>

        <Modal
          backdropColor="#FFF"
          isVisible={isNewPasswordFormVisible}
          // onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal} // Called when the Android back button is pressed
          swipeDirection={['down']}
          // animationOut="slideOutDown"
          coverScreen={true}
          backdropOpacity={0.96} // This gives the Opacity
          // style={styles.modalView}
          // animationIn="zoomInDown"
          // animationOut="zoomOutUp"
          animationIn="slideInRight" // slideInLeft
          animationOut="slideOutLeft" // slideOutRight
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          animationInTiming={1000}
          animationOutTiming={1000}
        >
          <NewPasswordForm />
        </Modal>

        <View style={styles.container}>
          <View style={styles.header}></View>

          <Avatar.Image
            style={styles.avatar}
            source={require('@assets/images/avatar1.png')}
            size={150}
          />

          {/* 
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
        }}
      /> */}
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              {isEdit ? (
                <TextInput
                  value={displayNameEdit}
                  onChangeText={(displayNameEdit) => setDisplayNameEdit(displayNameEdit)}
                  style={styles.textName}
                />
              ) : (
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{displayName}</Text>
                  {/* {isEdit ? (
                    <TouchableOpacity onPress={handleEditDisplayName}>
                      <MaterialCommunityIcons
                        style={{ padding: 10 }}
                        name="account-edit"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : null} */}
                </View>
              )}

              {isEdit ? (
                <TextInput
                  value={emailEdit}
                  keyboardType="email-address"
                  autoCorrect={false}
                  onChangeText={(emailEdit) => setEmailEdit(emailEdit)}
                  style={styles.textEmail}
                />
              ) : (
                <Text style={styles.info}>{email}</Text>
              )}
              <Text style={styles.about}>About me</Text>
              {isEdit ? (
                <TextInput
                  multiline
                  numberOfLines={4}
                  maxLength={300}
                  value={aboutMeEdit}
                  onChangeText={(aboutMeEdit) => setAboutMeEdit(aboutMeEdit)}
                  // style={styles.textInput}
                />
              ) : (
                <View>
                  <Text style={styles.description}>{aboutMe}</Text>
                  {/* {isEdit ? (
                    <TouchableOpacity onPress={handleEditAboutMe}>
                      <MaterialCommunityIcons
                        style={{ padding: 10 }}
                        name="account-edit"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  ) : null} */}
                </View>
              )}
              {isEdit ? (
                <View style={styles.touchable}>
                  <TouchableOpacity onPress={handleSaveUpdate}>
                    <Text style={{ color: theme.colors.primary }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancelUpdate}>
                    <Text style={{ color: theme.colors.primary }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.touchable}>
                  <TouchableOpacity onPress={handleEdit}>
                    <Text style={{ color: theme.colors.primary }}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleChangePassword}>
                    <Text style={{ color: theme.colors.primary }}>Change Password </Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
                  <Text style={{ color: theme.colors.primary }}>Change Password </Text>
                </TouchableOpacity> */}
              {/* 
            <TouchableOpa
            nPress={() => consolesetModalVisible(true)d')     <Tyle={{ color: theme.colors.primary }}>Change Pass</TouchableHighlight>leOpacity>
           */}
            </View>
          </View>
        </View>
      </ScrollView>
    </ProfileContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
    // borderColor: 'white',
    // // borderRadius: 63,
    // borderWidth: 4,
    // height: 130,
    // marginBottom: 10,
    // marginTop: 130,
    position: 'absolute',
    // width: 130,
  },
  body: {
    marginTop: 10,
  },
  bodyContent: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
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

  touchable: {
    alignItems: 'center',
    // backgroundColor: '#00BFFF',
    // borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 20,
    width: DEVICE_WIDTH,
  },
  textInput: {
    borderWidth: 1,
    // borderColor: '#000000',
    borderWidth: 1,
    // backgroundColor: '#dcdcdc',
    // borderBottomColor: '#dcdcdc',
    //  borderBottomWidth: 1,
    width: DEVICE_WIDTH - 80,
    height: 100,
  },
  textName: {
    //  borderWidth: 1,
    // borderColor: '#000000',
    // borderWidth: 1,
    // backgroundColor: '#dcdcdc',
    borderBottomWidth: 1,
    color: '#00BFFF',
    width: DEVICE_WIDTH - 180,
    fontSize: 24,
    fontWeight: '600',
    // borderBottomColor: '#dcdcdc',
    // borderBottomWidth: 1,
    // width: DEVICE_WIDTH - 80,
  },

  textEmail: {
    //  borderWidth: 1,
    // borderColor: '#000000',
    // borderWidth: 1,
    // backgroundColor: '#dcdcdc',
    borderBottomWidth: 1,
    color: '#00BFFF',
    width: DEVICE_WIDTH - 150,
    // borderBottomColor: '#dcdcdc',
    // borderBottomWidth: 1,
    // width: DEVICE_WIDTH - 80,
  },
  description: {
    color: '#696969',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 150,
  },
  info: {
    color: '#00BFFF',
    fontSize: 16,
    marginTop: 5,
  },
  about: {
    color: '#00BFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },

  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  name: {
    color: '#00BFFF',
    fontSize: 28,
    fontWeight: '600',
  },

  nameEdit: {
    color: '#00BFFF',
    fontSize: 28,
    fontWeight: '600',
  },

  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  // modalView: {
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   elevation: 5,
  //   margin: 20,
  //   padding: 35,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  // },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})
