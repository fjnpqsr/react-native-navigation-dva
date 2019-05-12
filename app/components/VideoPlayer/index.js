import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import Controls from './Controls'

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
    this.state = {      fullscreen: false,
      paused: false,
      // progress info
      progressInfo: {
        currentTime: 0,
        playableDuration: 1,
        seekableDuration: 1
      }
    }
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.onTogglePause = this.onTogglePause.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onBack = this.onBack.bind(this)
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
    this.setState(state)
  }

  onTogglePause () {
    const { paused } = this.state
    this.setState({
      paused: !paused
    })
  }

  onBack () {
    if (this.state.fullscreen) {
      this.toggleFullscreen()
    } else {
      window.alert('back')
    }
  }

  onProgress (progressInfo) {
    this.setState({ progressInfo })
  }

  render () {
    console.log(this)
    const { fullscreen, progressInfo, paused } = this.state
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
          paused={paused}
          resizeMode={resizeMode}
          onProgress={this.onProgress}
        />
        <Controls
          title={title}
          paused={paused}
          progressInfo={progressInfo}
          theme={controlsStyle}
          toggleFullscreen={this.toggleFullscreen}
          onTogglePause={this.onTogglePause}
          onBack={this.onBack}
          fullscreen={fullscreen}
        />
      </View>
    )
  }
}
VideoPLayer.navigationOptions = {
  header: null
}
const css = StyleSheet.create({
  videoWrapper: {
    width: '100%'
  },
  video: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    width: '100%'
  }
})
export default VideoPLayer
