
import env from './env'
import invariant from 'invariant'

function delegate (name) {
  return function () {
    env.dev && console[name].apply(console, arguments)
  }
}

export default {
  info: delegate('info'),
  debug: delegate('debug'),
  warn: delegate('warn'),
  error: delegate('error'),
  assert: invariant
}
