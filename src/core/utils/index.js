
export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export * from './guid'
export * from './devices'
export * from './tools'
export * from './logs'
