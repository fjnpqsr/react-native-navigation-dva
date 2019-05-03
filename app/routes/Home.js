import React from 'react'
import { connect } from '../foundation'
import { View, Text, Button } from 'react-native'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onPressLearnMore = this.onPressLearnMore.bind(this)
  }
  onPressLearnMore () {
  }
  render () {
    console.log(this.props)
    return (
      <View>
        <Button
          onPress={this.onPressLearnMore}
          title='Learn More'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
        <Text>home</Text>
      </View>
    )
  }
}

export default connect(state => ({
  ...state.app
}))(Home)
