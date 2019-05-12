import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native'
import RNVideo from 'react-native-video'
import Orientation from 'react-native-orientation'
import Icon from 'react-native-vector-icons/FontAwesome5'

const { width: screenWidth } = Dimensions.get('window')

const TouchIcon = ({ onPress, name }) => {
  return (
    <TouchableOpacity style={[css.controlsButtonWrap]} onPress={onPress}>
      <Icon color={'#fff'} name={name} />
    </TouchableOpacity>
  )
}

class VideoPlayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      paused: false,
      fullscreen: false,
      showControls: true,
      autoHideControlsTimeout: 2000,
      controlTopHeight: new Animated.Value(0),
      controlBottomFooter: new Animated.Value(0)
    }

    this.animation = {
      animateHeader: (showControls) => {
        console.log('animateHeader')
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
    this.onBack = this.onBack.bind(this)
    this.togglePause = this.togglePause.bind(this)
    this.toggleFullScreen = this.toggleFullScreen.bind(this)

    // controls
    this.toggleControls = this.toggleControls.bind(this)
    this.controlChangeAnimation = this.controlChangeAnimation.bind(this)
    this.setTimeoutHideControls = this.setTimeoutHideControls.bind(this)
    this.clearTimeoutHideControls = this.clearTimeoutHideControls.bind(this)
  }
  componentDidMount () {
    this.setTimeoutHideControls()
  }
  togglePause () {
    this.clearTimeoutHideControls()
    this.setState({ paused: !this.state.paused })
  }
  toggleFullScreen () {
    this.clearTimeoutHideControls()
    const state = this.state
    state.fullscreen = !state.fullscreen
    if (state.fullscreen === false) {
      Orientation.lockToPortrait()
    } else {
      Orientation.lockToLandscape()
    }
    this.setState(state)
  }

  onBack () {
    this.clearTimeoutHideControls()
    if (this.state.fullscreen) {
      this.toggleFullScreen()
    } else {
      window.alert('back')
    }
  }

  controlChangeAnimation (showControls) {
    this.animation.animateHeader(showControls)
    this.animation.animateFooter(showControls)
    if (showControls) {
      this.setTimeoutHideControls()
    }
  }

  setTimeoutHideControls () {
    const that = this
    this.autoHeightControl = setTimeout(function () {
      that.animation.animateHeader(false)
      that.animation.animateFooter(false)
      that.setState({ showControls: false })
    }, this.state.autoHideControlsTimeout)
  }

  clearTimeoutHideControls () {
    clearTimeout(this.autoHeightControl)
    this.autoHeightControl = null
    this.setTimeoutHideControls()
  }

  toggleControls () {
    console.log('toggle controls')
    const state = this.state
    state.showControls = !state.showControls
    this.controlChangeAnimation(state.showControls)
    this.setState(state)
  }

  render () {
    const { paused, fullscreen, controlTopHeight, controlBottomFooter } = this.state
    const footerStyle = { ...css.controlFooter, bottom: controlBottomFooter }
    const headerStyle = { ...css.controlHeader, top: controlTopHeight }
    return (
      <View style={fullscreen ? css.fullscreenContainer : css.container}>
        <RNVideo
          style={css.video}
          repeat
          resizeMode='contain'
          paused={paused}
          source={{
            uri: 'https://valipl.cp31.ott.cibntv.net/65724290EAF3E7192BD735AB8/03000801005CD2587CBCC30003E880B4A7DFC1-EED6-4C41-9039-8C3A9C35436A.mp4?ccode=0502&duration=211&expire=18000&psid=6250f14c54a5b8fcdefe96d3ac75587d&ups_client_netip=3b39c6f4&ups_ts=1557677107&ups_userid=&utid=GznKFGBaWi8CATs5xWs1JPIB&vid=XMzkzODk2ODQ0NA%3D%3D&vkey=A5b89245561a6394a225236cf22446a91'
          }}
        />
        <TouchableWithoutFeedback onPress={this.toggleControls}>
          <View style={css.control}>
            <Animated.View style={headerStyle}>
              <TouchIcon
                name='chevron-left'
                onPress={this.onBack}
              />
              <Text
                style={css.controlHeaderText}
                numberOfLines={1}
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet consequuntur distinctio ea iste laboriosam nemo omnis quia tempore tenetur? A aspernatur corporis ipsum neque repudiandae? Eum mollitia praesentium reiciendis?</Text>
            </Animated.View>
            <Animated.View style={footerStyle}>
              <TouchIcon
                name={paused ? 'play' : 'pause'}
                onPress={this.togglePause}
              />
              <TouchIcon
                onPress={this.toggleFullScreen}
                name={fullscreen ? 'expand' : 'expand-arrows-alt'}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const css = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    height: 280,
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
    zIndex: 10
  },
  control: {
    position: 'relative',
    flex: 1,
    zIndex: 40
  },
  controlHeader: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,.6)',
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
  controlFooter: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
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
  }
})

export default VideoPlayer
