import React from 'react'
import { Page, View, Text, TouchableWithoutFeedback, Record, RecordWrapper } from '../components'

class Account extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Page>
        <RecordWrapper
          ref={node => { this.record = node }}
        >
          <View style={{ height: 80, marginTop: 80, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <Text>长按进行录音</Text>
          </View>
        </RecordWrapper>

        <TouchableWithoutFeedback
          onPress={() => {
            if (this.record) {
              Record.play(this.record.recordPath)
            }
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
