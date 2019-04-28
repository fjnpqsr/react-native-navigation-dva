import React from 'react'
import { AppRegistry } from 'react-native'
import { appName } from '../app.json'
import dva from './foundation'
import Router, { routerMiddleware, routerReducer } from './router'
import appModel from './models/app'

const app = dva({
  initialState: {},
  models: [appModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError (e) {
    console.log('onError', e)
  }
})

const App = app.start(<Router />)

AppRegistry.registerComponent(appName, () => App)
