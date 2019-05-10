import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import css from './index.scss'

const TouchIcon = ({ onPress, ...rest }) => (
  <TouchableOpacity style={css.controlsButtonWrap} onPress={onPress}>
    <Icon {...rest} style={css.controlButton} />
  </TouchableOpacity>
)
class VideoControls extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title || 'hahaha',
      fullscreen: props.fullscreen
    }
    this.toggleFullscreen = props.toggleFullscreen
  }

  render () {
    const { title } = this.state
    return (
      <View style={css.controls}>
        <View style={css.controlsHeader}>
          <TouchIcon name='chevron-left' />
          <Text
            style={[css.controlsHeaderText, { flex: 1 }]}
            numberOfLines={1}
          >{title}</Text>
        </View>
        <View style={css.controlsContent}>
          <Text style={css.controlsContentText}>content</Text>
        </View>
        <View style={css.controlsFooter}>
          <Text style={css.controlsFooterText}>footer</Text>
          <TouchIcon
            name={this.props.fullscreen ? 'expand' : 'expand-arrows-alt'}
            onPress={this.toggleFullscreen}
          />
        </View>
      </View>
    )
  }
}

export default VideoControls
