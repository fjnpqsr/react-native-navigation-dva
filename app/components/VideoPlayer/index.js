import React from 'react'
import { View, Dimensions } from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import Controls from './Controls'
import css from './index.scss'

const { width: screenWidth } = Dimensions.get('window')
class VideoPLayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fullscreen: false
    }
    this.fullscreen = false
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevState.fullscreen === false) {
      Orientation.lockToPortrait()
    } else {
      Orientation.lockToLandscape()
    }
  }

  toggleFullscreen () {
    const state = this.state
    state.fullscreen = !state.fullscreen
    this.fullscreen = !state.fullscreen
    this.setState(state)
  }
  render () {
    const { fullscreen } = this.state
    const fullscreenVideo = {
      height: screenWidth
    }
    const videoWrapperStyle = fullscreen ? [css.videoWrapper, fullscreenVideo] : css.videoWrapper
    return (
      <View style={videoWrapperStyle}>
        <Video
          style={[css.video, fullscreen ? fullscreenVideo : { height: 280 }]}
          resizeMode='contain'
          source={{
            uri: 'http://valipl.cp31.ott.cibntv.net/6975113898C397171B0854CA6/03000801005CB9AE97FB6CB003E880856757FE-96A3-40BC-A028-426856B29CC8.mp4?ccode=0502&duration=10132&expire=18000&psid=ee4e23e7e8060b87f61a3362d9f7d115&ups_client_netip=7829a538&ups_ts=1557515206&ups_userid=&utid=GznKFGBaWi8CATs5xWs1JPIB&vid=XMTQ4NzE1MzcyOA%3D%3D&vkey=A21a6a3cd1b9e204041dedc0a79b606c0'
          }}
        />
        <Controls
          toggleFullscreen={this.toggleFullscreen}
          fullscreen={fullscreen}
        />
      </View>
    )
  }
}
VideoPLayer.navigationOptions = {
  header: null
}
export default VideoPLayer
