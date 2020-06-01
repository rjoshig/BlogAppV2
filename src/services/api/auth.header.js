import AsyncStorage from '@react-native-community/async-storage'

export default function authHeader() {
  const user = AsyncStorage.getItem('user')

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken }
  } else {
    return {}
  }
}
