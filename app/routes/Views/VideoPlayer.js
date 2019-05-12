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
    return (
      <View>
        <VideoPlayer
          ref={node => { this.player = node }}
          resizeMode='contain'
          title={'this is title'}
          autoHideControlsTimeout={10000}
          source={{
            uri: 'http://valipl.cp31.ott.cibntv.net/697445689E54371B3BD0F453A/03000801005CAEFE01E1C23003E880D8974FEC-EEB6-49E1-85CB-365D7009D358.mp4?ccode=0502&duration=2671&expire=18000&psid=93718255a72095d70ac5746af4443edc&ups_client_netip=7829ba97&ups_ts=1557632177&ups_userid=&utid=GznKFGBaWi8CATs5xWs1JPIB&vid=XNDEzMTk5NDI2OA%3D%3D&vkey=A5c07374c80122759d46302280a37243d'
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
