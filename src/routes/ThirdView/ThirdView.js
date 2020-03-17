import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

function HomeScreen (props) {
  const { dispatch } = props
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => {
        dispatch({ type: 'app/routerJump' })
      }}>
        <Text>ThirdView</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect()(HomeScreen)
