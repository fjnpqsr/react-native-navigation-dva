/**
 * @author Cator Vee  hi@catorv.com
 */

/**
 * 全局唯一标识符
 * @returns {string}
 */
export function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const rand = Math.random() * 16 | 0
    const value = c === 'x' ? rand : (rand & 0x3 | 0x8)
    return value.toString(16)
  })
}

let runtimeUniqueId = 1

/**
 * 运行时唯一标识符
 * @param element DOM元素，如果指定，则根据该元素生成唯一标识符，并设置成为该元素的id属性
 * @returns {string}
 */
export function ruid (element) {
  if (element) {
    return element.id || (element.id = ruid())
  } else {
    return '__id_' + runtimeUniqueId++
  }
}

export default function () {}
