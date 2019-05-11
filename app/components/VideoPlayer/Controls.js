import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import css from './index.scss'

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
      fullscreen: props.fullscreen
    }
    this.toggleFullscreen = props.toggleFullscreen
    this.onTogglePause = props.onTogglePause
    this.onBack = props.onBack
  }

  render () {
    const { title } = this.state
    const { theme = {}, paused } = this.props
    const { header = {}, footer = {} } = theme
    const headerStyle = [css.controlsHeader, { backgroundColor: header.backgroundColor, height: header.height }]
    const headerTextStyle = [{ color: header.color, fontSize: header.fontSize }]

    const footerStyle = [css.controlsFooter, { backgroundColor: footer.backgroundColor, height: footer.height }]
    const footerTextStyle = [{ color: footer.color, fontSize: footer.fontSize }]
    return (
      <View style={css.controls}>
        <View style={headerStyle}>
          <TouchIcon
            name='chevron-left'
            position={'header'}
            theme={theme}
            onPress={this.onBack}
          />
          <Text
            style={[headerTextStyle, { flex: 1 }]}
            numberOfLines={1}
          >{title}</Text>
        </View>
        <View style={css.controlsContent}>
          {/* <Text style={}>content</Text> */}
        </View>
        <View style={footerStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchIcon
              position={'footer'}
              theme={theme}
              name={paused ? 'play' : 'pause'}
              onPress={this.onTogglePause}
            />
            <Text style={[css.controlsFooterText, footerTextStyle]}>footer</Text>
          </View>
          <TouchIcon
            position={'footer'}
            theme={theme}
            name={this.props.fullscreen ? 'expand' : 'expand-arrows-alt'}
            onPress={this.toggleFullscreen}
          />
        </View>
      </View>
    )
  }
}

export default VideoControls
