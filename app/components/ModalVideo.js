import React from 'react'
import { View, Modal } from 'react-native'
import Video from 'react-native-video'

const VIDEOPATH = 'https://f.us.sinaimg.cn/000Ma78klx07ukJtg0ww01041200y7ZM0E010.mp4?label=mp4_ld&template=640x360.28.0&Expires=1559535825&ssig=fwMfzezzbe&KID=unistore,video'

class ModalVideo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View>
        <Video />
      </View>
    )
  }
}

export default ModalVideo
