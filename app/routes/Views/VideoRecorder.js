import React from 'react'
import { Page, VideoRecorder } from '../../components'

class RecordView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onOk = this.onOk.bind(this)
    this.close = this.close.bind(this)
  }
  onOk (info) {
    console.log(info)
  }
  close () {
    this.props.navigation.goBack()
  }
  render () {
    return (
      <Page>
        <VideoRecorder
          onClose={this.close}
          onOk={this.onOk}
        />
      </Page>
    )
  }
}

RecordView.displayName = 'RecordView'
RecordView.navigationOptions = {
  header: null
}
export default RecordView
