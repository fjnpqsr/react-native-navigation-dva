import React from 'react'
import { SafePage, Audio } from '../components'

class Account extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <SafePage>
        <Audio
          // src='http://ip.h5.ri01.sycdn.kuwo.cn/resource/n2/0/31/2339468764.mp3'
          src='http://mp32.9ku.com/upload/2014/03/09/835692.mp3'
          backgroundColor={'lightcoral'}
        />
      </SafePage>
    )
  }
}

export default Account
