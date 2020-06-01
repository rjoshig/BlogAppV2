import { Parse } from 'parse/react-native'
// const Parse = require('parse/react-native.js')

const b4aSignup = (username, email, password) => {
  Parse.User.logOut() // rjoshi: This handles the invalid Token Error I think
  const user = new Parse.User()
  user.set('username', username)
  user.set('email', email)
  user.set('password', password)
  return user.signUp()
}

const b4aSignin = (username, password) => {
  Parse.User.logOut() // rjoshi: This handles the invalid Token Error I think
  return Parse.User.logIn(username, password)
}

const b4aSignout = () => {
  return Parse.User.logOut()
}

// This fuction getCurrentUser is probably not used .
// Since username is saved in the State in Main.js, it can be used from the state
const b4aGetCurrentUser = () => {
  Parse.User.currentAsync()
    .then((result) => {
      return result.getUsername()
    })
    .catch((err) => {
      console.log('DEBUG: ERROR From parse.service(getCurrentUser) ', err)
      return err
    })
}

const b4aGetCurrentUserFromToken = async (sessionTokenStorage) => {
  // return Parse.User.me(sessionTokenStorage)

  try {
    const userObj = await Parse.User.me(sessionTokenStorage)
    const currentUser = userObj.get('username')
    const sessionToken = userObj.get('sessionToken')

    return { currentUser, sessionToken }
  } catch (error) {
    console.log(error)
    console.log('DEBUG: ERROR From parse.service (b4aGetCurrentUserFromToken)', error)
    return null
  }
}

const b4aResetPassword = (email) => {
  console.log('PARSE AUTH RESET')
  return Parse.User.requestPasswordReset(email)
}

export {
  b4aSignup,
  b4aSignin,
  b4aSignout,
  b4aGetCurrentUser,
  b4aGetCurrentUserFromToken,
  b4aResetPassword,
}
