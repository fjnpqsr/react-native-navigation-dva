/**
 * @author Cator Vee  hi@catorv.com
 */
import React from 'react'
import { findNodeHandle, UIManager } from 'react-native'
import _shallowEqual from 'react-redux/es/utils/shallowEqual'

const OBJECT_PROTOTYPE = Object.prototype
const ARRAY_PROTOTYPE = Array.prototype
const EXP_TPL_TAG = /{(.+?)}/g
const HTML_ENTITIES = [
  '&', '&amp;',
  '<', '&lt;',
  '>', '&gt;',
  ' ', '&nbsp;',
  '\'', '&#39;',
  '"', '&quot;'
]

/** 空操作 */
export function noop () {}

/** 判断是否是字符串对象 */
export const isString = _checkType('string')
/** 判断是否是函数对象 */
export const isFunction = _checkType('function')
/** 判断是否是数组对象 */
export const isArray = Array.isArray
/** 判断是否是Object对象 */
export const isObject = _checkType('object')

/**
 * 判断是否是纯Object对象（判断条件相对isObject而言要更严格）
 * @param obj 被判断的对象
 * @returns {boolean}
 */
export function isPlainObject (obj) {
  const ctor = obj.constructor
  const prot = ctor.prototype
  return isObject(obj) && typeof ctor === 'function' &&
    isObject(prot) && prot.hasOwnProperty('isPrototypeOf')
}

/**
 * 判断是否是数值对象
 * @param obj 被判断的对象
 * @returns {boolean}
 */
export function isNumber (obj) {
  return getType(obj) === 'number' && !isNaN(obj)
}

/**
 * 判断是否是Promise对象
 * @param obj 被判断的对象
 * @returns {boolean}
 */
export function isPromise (obj) {
  return !!obj && (isObject(obj) || isFunction(obj)) && isFunction(obj.then)
}

/**
 * 判断是否是HTML节点
 * @param node 被判断的对象
 * @returns {boolean|ActiveX.IXMLDOMNodeType|number|string} 如果是HTML节点，返回非false值
 */
export function isHTMLElement (node) {
  return typeof node === 'object' && node !== null && node.nodeType && node.nodeName
}

/**
 * 判断变量是否已经定义
 * @param value 被判断的变量
 * @returns {boolean}
 */
export function isDefined (value) {
  return typeof value !== 'undefined'
}

/**
 * 将多个对象合并进目标对象中，如果最后一个参数的类型为布尔型，则用于指定是否使用后面的对象的
 * 字段值覆盖目标对象的同名字段。
 * @param target 目标对象
 * @returns {Object}
 */
export function mixin (target) {
  const args = arguments
  let len = args.length
  let i = 1
  let overwrite, source

  target = target || {}

  if (len > 1) {
    if (typeof args[len - 1] === 'boolean') {
      overwrite = args[--len]
    }

    while (i < len) {
      (source = args[i++]) && each(source, (value, name) => {
        if (isDefined(value) && (overwrite || !(name in target))) {
          target[name] = value
        }
      })
    }
  }

  return target
}

/**
 * 获取变量的类型
 * @param obj 查询类型的变量
 * @returns {string}
 */
export function getType (obj) {
  return OBJECT_PROTOTYPE.toString.call(obj).match(/\s(\w+)/)[1].toLowerCase()
}

/**
 * 生成 [min, max) 范围的随机整数
 * @param min 随机数的下限
 * @param max 随机数的上限，若改参数未指定，则生成 [0, min) 范围的随机整数
 * @returns {number}
 */
export function rand (min, max) {
  if (max === undefined) {
    max = min
    min = 0
  }
  return min + (Math.random() * (max - min)) | 0
}

/**
 * 类似Array.prototype.forEach，但对Object有效
 * @param obj 被遍历的对象
 * @param fn 遍历函数
 * @param context 遍历函数上下文对象
 */
export function each (obj, fn, context) {
  if (obj) {
    if (isArray(obj)) {
      ARRAY_PROTOTYPE.forEach.call(obj, fn, context | obj)
    } else {
      Object.keys(obj).forEach(key => {
        fn.call(context | obj, obj[key], key, obj)
      })
    }
  }
}

/**
 * 类似Array.prototype.map，但对Object有效
 * @param obj 被遍历的对象
 * @param fn 遍历函数
 * @param context 遍历函数上下文对象
 */
export function map (obj, fn, context) {
  if (obj) {
    if (isArray(obj)) {
      return ARRAY_PROTOTYPE.map.call(obj, fn, context | obj)
    }

    let result = {}
    each(obj, function (value, key, object) {
      result[key] = fn.call(context | obj, value, key, object)
    })
    return result
  }
}

/**
 * 字符串模板
 * @param template 模板
 * @param context 上下文
 * @param noMatched 模板变量无匹配值时的默认值，如果未指定，则变量占位符不被替换
 * @returns {string}
 */
export function tpl (template, context, noMatched) {
  return template.replace(EXP_TPL_TAG, function (matched, name) {
    const value = getObject(name, context)
    return value === undefined
      ? (noMatched === undefined ? matched : noMatched)
      : value
  })
}

/**
 * 编码HTML特殊字符串
 * @param html 需要编码的HTML字符串
 * @returns {string}
 */
export function htmlEncode (html) {
  return html.replace(/[&<>'"]/g, function (matched) {
    return HTML_ENTITIES[HTML_ENTITIES.indexOf(matched) + 1]
  })
}

/**
 * 解码HTML特殊字符串
 * @param html 需要解码的HTML字符串
 * @returns {string}
 */
export function htmlDecode (html) {
  return html.replace(/&(?:amp|lt|gt|nbsp|#39|quot);/g, function (matched) {
    return HTML_ENTITIES[HTML_ENTITIES.indexOf(matched) - 1]
  })
}

/**
 * 根据路径字符串获取对象值
 * @param path 路径字符串
 * @param context 上下文对象
 * @returns {Object}
 */
export function getObject (path, context) {
  const keys = path.split('.')
  const len = keys.length
  let i = 0
  let obj = context || global
  while (obj && i < len) {
    obj = obj[keys[i++]]
  }
  return obj
}

/**
 * 浅层判断对象是否相等
 * @param objA
 * @param objB
 * @param compare
 * @param compareContext
 * @returns {boolean}
 */
export const shallowEqual = _shallowEqual

/**
 * Determine whether the incoming component has been instantiated
 * @param target
 */
export function resolveComponent (target) {
  if (React.isValidElement(target)) {
    return () => target
  }
  return target
}

function _checkType (type) {
  return function (obj) {
    return getType(obj) === type
  }
}

// Extend Array Object
Array.from = (obj, mapFn, context) => {
  let array = ARRAY_PROTOTYPE.slice.call(obj)
  if (isFunction(mapFn)) {
    return array.map(mapFn, context)
  }
  return array
}
mixin(ARRAY_PROTOTYPE, {
  includes: function (searchElement, fromIndex) {
    fromIndex = fromIndex | 0
    return this.indexOf(searchElement, fromIndex) >= fromIndex
  },
  find: function (finderFn) {
    return this.filter(finderFn)[0]
  },
  remove: function (element) {
    let index = this.indexOf(element)
    if (index >= 0) {
      return this.splice(index, 1)[0]
    }
  }
})

// Extend String Object
mixin(String.prototype, {
  includes: function (search, start) {
    return this.indexOf(search, start | 0) !== -1
  }
})

// Extend Date Object
Date.WEEK_NAMES = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
Date.MONTH_NAMES = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'
]
mixin(Date.prototype, {
  format: function (format, fn) {
    const marks = {
      'y': this.getFullYear(), // 年份
      'm': this.getMonth() + 1, // 月份
      'M': Date.MONTH_NAMES[this.getMonth()], // 月份 名称
      'd': this.getDate(), // 日
      'h': this.getHours() % 12, // 小时 12小时制
      'H': this.getHours(), // 小时 24小时制
      'i': this.getMinutes(), // 分
      's': this.getSeconds(), // 秒
      'S': this.getMilliseconds(), // 毫秒
      'w': this.getDay(), // 星期
      'W': Date.WEEK_NAMES[this.getDay()] // 星期 名称
    }
    each(marks, function (value, mark) {
      if (new RegExp('(' + mark + '{1,4})').test(format)) {
        const matched = RegExp.$1
        const len = matched.length
        let val = '' + value
        if (len > 1 && len > val.length && mark !== 'M' && mark !== 'W') {
          val = ('000' + val).substring(val.length + 3 - len)
        }
        if (fn) {
          val = fn(mark, value, val)
        }
        format = format.replace(matched, val)
      }
    })
    return format
  }
})

/**
 * RN 获取某个节点 例如TEXT组件的宽高
 * @param ref 节点源
 * @returns {Promise<T | never>}
 */
export const getlayout = (ref) => {
  const handle = findNodeHandle(ref)
  return new Promise((resolve) => {
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      resolve({
        x,
        y,
        width,
        height,
        pageX,
        pageY
      })
    })
  }).then(data => data)
}

export default function () {}
