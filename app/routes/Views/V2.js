import React from 'react'

import { View, StatusBar } from 'react-native'
import RNVideo from '../../components/Video2'

class VideoPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount () {
    StatusBar.setHidden(true)
  }
  componentWillUnmount () {
    StatusBar.setHidden(false)
  }
  render () {
    return (
      <View>
        <RNVideo />
      </View>
    )
  }
}
VideoPage.navigationOptions = {
  header: null
}
export default VideoPage
