
import { each, map, mixin, isString, qs, Storage, log } from '../utils'
import DEVICES from './utils/devices'
import { Platform } from 'react-native'

const events = {
  request: [],
  response: [],
  rawResponse: [],
  error: []
}
let id = 1

const api = {
  generate (config) {
    return generateMethods(config)
  },
  addEventListener (name, listener) {
    events[name].remove(listener)
    events[name].push(listener)
  },
  removeEventListener (name, listener) {
    if (!listener) {
      events[name] = []
    } else {
      events[name].remove(listener)
    }
  },
  handleError: defaultErrorHandler
}

function Event (type, data) {
  mixin(this, { type, preventDefault }, data)
}

function dispatchEvent (event) {
  events[event.type].forEach(handler => {
    handler(event)
  })
  if (event.type === 'error') {
    setTimeout(function () {
      if (!event._preventDefault) {
        api.handleError(event)
      }
    }, 1)
  }
}

function preventDefault () {
  this._preventDefault = true
}

function ApiError (code, message) {
  this.isApiError = true
  this.code = code | 0
  this.message = message
}

function HttpError (response) {
  this.isHttpError = true
  this.code = response.status
  this.response = response
  this.message = response.status + ' ' + response.statusText
}

function doMethod (method, url, headers, path) {
  return function retry (params, options = {}) {
    const currentId = id++
    const origParams = { ...params }

    let destUrl = url
    if (url.indexOf('http') < 0) {
      destUrl = GLOBAL.host ? GLOBAL.host + url : url
    }

    each(params, (value, key) => {
      let placeholder = '{' + key + '}'
      if (destUrl.includes(placeholder)) {
        destUrl = destUrl.replace(placeholder, value)
        delete params[key]
      }
    })
    options.method = method

    options.headers = mixin(options.headers, headers)
    if (GLOBAL.XTOKEN && url.indexOf('login') < 0) {
      options.headers['X-Token'] = GLOBAL.XTOKEN
    }
    options.headers['X-Client-Id'] = DEVICES.uniqueId
    options.headers['X-Version'] = DEVICES.innerVersion
    let _ua = ''
    switch (Platform.OS) {
      case 'android':
        _ua = 'android'
        break
      case 'ios':
        _ua = 'iphone'
    }
    options.headers['User-Agent'] = options.headers['User-Agent'] || '' + ' ' + _ua
    // config cookie for request
    options.credentials = 'include'

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      switch (options.headers['Content-Type']) {
        case 'application/json':
          options.body = window.JSON.stringify(params)
          break
        default: // application/x-www-form-urlencoded
          options.body = qs(params)
      }
    } else if (params) {
      destUrl += qs(params, !destUrl.includes('?') ? '?' : '')
    }

    dispatchEvent(new Event('request', {
      id: currentId,
      url: destUrl,
      options,
      path
    }))
    return fetch(destUrl, options).then(function (response) {
      dispatchEvent(new Event('rawResponse', {
        id: currentId,
        url: destUrl,
        options,
        path,
        response
      }))
      const status = response.status
      if (status >= 200 && status < 300) {
        let token = response.headers.get('X-Token')
        if (token) {
          GLOBAL.XTOKEN = token
          Storage.set('XTOKEN', token)
        }
        let contentType = response.headers.get('Content-Type')
        if (!contentType) {
          return response.text()
        }
        let pos = contentType.indexOf(';')
        if (pos >= 0) {
          contentType = contentType.substring(0, pos)
        }
        return response.text().then(text => {
          try {
            switch (contentType.trim().toLowerCase()) {
              case 'application/json':
                return window.JSON.parse(text)
              default:
              // nothing
            }
          } catch (e) {
            // nothing
          }
          return text
        })
      }
      if (status === 800) {
        return response.text().then(text => {
          let code = response.headers.get('X-Code')
          throw new ApiError(code, text)
        })
      }
      throw new HttpError(response)
    }).then(data => {
      dispatchEvent(new Event('response', {
        id: currentId,
        url: destUrl,
        options,
        path,
        data
      }))
      return data
    }).catch(error => {
      error.retry = () => retry({ ...origParams, retried: true }, options)
      let event = new Event('error', {
        id: currentId,
        url: destUrl,
        options,
        path,
        ...error
      })
      error.event = event
      error.preventDefault = event.preventDefault.bind(event)
      dispatchEvent(error.event)
      throw error
    })
  }
}

const FORM = { 'Content-Type': 'application/x-www-form-urlencoded' }
const JSON = { 'Content-Type': 'application/json' }

function generateMethods (config = {}, name, path) {
  path = (path || '') + (name && name !== '/' ? (path ? '.' + name : name) : '')
  if (name && isString(config)) {
    return {
      doGet: doMethod('GET', config, null, path),
      doPost: doMethod('POST', config, FORM, path),
      doPut: doMethod('PUT', config, FORM, path),
      doPatch: doMethod('PATCH', config, FORM, path),
      doPostJson: doMethod('POST', config, JSON, path),
      doPutJson: doMethod('PUT', config, JSON, path),
      doPatchJson: doMethod('PATCH', config, JSON, path),
      doDelete: doMethod('DELETE', config, null, path)
    }
  }
  const result = map(config, (value, key) => generateMethods(value, key, path))
  const rootKey = result['/'] ? '/' : (result['_'] ? '_' : 0)
  if (rootKey) {
    mixin(result, result[rootKey])
    delete result[rootKey]
  }
  return result
}

function defaultErrorHandler (error) {
  log.error('default error handler:', error)
}

export default api
