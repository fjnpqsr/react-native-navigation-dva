/**
 * @format
 */

import App from './app/index'
import { appName } from './app.json'
import { AppRegistry } from 'react-native'

AppRegistry.registerComponent(appName, () => App)

console.disableYellowBox = true
