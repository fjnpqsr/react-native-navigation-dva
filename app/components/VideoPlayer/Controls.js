import React from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Animated, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const TouchIcon = ({ onPress, theme = {}, position, ...rest }) => {
  let extendStyle = { color: theme.icon.color }
  let extendWrapStyle
  switch (position) {
    case 'header':
      extendWrapStyle = { height: theme.header.height, width: theme.header.height }
      break
    case 'footer':
      extendWrapStyle = { height: theme.footer.height, width: theme.footer.height }
  }
  return (
    <TouchableOpacity style={[css.controlsButtonWrap, extendWrapStyle]} onPress={onPress}>
      <Icon {...rest} style={extendStyle} />
    </TouchableOpacity>
  )
}

class VideoControls extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title || '',
      fullscreen: props.fullscreen,
      showControls: true,
      autoHideControlsTimeout: props.autoHideControlsTimeout,
      controlTopHeight: new Animated.Value(0),
      controlBottomFooter: new Animated.Value(0)
    }

    this.animation = {
      animateHeader: (showControls) => {
        Animated.timing(
          this.state.controlBottomFooter,
          {
            toValue: showControls ? 0 : -(this.props.theme.header.height + 5), // 透明度动画最终值
            duration: 300, // 动画时长3000毫秒
            easing: Easing.linear
          }
        ).start()
      },
      animateFooter: (showControls) => {
        Animated.timing(
          this.state.controlTopHeight,
          {
            toValue: showControls ? 0 : -(this.props.theme.footer.height + 5), // 透明度动画最终值
            duration: 300, // 动画时长3000毫秒
            easing: Easing.linear
          }
        ).start()
      }
    }
    this.autoHeightControl = null
    this.toggleFullscreen = props.toggleFullscreen
    this.onTogglePause = props.onTogglePause
    this.onBack = props.onBack
    this.toggleControls = this.toggleControls.bind(this)
    this.setTimeoutHideControls = this.setTimeoutHideControls.bind(this)
  }

  componentDidMount () {
    this.setTimeoutHideControls()
  }
  setTimeoutHideControls () {
    const that = this
    this.autoHeightControl = setTimeout(function () {
      that.animation.animateHeader(false)
      that.animation.animateFooter(false)
      that.setState({ showControls: false })
    }, this.state.autoHideControlsTimeout)
  }
  resetTimeoutHideControls () {
    clearTimeout(this.autoHeightControl)
    this.setTimeoutHideControls()
  }
  toggleControls () {
    console.log('toggle controls')
    const state = this.state
    state.showControls = !state.showControls
    this.animation.animateHeader(state.showControls)
    this.animation.animateFooter(state.showControls)
    if (state.showControls) {
      this.setTimeoutHideControls()
    } else {
      clearTimeout(this.autoHeightControl)
    }
    this.setState(state)
  }

  render () {
    const { title, controlTopHeight, controlBottomFooter } = this.state
    const { theme = {}, paused } = this.props
    const { header = {}, footer = {} } = theme
    const headerStyle = [css.controlsHeader, { backgroundColor: header.backgroundColor, height: header.height, top: controlTopHeight }]
    const headerTextStyle = [{ color: header.color, fontSize: header.fontSize }]

    const footerStyle = [css.controlsFooter, { backgroundColor: footer.backgroundColor, height: footer.height, bottom: controlBottomFooter }]
    const footerTextStyle = [{ color: footer.color, fontSize: footer.fontSize }]
    return (
      <TouchableWithoutFeedback onPress={this.toggleControls}>
        <View style={css.controls} >
          <Animated.View style={headerStyle}>
            <TouchIcon
              name='chevron-left'
              position={'header'}
              theme={theme}
              onPress={() => {
                this.onBack()
                this.resetTimeoutHideControls()
              }}
            />
            <Text
              style={[headerTextStyle, { flex: 1 }]}
              numberOfLines={1}
            >{title}</Text>
          </Animated.View>
          <View style={css.controlsContent} >
            {/* <Text style={}>content</Text> */}
          </View>
          <Animated.View style={footerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchIcon
                position={'footer'}
                theme={theme}
                name={paused ? 'play' : 'pause'}
                onPress={() => {
                  this.onTogglePause()
                  this.resetTimeoutHideControls()
                }}
              />
              <Text style={[css.controlsFooterText, footerTextStyle]}>footer</Text>
            </View>
            <TouchIcon
              position={'footer'}
              theme={theme}
              name={this.props.fullscreen ? 'expand' : 'expand-arrows-alt'}
              onPress={() => {
                this.toggleFullscreen()
                this.resetTimeoutHideControls()
              }}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
const css = StyleSheet.create({
  controls: {
    flex: 1,
    zIndex: 20
  },
  controlsHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 15
  },
  controlsContent: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlsFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controlsFooterText: {
    paddingHorizontal: 15
  },
  controlsButtonWrap: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default VideoControls
