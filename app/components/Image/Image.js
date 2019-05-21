import React from 'react'
import { Image, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

class ImageComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { onPress, style, touchOpacity, activeOpacity = 0.2 } = this.props
    const imageStyle = {
      height: style.height,
      width: style.width
    }

    const passPropsToImage = { ...this.props, style: imageStyle }

    const TouchOpacityImage = () => (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={[style, { overflow: 'hidden' }]}
      >
        <Image {...passPropsToImage} />
      </TouchableOpacity>
    )

    const TouchImage = () => (
      <TouchableWithoutFeedback onPress={onPress} >
        <View style={[style, { overflow: 'hidden' }]}>
          <Image {...passPropsToImage} />
        </View>
      </TouchableWithoutFeedback>
    )

    if (touchOpacity) {
      return <TouchOpacityImage />
    }
    return <TouchImage />
  }
}
ImageComponent.displayName = 'ImageComponent'
export default ImageComponent
