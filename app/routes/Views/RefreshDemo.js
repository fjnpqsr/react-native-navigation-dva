import React from 'react'
import { connect } from '../../foundation'
import { RefreshList, Page, Text, Button } from '../../components'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.refreshList = null
    this.state = {
      page: 1,
      pages: 2,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }
  onRefresh (handler) {
    this.setState({ data: this.state.data.concat(this.state.data.length + 1) })
    handler()
  }
  onLoad (handler) {
    const { page, pages, data } = this.state
    if (page < pages) {
      this.setState({ page: page + 1, pages, data: data.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) })
      handler()
    } else {
      handler('NOMORE')
    }
  }
  render () {
    return (
      <Page>
        <Button
          title='Learn More'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
        <RefreshList
          style={{ flex: 1 }}
          data={this.state.data}
          ref={(node) => { this.refreshList = node }}
          refresh={this.onRefresh}
          loadMore={this.onLoad}
          renderItem={({ item, index }) => (
            <Text style={{ height: 60, lineHeight: 60, paddingHorizontal: 15, backgroundColor: index % 2 ? '#f5f5f5' : '#fff' }}>{index}</Text>
          )}
        />
      </Page>
    )
  }
}
Home.navigationOptions = {
  header: null
}
export default connect(state => ({
  ...state.app
}))(Home)
