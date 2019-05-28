import React from 'react'
import { Page, View, Text, TouchableWithoutFeedback, Record } from '../components'

class Account extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      path: ''
    }
    this.recordPath = ''
  }
  componentDidMount () {
    Record.init({
      onError: (e) => {
        console.log(e)
      }
    })
  }
  render () {
    console.log({ path: this.recordPath })
    const that = this
    return (
      <Page>
        <TouchableWithoutFeedback
          onPress={() => { Record.record() }}
        >
          <View style={{ height: 80, marginTop: 80, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <Text>按住说话</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            Record.stop().then(path => {
              that.recordPath = path
            })
          }}
        >
          <View style={{ height: 80, marginTop: 80, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <Text>结束录制</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            console.log(this.recordPath)
            Record.play(this.recordPath)
          }}
        >
          <View style={{ height: 80, marginTop: 80, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <Text>播放录音</Text>
          </View>
        </TouchableWithoutFeedback>
      </Page>
    )
  }
}

export default Account
