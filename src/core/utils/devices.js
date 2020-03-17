import DeviceInfo from 'react-native-device-info'

const DEVICES = global.DEVICES = {
  APILevel: DeviceInfo.getApiLevel(), // 获取API级别
  appName: DeviceInfo.getApplicationName(), // 获取应用程序名称
  brand: DeviceInfo.getBrand(), // 获取设备品牌
  buildNumber: DeviceInfo.getBuildNumber(), // 获取应用程序内部版本号
  carrier: DeviceInfo.getCarrier(), // 获取运营商名称（网络运营商）
  deviceId: DeviceInfo.getDeviceId(), // 设备ID
  uniqueId: DeviceInfo.getUniqueId(), // 设备ID
  userAgent: DeviceInfo.getUserAgent(), // 获取设备唯一ID
  lastUpdateTime: DeviceInfo.getLastUpdateTime(), // 上一次更新时间
  isEmulator: DeviceInfo.isEmulator(),
  isPinOrFingerprintSet: DeviceInfo.isPinOrFingerprintSet(),
  isTablet: DeviceInfo.isTablet(), // 判断是否是平板电脑
  innerVersion: DeviceInfo.getVersion(), // 判断是否是平板电脑
  isLandscape: DeviceInfo.isLandscape(), // 判断设备当前是否处于横向模式
  deviceType: DeviceInfo.getDeviceType(), // 判断设备当前是否处于横向模式
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  MacAddress: DeviceInfo.getMacAddress(),
  IpAddress: DeviceInfo.getIpAddress()
}

export default DEVICES
