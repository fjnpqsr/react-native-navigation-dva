import React from 'react'
import { AppState, SafeAreaView, StatusBar, Platform } from 'react-native'
import { connect, Provider } from 'react-redux'
import dva from './foundation'
import Router, { routerMiddleware, routerReducer } from './router'
import appConfig from '../app.json'
import appModel from './models/app'
import './utils'

const isIos = Platform.OS === 'ios'
const dvaEngine = dva({
  initialState: {},
  models: [appModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError (e) {
    console.log('onError', e)
  }
})
// 创建一个最外层的试图组件来做一些全局的控制
class Root extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.appStateChange = this.appStateChange.bind(this)
  }

  componentDidMount () {
    AppState.addEventListener('change', this.appStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.appStateChange)
  }

  appStateChange (state) {
    this.props.dispatch({ type: 'app/update', payload: { STATE: state } })
  }
  render () {
    const androidStatusBarHeight = StatusBar.currentHeight
    const statusBarHeight = isIos ? 22.5 : androidStatusBarHeight
    const statusBarBackgroundColor = appConfig.statusBar.backgroundColor
    return (
      <SafeAreaView
        style={{
          flex: 1,
          borderTopColor: statusBarBackgroundColor,
          borderTopWidth: statusBarHeight
        }}
      >
        <StatusBar {...appConfig.statusBar} />
        {/* 使用react-redux 的 Provider 组件传递dva中的store */}
        <Provider store={dvaEngine._store} >
          <Router />
        </Provider>

      </SafeAreaView>
    )
  }
}
const RouterWithRedux = connect()(Root)

const App = dvaEngine.start(<RouterWithRedux />)
export default App
