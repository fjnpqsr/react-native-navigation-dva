import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Slider,
  StatusBar
} from 'react-native'
import RNVideo from 'react-native-video'
import Orientation from 'react-native-orientation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'

const { width: screenWidth } = Dimensions.get('window')

const TouchIcon = ({ onPress, name }) => {
  return (
    <TouchableOpacity style={[css.controlsButtonWrap]} onPress={onPress}>
      <Icon color={'#fff'} name={name} />
    </TouchableOpacity>
  )
}

export const getDurationString = (totalSeconds, joinFlag = ':', forceJoinHours = false) => {
  const SECONDSPERHOUR = 3600
  const SECONDSPERMINUTE = 60
  let arr = []
  const hours = Math.floor(totalSeconds / SECONDSPERHOUR)
  // 获取除去小时的时间(分 + 秒)
  const reducedHoursSeconds = totalSeconds % SECONDSPERHOUR
  const minutes = Math.floor(reducedHoursSeconds / SECONDSPERMINUTE)
  const seconds = Math.floor(reducedHoursSeconds % SECONDSPERMINUTE)
  const joinHour = hours > 0 || forceJoinHours
  if (joinHour) {
    arr.push(hours >= 10 ? `${hours}` : `0${hours}`)
  }
  arr.push(minutes >= 10 ? `${minutes}` : `0${minutes}`)
  arr.push(seconds >= 10 ? `${seconds}` : `0${seconds}`)
  return arr.join(joinFlag)
}

class VideoPlayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      paused: false,
      isEnd: false,
      fullscreen: false,
      showControls: true,
      showLoading: props.showLoading,
      autoHideControlsTimeout: props.autoHideControlsTimeout || 10000,
      controlTopHeight: new Animated.Value(0),
      controlBottomFooter: new Animated.Value(0),
      // progress info
      currentTime: 0,
      playableDuration: 1,
      seekableDuration: 1,
      // extra
      showExtra: props.showExtra
    }
    // controls state
    this.animation = {
      animateHeader: (showControls) => {
        Animated.timing(
          this.state.controlBottomFooter,
          {
            toValue: showControls ? 0 : -45, // 透明度动画最终值
            duration: 300, // 动画时长3000毫秒
            easing: Easing.linear
          }
        ).start()
      },
      animateFooter: (showControls) => {
        Animated.timing(
          this.state.controlTopHeight,
          {
            toValue: showControls ? 0 : -45, // 透明度动画最终值
            duration: 300, // 动画时长3000毫秒
            easing: Easing.linear
          }
        ).start()
      }
    }
    this.autoHeightControl = null

    // extra component state
    this.extra = {
      show: this.showExtra.bind(this),
      hide: this.hideExtra.bind(this)
    }
    // binding
    this.onBack = this.onBack.bind(this)
    this.togglePause = this.togglePause.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onSeek = this.onSeek.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.replay = this.replay.bind(this)

    // controls
    this.toggleControls = this.toggleControls.bind(this)
    this.toggleControlsAnimation = this.toggleControlsAnimation.bind(this)
    this.setTimeoutHideControls = this.setTimeoutHideControls.bind(this)
    this.clearTimeoutHideControls = this.clearTimeoutHideControls.bind(this)
    this.resetTimeoutHideControls = this.resetTimeoutHideControls.bind(this)
    // rotate
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this._orientationDidChange = this._orientationDidChange.bind(this)
  }
  componentDidMount () {
    Orientation.addOrientationListener(this._orientationDidChange)
    this.setTimeoutHideControls()
  }
  componentWillUnmount () {
    Orientation.removeOrientationListener(this._orientationDidChange)
  }

  _orientationDidChange (orientation) {
    console.log({ orientation })
    console.log(this.state)
    this.props.dispatch({ type: 'app/update', payload: { orientation: orientation } })
    if (orientation === 'PORTRAIT') {
      this.setState({ fullscreen: false })
      StatusBar.setHidden(false)
    }
  }

  togglePause () {
    this.resetTimeoutHideControls()
    this.setState({ paused: !this.state.paused })
  }

  toggleFullScreen () {
    const { onToggleFullscreen } = this.props
    this.resetTimeoutHideControls()
    const state = this.state
    state.fullscreen = !state.fullscreen
    if (state.fullscreen === false) {
      Orientation.lockToPortrait()
    } else {
      Orientation.lockToLandscape()
    }
    StatusBar.setHidden(state.fullscreen)
    onToggleFullscreen && onToggleFullscreen(state.fullscreen)
    this.setState(state)
  }

  onBack () {
    this.resetTimeoutHideControls()
    const { onBack: handleBack } = this.props
    if (this.state.fullscreen) {
      this.toggleFullScreen()
    } else {
      handleBack && handleBack()
    }
  }

  setTimeoutHideControls () {
    const that = this
    clearTimeout(this.autoHeightControl)
    this.autoHeightControl = null
    this.autoHeightControl = setTimeout(function () {
      that.animation.animateHeader(false)
      that.animation.animateFooter(false)
      that.setState({ showControls: false })
    }, this.state.autoHideControlsTimeout)
  }

  clearTimeoutHideControls () {
    clearTimeout(this.autoHeightControl)
    this.autoHeightControl = null
  }

  resetTimeoutHideControls () {
    this.clearTimeoutHideControls()
    this.setTimeoutHideControls()
  }

  toggleControls () {
    const state = this.state
    state.showControls = !state.showControls
    this.resetTimeoutHideControls()
    this.toggleControlsAnimation(state.showControls)
    this.setState(state)
  }

  toggleControlsAnimation (showControls) {
    if (showControls) {
      this.animation.animateHeader(true)
      this.animation.animateFooter(true)
      this.setTimeoutHideControls()
    } else {
      this.animation.animateHeader(false)
      this.animation.animateFooter(false)
    }
  }

  // video handle
  onProgress (info) {
    this.setState({
      currentTime: info.currentTime
    })
  }

  onSeek (value) {
    console.log(value)
    if (this.player) {
      this.clearTimeoutHideControls()
      this.player.seek(value)
      this.setState({ paused: false })
      this.setTimeoutHideControls()
    }
  }

  onLoad (info) {
    const { autoPlay = false, onLoad: onLoadExtra, startTime = 0 } = this.props
    onLoadExtra && onLoadExtra(info)
    this.setState({
      showLoading: false,
      paused: !autoPlay,
      playableDuration: info.duration,
      totalDuration: getDurationString(info.duration)
    })
    if (startTime && this.player) {
      this.player.seek(startTime)
    }
  }
  onEnd () {
    this.setState({ isEnd: true, parsed: true })
    const { onEnd: onEndExtra } = this.props
    onEndExtra && onEndExtra()
  }
  showExtra () {
    this.setState({ showExtra: true, paused: true })
  }
  hideExtra () {
    this.setState({ showExtra: false, paused: false })
  }
  pause () {
    this.setState({ paused: true })
  }
  play () {
    this.setState({ paused: false })
  }
  replay () {
    if (this.player) {
      this.setState({ showExtra: false, paused: false })
      this.player.seek(0)
    }
  }
  render () {
    const {
      paused,
      fullscreen,
      controlTopHeight,
      controlBottomFooter,
      currentTime,
      playableDuration,
      showLoading,
      showExtra = false
    } = this.state

    const {
      source,
      resizeMode = 'contain',
      title = '',
      enabledFullscreen = true,
      enabledBack = true,
      extraComponent = null,
      style
    } = this.props
    const footerStyle = { ...css.controlFooter, bottom: controlBottomFooter }
    const headerStyle = { ...css.controlHeader, top: controlTopHeight }
    return (
      <View style={[fullscreen ? css.fullscreenContainer : css.container, style]} >
        <RNVideo
          {...this.props}
          ref={node => { this.player = node }}
          style={[css.video]}
          resizeMode={resizeMode}
          paused={paused}
          source={source}
          onProgress={this.onProgress}
          onLoad={this.onLoad}
          onEnd={this.onEnd}
        />
        <TouchableWithoutFeedback onPress={this.toggleControls}>
          <View style={css.control}>
            {(!title && enabledBack && !fullscreen) && (
              <Animated.View style={headerStyle}>
                <LinearGradient
                  colors={[ '#949494', 'transparent' ]}
                  style={css.controlBackground}
                >
                  {enabledBack && !fullscreen && (
                    <TouchIcon
                      name='chevron-left'
                      onPress={this.onBack}
                    />
                  )}
                  <Text
                    style={css.controlHeaderText}
                    numberOfLines={1}
                  >{title.trim()}</Text>
                </LinearGradient>
              </Animated.View>
            )}
            {showLoading && (
              <View style={css.loading}>
                <ActivityIndicator color='#fff' />
              </View>
            )}
            <Animated.View style={footerStyle}>
              <LinearGradient
                colors={[ 'transparent', '#949494' ]}
                style={css.controlBackground}
              >
                <TouchIcon
                  name={paused ? 'play' : 'pause'}
                  onPress={this.togglePause}
                />
                <View style={css.controlFooterInfo}>
                  <Text style={css.controlFooterText}>{getDurationString(currentTime)}</Text>
                  <Slider
                    style={{ flex: 1 }}
                    value={currentTime}
                    onValueChange={this.onSeek}
                    minimumValue={0}
                    maximumValue={playableDuration}
                    minimumTrackTintColor='#ffb34b'
                    maximumTrackTintColor='#888'
                    thumbTintColor='#fff'
                  />
                  <Text style={css.controlFooterText}>{getDurationString(playableDuration)}</Text>
                </View>
                {enabledFullscreen && (
                  <TouchIcon
                    onPress={this.toggleFullScreen}
                    name={fullscreen ? 'expand' : 'expand-arrows-alt'}
                  />
                )}
              </LinearGradient>

            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        {showExtra && extraComponent && (
          <View style={css.extraComponent}>
            {extraComponent(this.extra)}
          </View>
        )}
      </View>
    )
  }
}

const css = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    height: screenWidth * 9 / 16,
    backgroundColor: '#000'
  },
  fullscreenContainer: {
    width: '100%',
    overflow: 'hidden',
    height: screenWidth,
    backgroundColor: '#000'
  },
  video: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 500
  },
  control: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 520
  },
  controlBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 510,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controlHeader: {
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 15
  },
  controlHeaderText: {
    color: '#fff',
    flex: 1
  },
  loading: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  controlFooter: {
    height: 40,
    // backgroundColor: 'rgba(0,0,0,.6)',
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controlFooterInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  controlFooterText: {
    color: '#fff'
  },
  controlsButtonWrap: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  extraComponent: {
    position: 'absolute',
    zIndex: 550,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
})

export default connect()(VideoPlayer)
