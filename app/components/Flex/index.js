import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

class Flex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { style, ...restProps } = this.props
    const shouldWrapInTouchableComponent = restProps.onPress || restProps.onLongPress || restProps.onPressIn || restProps.onPressOut
    if (!shouldWrapInTouchableComponent) {
      return (
        <View style={style}>
          {this.props.children}
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback {...restProps}>
        <View style={style} >
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Flex
