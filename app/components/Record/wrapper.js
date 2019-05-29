import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import Record from './index'

class RecordWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.recordPath = ''
    this.record = this.record.bind(this)
    this.stop = this.stop.bind(this)
  }
  componentDidMount () {
    Record.init({
      onError: (e) => {
        console.log(e)
      }
    })
  }
  record () {
    const { onRecord, onBeforeRecord } = this.props
    onBeforeRecord && onBeforeRecord()
    Record.record().then(() => {
      onRecord && onRecord()
    })
  }
  stop () {
    const { onStop, onBeforeStop } = this.props
    onBeforeStop && onBeforeStop()
    const that = this
    Record.stop().then(path => {
      that.recordPath = path
      onStop && onStop(path)
    })
  }
  render () {
    return (
      <TouchableWithoutFeedback
        onPressIn={this.record}
        onPressOut={this.stop}
      >
        {this.props.children}
      </TouchableWithoutFeedback>
    )
  }
}

RecordWrapper.displayName = 'RecordWrapper'
export default RecordWrapper
