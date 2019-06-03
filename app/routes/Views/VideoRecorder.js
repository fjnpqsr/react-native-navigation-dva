import React from 'react'
import { connect } from 'react-redux'
import { Page, VideoRecorder } from '../../components'
import { AudioUtils } from 'react-native-audio'

class RecordView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onOk = this.onOk.bind(this)
    this.close = this.close.bind(this)
  }
  onOk (info) {
    console.log(info)
    this.props.dispatch({ type: 'app/update', payload: { test: info } })
    this.props.navigation.goBack()
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
export default connect()(RecordView)
