import React from 'react'
import { Page, Text } from '../components'
import Icon from 'react-native-vector-icons/Feather'

class CoadingComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Page>
        <Text>1</Text>
      </Page>
    )
  }
}
CoadingComponent.navigationOptions = ({ navigations }) => {
  return {
    title: '开发测试',
    tabBarIcon: ({ focused }) => (
      <Icon name='activity' size={30} color={focused ? 'lightcoral' : '#333'} />
    )
  }
}

export default CoadingComponent
