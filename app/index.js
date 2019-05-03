import React from 'react'
import { SafeAreaView } from 'react-native'
import { connect, Provider } from 'react-redux'
import dva from './foundation'
import Router, { routerMiddleware, routerReducer } from './router'
import appModel from './models/app'
import './utils'

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
  }
  render () {
    console.log(this.props, 'root component')
    console.log({ global })
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      >
        {/* 使用react-redux 的 Provider 组件传递dva中的store */}
        <Provider store={dvaEngine._store}>
          <Router />
        </Provider>
      </SafeAreaView>
    )
  }
}
const RouterWithRedux = connect()(Root)

const App = dvaEngine.start(<RouterWithRedux />)
export default App
