import React from 'react'
import { View, StatusBar, Text, ScrollView } from 'react-native'
import { VideoPlayer } from '../../components'

class VideoPlayerRoute extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.player = null
  }
  componentDidMount () {
    StatusBar.setHidden(true)
  }
  componentWillUnmount () {
    StatusBar.setHidden(false)
  }

  render () {
    console.log(this.player)
    return (
      <View>
        <VideoPlayer
          ref={node => { this.player = node }}
          resizeMode='contain'
          title={'this is title'}
          source={{
            uri: 'http://valipl.cp31.ott.cibntv.net/6572CA34E7B3A71784DC2424A/03000801005CD52C2775791003E880481CB2CF-34FA-4150-B274-2CAC80278A1D.mp4?ccode=0502&duration=124&expire=18000&psid=7834f6d8785ded605a6c970891fa2378&ups_client_netip=751ee0b9&ups_ts=1557565791&ups_userid=&utid=GznKFGBaWi8CATs5xWs1JPIB&vid=XNDE3MjEwODY3Ng%3D%3D&vkey=Ae622d7b2b5939e917d3f2bc17efca855'
          }}
        />
        <ScrollView >
          <View style={{ height: 1000 }}>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem dolores itaque necessitatibus quia! Dolorem impedit incidunt voluptatem. Eligendi, id, neque? Accusantium architecto illum ipsam similique sit temporibus vitae voluptatem.</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
VideoPlayerRoute.navigationOptions = {
  header: null
}
export default VideoPlayerRoute
