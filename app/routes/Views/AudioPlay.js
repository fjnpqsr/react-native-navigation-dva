import React from 'react'
import { Page, Audio } from '../../components'

class AudioPLay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Page>
        <Audio
          // src='http://ip.h5.ri01.sycdn.kuwo.cn/resource/n2/0/31/2339468764.mp3'
          src='http://mp32.9ku.com/upload/2014/03/09/835692.mp3'
          style={{ margin: 12, height: 50 }}
        />
        <Audio
          // src='http://ip.h5.ri01.sycdn.kuwo.cn/resource/n2/0/31/2339468764.mp3'
          src='http://mp32.9ku.com/upload/2014/03/09/835692.mp3'
          style={{ margin: 12 }}
        />
      </Page>
    )
  }
}
AudioPLay.navigationOptions = {
  header: null
}
export default AudioPLay
