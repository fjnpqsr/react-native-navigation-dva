import * as React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { pxH, pxW, UIAdaptInfo } from '../../utils/ui-helpor'
function HomeScreen (props) {
  const { navigation, dispatch, num } = props

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Third')
      }}>
        <Text>{UIAdaptInfo.pxr}/{UIAdaptInfo.screenWidth}/{UIAdaptInfo.screenHeight}</Text>
        <Text>{pxW(750)}- w</Text>
        <Text>{pxH(100)}- h</Text>
        <Text>Num: {num}</Text>
      </TouchableOpacity>
      <View
        style={{ width: pxW(750), height: pxH(100), backgroundColor: 'lightcoral', marginBottom: 10 }}
      />
      <View
        style={{ width: 100, height: 48, backgroundColor: 'lightcoral' }}
      />
      <Button
        title='Plus'
        onPress={() => {
          dispatch({ type: 'app/update', payload: { num: num + 1 } })
        }}
      />
    </SafeAreaView>
  )
}

export default connect(state => ({
  num: state.app.num
}))(HomeScreen)
