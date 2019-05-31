import React, { PureComponent } from 'react'
import { BackHandler } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions
} from 'react-navigation'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Home from './routes/Home'
import Account from './routes/Account'

const TabsNavigator = createBottomTabNavigator({
  Account: { screen: Account },
  Home: { screen: Home }
}, {
  tabBarOptions: {
    activeTintColor: 'lightcoral'
  }
})
const MainNavigator = createStackNavigator({
  Tabs: { screen: TabsNavigator }
}, {
  headerMode: 'none',
  navigationOptions: ({ navigation }) => {
    return {
      header: null,
      headerTransparent: true
    }
  }
})
const AppNavigator = createStackNavigator({
  Main: MainNavigator,
  DemoRefresh: { screen: require('./routes/Views/RefreshDemo').default },
  AudioPlay: { screen: require('./routes/Views/AudioPlay').default },
  VidioRecord: { screen: require('./routes/Views/VideoRecord').default }
}, {
  initialRouteName: 'Main'
})
export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  state => state.router
)

const App = createReduxContainer(AppNavigator)

function getActiveRouteName (navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

class Router extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
    this.backHandle = this.backHandle.bind(this)
  }
  // eslint-disable-next-line
  UNSAFE_componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle () {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render () {
    const { app, dispatch, router } = this.props
    return <App dispatch={dispatch} state={router} />
  }
}

export default connect(({ app, router }) => ({ app, router }))(Router)
