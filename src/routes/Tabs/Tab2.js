import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

function HomeScreen ({ dispatch }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tab2</Text>
      <Button
        title='Plus'
        onPress={() => {
          dispatch({ type: 'app/routerJump' })
        }}
      />

    </View>
  )
}

export default connect()(HomeScreen)
