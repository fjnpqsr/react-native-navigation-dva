import React from 'react'
import { View, Text } from 'react-native'

class VideoPLayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <View>
        <Text>VideoPlayer</Text>
      </View>
    )
  }
}
VideoPLayer.navigationOptions = {
  header: null
}
export default VideoPLayer
