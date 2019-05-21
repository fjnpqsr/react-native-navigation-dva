import React from 'react'
import { Image, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

const STATUS = {
  loading: 0,
  finish: 1,
  error: 2
}
const errorSource = require('../../assets/images/image_load_error.png')
const errorSourceRate = 299 / 175
class AutoHeightImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: STATUS.loading,
      source: props.source
    }
  }
  componentDidMount () {
    const { source = {}, maxWidth, wingBlank, rate } = this.props
    const { screenWidth } = global.SCREENINFO
    let _width = screenWidth
    if (maxWidth) {
      _width = maxWidth
    }
    if (wingBlank) {
      _width = screenWidth - (2 * wingBlank)
    }
    let _height
    Image.getSize(source.uri, (width, height) => {
      const _rate = rate || (width / height)
      _height = +(_width / _rate).toFixed(2)
      this.setState({ width: _width, height: _height })
    }, (e) => {
      this.setState({
        status: STATUS.error,
        source: errorSource,
        width: _width,
        height: _height = +(_width / errorSourceRate).toFixed(2)
      })
    })
  }

  render () {
    const { width, height, source } = this.state
    const { style = {}, onPress, touchOpacity, activeOpacity = 0.2 } = this.props
    if (touchOpacity) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
          <View style={[style, { width: '100%', alignItems: 'center', overFlow: 'hidden' }]}>
            <Image
              {...this.props}
              style={{ width, height }}
              source={source}
            />
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[style, { width: '100%', alignItems: 'center', overFlow: 'hidden' }]}>
          <Image
            {...this.props}
            style={{ width, height }}
            source={source}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
AutoHeightImage.displayName = 'AutoHeightImage'
export default AutoHeightImage
