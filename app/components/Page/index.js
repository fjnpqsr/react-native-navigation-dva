import React from 'react'
import { View } from 'react-native'
import appConfig from '../../../app.json'

class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { style, ...restProps } = this.props
    const defaultStyle = { flex: 1, backgroundColor: appConfig.pageColor }
    return (
      <View
        style={[defaultStyle, style]}
        {...restProps}
      >
        {this.props.children}
      </View>
    )
  }
}

export default Page
