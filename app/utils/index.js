import { Dimensions } from 'react-native'
import { getPermission } from './getPermission'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
global.SCREENINFO = { screenWidth, screenHeight }

global.utils = {
  // android get users permission
  getPermission
  // getPermissions
}
