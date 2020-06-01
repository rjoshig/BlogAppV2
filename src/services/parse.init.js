import { AsyncStorage } from 'react-native'
import { APPID, JAVASCRIPTKEY, SERVERURL } from 'react-native-dotenv'

const Parse = require('parse/react-native.js')

export default function ParseInit() {
  console.log('DEBUG: PARSE INIT')
  Parse.setAsyncStorage(AsyncStorage)
  Parse.initialize(APPID, JAVASCRIPTKEY)
  Parse.serverURL = SERVERURL
}
