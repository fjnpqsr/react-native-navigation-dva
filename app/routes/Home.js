import React from 'react'
import { connect } from '../foundation'
import { Page, View, Text, Flex } from '../components'
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
            <Flex key={item.routeName} >
              <View style={css.rootItem}>
                <Text>{item.title}</Text>
              </View>
            </Flex>
          ))}
        </View>
      </Page>
    )
  }
}

export default connect(state => ({
  ...state.app
}))(Home)
