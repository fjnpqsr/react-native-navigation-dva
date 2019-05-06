import { PermissionsAndroid } from 'react-native'

const loop = () => {}
export async function getPermission (string = '', success = loop, denied = loop) {
  if (!string) {
    return false
  }
  try {
    const hasAccessed = PermissionsAndroid.check(string)
    if (hasAccessed) {
      console.log(`已有权限${string}`)
      success()
      return false
    }
    const granted = await PermissionsAndroid.request(`android.permission.${string}`)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(`request permission ${string} succeed `)
      success()
    } else {
      console.log(`permission ${string} denied`)
      denied()
    }
  } catch (err) {
    console.warn(err)
  }
}

// export async function getPermissions (permissions = []) {
//   if (permissions.length === 0) {
//     return false
//   }
//   try {
//     const granted = await PermissionsAndroid.requestMultiple(permissions)
//     console.log({ granted })
//   } catch (err) {
//     console.warn(err)
//   }
// }
// getPermissions 函数并不会弹出授权弹窗 暂时不使用次功能
const Perssion = { getPermission }
export default Perssion
