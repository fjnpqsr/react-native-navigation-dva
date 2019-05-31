import React from 'react'
import { connect } from '../foundation'
import { Page, View, Text, Flex } from '../components'
import Icon from 'react-native-vector-icons/Ionicons'
import css from './index.scss'
const demos = [
  { routeName: 'DemoRefresh', title: '下拉刷新, 上拉加载', subTitle: '' },
  { routeName: 'AudioPlay', title: '音频播放', subTitle: '' },
  { routeName: 'VideoRecord', title: '视频录制', subTitle: '' }
  // { routeName: 'VideoPlayer', title: '播放器', subTitle: '' } //重构
]

class ComponentsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.go = this.go.bind(this)
    console.log(this)
  }
  go (demo) {
    this.props.navigation.navigate({ routeName: demo.routeName })
  }
  render () {
    return (
      <Page>
        <View
          style={{ flex: 1, padding: 15 }}
        >
          {demos.map(item => (
            <Flex key={item.routeName} onPress={() => { this.go(item) }}>
              <View style={css.rootItem}>
                <Text>{item.title}</Text>
              </View>
            </Flex>
          ))}
        </View>
      </Page>
    )
  }
}

ComponentsList.navigationOptions = ({ navigations }) => {
  return {
    title: '组件',
    tabBarIcon: ({ focused }) => (
      <Icon name='ios-options' size={30} color={focused ? 'lightcoral' : '#333'} />
    )
  }
}

export default connect(state => ({
  ...state.app
}))(ComponentsList)
