import * as React from 'react'
import { AppState, BackHandler, ToastAndroid } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-gesture-handler'
import dva from './core/dva'
import { connect } from 'react-redux'
import { navigationRef } from './utils/RootNavigation'
import theme from './utils/navigation-theme'

// DVA创建
const app = dva({
  initialState: {},
  models: [
    require('./models/app').default
  ],
  onError (e) {
    console.log('onError', e)
  }
})

// 注册全局的导航触发器, 为了方便再models中使用
global.navigationRef = navigationRef
const Stack = createStackNavigator()

// 创建全局VIEW
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.appStateChange = this.appStateChange.bind(this)
    this.backHandle = this.backHandle.bind(this)
  }
  componentDidMount () {
    AppState.addEventListener('change', this.appStateChange)
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this.appStateChange)
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  // 监听app前后台切换时, APP的状态
  appStateChange (state) {
    const { dispatch } = this.props
    dispatch({ type: 'app/update', payload: { APPSTATE: state } })
  }
  // 设备物理按键返回触发
  backHandle () {
    if (!this.props.route) { // 判断是否返回到顶层
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        // 最近2秒内按过back键，可以退出应用。
        // return false;
        BackHandler.exitApp()// 直接退出APP
      } else {
        this.lastBackPressed = Date.now()
        ToastAndroid.show('再按一次退出应用', 1000)// 提示
        return true
      }
    }
  }
  render () {
    return (
      <SafeAreaProvider store={app._store}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <Stack.Navigator >
            <Stack.Screen
              name='Home'
              component={require('./routes/HomePage/Home').default}
              options={{ header: () => null }}
            />
            <Stack.Screen
              name='Third'
              component={require('./routes/ThirdView/ThirdView').default}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}

const WithStoreApp = connect(state => ({ ...state.app }))(App)

const APP = app.start(<WithStoreApp />)

export default APP
