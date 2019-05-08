import React from 'react'
import { connect } from '../foundation'
import { Page, View, Text, Button } from '../components'
import css from './index.scss'
const demos = [
  { routeName: 'Refresh', title: '下拉刷新, 上拉加载', subTitle: '' }
]

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <Page>
        <View style={{ flex: 1, padding: 15 }}>
          {demos.map(item => (
            <View style={css.rootItem} key={item.routeName}>
              <Text>{item.title}</Text>
            </View>
          ))}
        </View>
      </Page>
    )
  }
}

export default connect(state => ({
  ...state.app
}))(Home)
