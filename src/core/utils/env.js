/**
 * @author Cator Vee  hi@catorv.com
 */
// import storage from '../data/storage'
import { mixin, guid } from './tools'

import storage from './storage'

const msPointerEnabled = window.navigator.msPointerEnabled
const userAgent = navigator.userAgent

// n: name, g: group, r: regexp, x: options, v: force version
const platforms = [
  // Android 2 - 4
  { n: 'android', g: 0, r: /Android (\d+(?:\.\d+)?)/ },
  // iOS 3 - 7 / iPhone
  { n: 'ios', g: 0, r: /iPhone OS (\d+)/, x: { iphone: true } },
  // iOS 3 - 7 / iPad
  { n: 'ios', g: 0, r: /iPad;(?: U;)? CPU OS (\d+)/, x: { ipad: true } },
  // Windows Phone 7 - 8
  { n: 'wpos', g: 0, r: /Windows Phone (?:OS )?(\d+)[.\d]+/ },

  // Safari
  { n: 'safari', g: 1, r: /Version\/(\d+)[.\d]+.+Safari/ },
  // Chrome on iOS
  { n: 'chrome', g: 1, r: /CriOS\/(\d+)[.\d]+.+Safari+/ },
  // Chrome
  { n: 'chrome', g: 1, r: /Chrome\/(\d+)[.\d]+/ },
  // IE 8 - 10
  { n: 'ie', g: 1, r: /MSIE (\d+)/ },
  // IE 11
  { n: 'ie', g: 1, r: /Trident\/.*; rv:(\d+)/ },
  // desktop Firefox
  { n: 'firefox', g: 1, r: /Firefox\/(\d+)/ },

  // Wechat
  { n: 'wechat', g: 2, r: /MicroMessenger\/(\d+(?:\.\d+)?)/ },
  // Alipay
  { n: 'alipay', g: 2, r: /AlipayClient\/(\d+(?:\.\d+)?)/ }
]

const env = {
  dev: false,
  touch: (('ontouchstart' in window) || msPointerEnabled),
  gesture: (('ongesturestart' in window) || msPointerEnabled),
  online: navigator.onLine,
  clientId: storage.get('client-id'),
  screen: {
    pixelRatio: window.devicePixelRatio || 1
  }
}

let status = [0, 0, 0] // [os, browser, other]
let i = 0
let item, matches

while ((item = platforms[i++])) {
  if (!status[item.g] && (matches = item.r.exec(userAgent))) {
    status[item.g] = env[item.n] = item.v || matches[1]
    if (item.x) {
      mixin(env, item.x)
    }
  }
}

env.mobile = !!(status[0])

if (!env.clientId) {
  env.clientId = guid()
  storage.set('client-id', env.clientId)
}

export default env
