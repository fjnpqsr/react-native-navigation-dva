import React from 'react'
import { withNavigationFocus } from 'react-navigation'
import { View } from 'react-native'
import appConfig from '../../../app.json'

class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  getSnapshotBeforeUpdate (nextProps, prevState) {
    const { onFocus, forceFocus } = this.props

    const nextFocused = nextProps.isFocused // 获取更新后页面是不是活动页
    const prevFocused = prevState.isFocused // 获取更新前页面是不是活动页
    const isFocusChange = nextFocused === prevFocused // 更新前的isFocused !== 更新后的isFocused ==> 页面进行了切换

    let doFocus = prevFocused && isFocusChange // doFocus默认情况下处理的是: 页面切换且上一个页面是激活状态下的场景, 用于处理 A->B B->A场景
    if (forceFocus) {
      doFocus = true // 如果存在forceFocus则在进行页面切换的时候也会执行 onFocus, 用于处理 A->B-> ...->A第二次A页面没有刷新的情况
    }
    if (doFocus) {
      onFocus()
    }
    return null // return snapshot
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    // define with getSnapshotBeforeUpdate
  }
  render () {
    const { style, ...restProps } = this.props
    const defaultStyle = {
      flex: 1,
      backgroundColor: appConfig.pageColor
    }
    return (
      <View
        style={[defaultStyle, style]}
        {...restProps}
      >
        {this.props.children}
      </View>
    )
  }
}

export default withNavigationFocus(Page)
