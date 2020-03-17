import * as React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { pxH, pxW } from '../../utils/ui-helpor'
import { connect } from 'react-redux'
import Icon from '../../assets/tabs-icon/tab_company_withText.png'
import ActIcon from '../../assets/tabs-icon/tab_company_withText_active.png'

const Tab = createBottomTabNavigator()

function HomeScreen () {
  return (
    <Tab.Navigator
      initialRouteName={'tab1'}
      backBehavior={'initialRoute'}
      tabBarOptions={{
        // 底部tab栏有一个48大小的paddingBottom, 需要将其置为0
        showLabel: false,
        style: { height: pxH(100), paddingBottom: 0 },
        tabStyle: { height: pxH(100), elevation: 10 }
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            const source = focused ? ActIcon : Icon
            return <Image style={{ width: pxW(64), height: pxH(64) }} source={source} />
          }
        }}
        name='tab1'
        component={require('../Tabs/Tab1').default}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            const source = focused ? ActIcon : Icon
            return <Image style={{ width: pxW(64), height: pxH(64) }} source={source} />
          }
        }}
        name='tab2'
        component={require('../Tabs/Tab2').default}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            const source = focused ? ActIcon : Icon
            return <Image style={{ width: pxW(64), height: pxH(64) }} source={source} />
          }
        }}
        name='tab3'
        component={require('../Tabs/Tab2').default}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            const source = focused ? ActIcon : Icon
            return <Image style={{ width: pxW(64), height: pxH(64) }} source={source} />
          }
        }}
        name='tab4'
        component={require('../Tabs/Tab2').default}
      />
    </Tab.Navigator>
  )
}

export default connect()(HomeScreen)
