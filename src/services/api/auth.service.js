import axios from 'axios'
import { AUTH_API_URL } from '../../constants/api'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const signupAPI = (username, email, password) => {
  return axios.post(
    AUTH_API_URL + '/signup',
    {
      username,
      email,
      password,
    },
    config,
  )
}

// ASYNC STORAGE EXAMPLE
// _storeData = async () => {
//   try {
//     await AsyncStorage.setItem(
//       '@MySuperStore:key',
//       'I like to save it.'
//     );
//   } catch (error) {
//     // Error saving data
//   }
// };

const signinAPI = (username, password) => {
  return axios.post(AUTH_API_URL + '/signin', {
    username,
    password,
  })
}

const signoutAPI = () => {
  AsyncStorage.removeItem('user')
}

// const getCurrentUser = () => {
//   return AsyncStorage.getItem('user')
// }

export default {
  signinAPI,
  signupAPI,
  signoutAPI,
  //  getCurrentUser,
}
