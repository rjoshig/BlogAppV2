import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { PROFILE_TBL } from '@constants/databaseConstants.js'
// const usersRef = database().ref('users')

// firebaseRef.child('users').child(user.uid).once('value', callback)

const SignUpService2 = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

const SignUpService = async (email, password) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then((authData) => {
      console.log('DEBUG:: authData', authData)
      console.log('DEBUG:: authData22222222222', authData.user.uid)

      const usersData = {}

      usersData.displayName = authData.user.displayName // ? Not needed since at this point Display name is not set yet
      usersData.email = email.toLowerCase()
      usersData.aboutme = '' // ? Not needed since at this point Display name is not set yet

      database()
        .ref('users/' + authData.user.uid)
        .set(usersData)
        .then((result) => {
          console.log('DEBUG:: result', result)
        })
    })
}

const SignInService = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

const SignOutService = () => {
  return auth().signOut()
}

const ReauthenticateWithCredentialService = (currentpassword) => {
  const user = auth().currentUser // ? Can I pass current User from Global State ??  // TRY
  // console.log('DEBUG:: ReauthenticateWithCredentialService -> user.email', user.email)

  // const cred = { user.email, currentpassword }
  const cred = auth.EmailAuthProvider.credential(user.email, currentpassword)

  console.log('DEBUG:: ReauthenticateWithCredentialService -> cred', cred)
  // console.log('DEBUG:: 11ReauthenticateWithCredentialService -> cred', cred)

  return user.reauthenticateWithCredential(cred)
}

const ChangePasswordService = (newPassword) => {
  const user = auth().currentUser // ? Can I pass current User from Global State ??
  console.log('DEBUG:: ChangePasswordService -> user', user)

  return user.updatePassword(newPassword)
}

export {
  SignInService,
  SignUpService,
  SignOutService,
  ChangePasswordService,
  ReauthenticateWithCredentialService,
  SignUpService2,
}
