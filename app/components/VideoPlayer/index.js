import React from 'react'
import { View, Dimensions } from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import Controls from './Controls'
import css from './index.scss'

const { width: screenWidth } = Dimensions.get('window')

const defaultVideoTheme = {
  height: 280,
  backgroundColor: '#000'
}
const defaultControlsTheme = {
  header: {
    backgroundColor: 'rgba(0,0,0,.8)',
    height: 40,
    color: '#fff',
    fontSize: 12
  },
  footer: {
    backgroundColor: 'rgba(0,0,0,.8)',
    height: 40,
    color: '#fff',
    fontSize: 12
  },
  icon: { color: '#fff' }
}

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
    const { source, resizeMode = 'contain', theme = {}, controlsTheme = {}, title } = this.props
    const videoTheme = { ...defaultVideoTheme, ...theme }
    const controlsStyle = { ...defaultControlsTheme, ...controlsTheme }
    const fullscreenVideo = {
      height: screenWidth
    }
    const videoWrapperStyle = fullscreen ? [css.videoWrapper, videoTheme, fullscreenVideo] : [css.videoWrapper, videoTheme]
    return (
      <View style={videoWrapperStyle}>
        <Video
          style={[css.video, fullscreen ? fullscreenVideo : videoTheme]}
          source={source}
          resizeMode={resizeMode}
        />
        <Controls
          title={title}
          theme={controlsStyle}
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
