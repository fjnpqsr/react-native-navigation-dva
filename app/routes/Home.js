import React from 'react'
import { connect } from '../foundation'
import { View, Text } from 'react-native'

const Home = (props) => {
  console.log(props)
  return (
    <View>
      <Text>home</Text>
    </View>
  )
}

export default connect(state => ({
  ...state.app
}))(Home)
