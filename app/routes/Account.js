import React from 'react'
import { connect } from 'react-redux'
import { Page, Text, View, TouchableWithoutFeedback } from '../components'
import Icon from 'react-native-vector-icons/Feather'

class CoadingComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.go = this.go.bind(this)
  }
  go () {
    this.props.navigation.navigate({ routeName: 'VideoRecorder' })
  }

  render () {
    const { test } = this.props
    console.log(this.props)
    console.log(test)
    return (
      <Page>
        <TouchableWithoutFeedback
          onPress={this.go}
        >
          <View style={{ height: 60, marginTop: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>点击去视频录制页面</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.getThumbnail}
        >
          <View style={{ height: 60, marginTop: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>获取录制视频的缩略图</Text>
          </View>
        </TouchableWithoutFeedback>
      </Page>
    )
  }
}
CoadingComponent.navigationOptions = ({ navigations }) => {
  return {
    title: '开发测试',
    tabBarIcon: ({ focused }) => (
      <Icon name='activity' size={30} color={focused ? 'lightcoral' : '#333'} />
    )
  }
}

export default connect(state => ({
  ...state.app
}))(CoadingComponent)
