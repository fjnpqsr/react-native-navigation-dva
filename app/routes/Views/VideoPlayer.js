import React from 'react'
import { View, StatusBar, Button } from 'react-native'
import { VideoPlayer } from '../../components'

class VideoPlayerRoute extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.player = null
  }
  componentDidMount () {
    StatusBar.setHidden(true)
  }
  componentWillUnmount () {
    StatusBar.setHidden(false)
  }

  render () {
    console.log(this.player)
    return (
      <View>
        <VideoPlayer
          ref={node => { this.player = node }}
        />
        <Button
          title={'test'}
          onPress={() => {
            this.setState({ test: !this.state.test })
          }}
        />
      </View>
    )
  }
}
VideoPlayerRoute.navigationOptions = {
  header: null
}
export default VideoPlayerRoute
