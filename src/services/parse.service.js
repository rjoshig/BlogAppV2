// import { Parse } from 'parse/react-native'
import { AsyncStorage } from '@react-native-community/async-storage'

import { APPID, JAVASCRIPTKEY, SERVERURL } from 'react-native-dotenv'
const Parse = require('parse/react-native.js')

const Signup = (username, email, password) => {
  console.log('DEBUG: PARSE SIGNUP')
  Parse.User.logOut()
  const user = new Parse.User()
  user.set('username', username)
  user.set('email', email)
  user.set('password', password)
  return user.signUp()
}

const Signin = (username, password) => {
  console.log('DEBUG: PARSE SIGNIN')
  Parse.User.logOut()
  // const user = new Parse.User()
  return Parse.User.logIn(username, password)
}

export { Signup, Signin }

// #Password123

// let sessionToken = user.getSessionToken();
//
// AsyncStorage.setItem('sessionToken', result.getSessionToken());
// AsyncStorage.setItem('username', result.getUsername());
