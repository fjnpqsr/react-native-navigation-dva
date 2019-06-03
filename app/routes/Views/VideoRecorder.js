import React from 'react'
import { Page, VideoRecorder } from '../../components'

class RecordView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Page>
        <VideoRecorder
          onClose={() => { console.log('back') }}
          onOk={(info) => { console.log(info, 'on ok') }}
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
