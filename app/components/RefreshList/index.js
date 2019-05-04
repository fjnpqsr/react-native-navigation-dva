import React from 'react'
import { FlatList, Text, ActivityIndicator, View } from 'react-native'

export const RefreshState = {
  Idle: 0,
  Refreshing: 1,
  Loading: 2,
  NoMore: 3,
  Fail: 4,
  Empty: 5
}

class RefreshList extends React.Component {
  constructor (props) {
    console.log({ props })
    const { localProps = {} } = props
    super(props)
    this.refreshList = null
    this.state = {
      refreshState: RefreshState.Idle,
      localProps: {
        footerRefreshingText: '数据加载中…',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据',
        footerEmptyDataText: '暂时没有相关数据',
        ...localProps
      }
    }
    this.shouldStartRefreshing = this.shouldStartRefreshing.bind(this)
    this.shouldStartLoad = this.shouldStartLoad.bind(this)
    this.refreshState = this.refreshState.bind(this)
    this.onRefreshing = this.onRefreshing.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }
  shouldStartRefreshing () {
    const { refreshState } = this.state
    return !(refreshState === RefreshState.Refreshing || refreshState === RefreshState.Loading)
  }
  shouldStartLoad () {
    const { refreshState } = this.state
    const { data = [] } = this.props
    if (data.length === 0) {
      return false
    }
    return refreshState === RefreshState.Idle
  }
  onRefreshing () {
    const { refresh } = this.props
    if (this.shouldStartRefreshing() && refresh) {
      this.setState({ refreshState: RefreshState.Refreshing })
      refresh(this.refreshState)
    }
  }
  onLoadMore () {
    const { loadMore } = this.props
    if (this.shouldStartLoad() && loadMore) {
      console.log('start loading ...')
      this.setState({ refreshState: RefreshState.Loading })
      loadMore(this.refreshState)
    }
  }
  // 提供外部控制refreshState的方法
  refreshState (stateStr) {
    let _state = RefreshState.Idle
    switch (stateStr) {
      case 'NOMORE':
        _state = RefreshState.NoMore
        break
      case 'Fail':
        _state = RefreshState.Fail
        break
      case 'Empty':
        _state = RefreshState.Empty
        break
      case 'Refresh':
        _state = RefreshState.Refreshing
        break
      case 'Loading':
        _state = RefreshState.Loading
        break
    }
    this.setState({ refreshState: _state })
  }

  renderFooter () {
    let footer = null
    const { refreshState, localProps = {} } = this.state
    const { LoadingComponent, NoMoreComponent, FailComponent, EmptyComponent } = localProps
    const style = { height: 44, lineHeight: 44, textAlign: 'center', marginLeft: 12 }
    switch (refreshState) {
      case RefreshState.Loading:
        footer = LoadingComponent || (
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='small' color='#888888' />
            <Text style={style}>{localProps.footerRefreshingText}</Text>
          </View>
        )
        break
      case RefreshState.NoMore:
        footer = NoMoreComponent || (
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={style}>{localProps.footerNoMoreDataText}</Text>
          </View>
        )
        break
      case RefreshState.Fail:
        footer = FailComponent || (
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={style}>{localProps.footerFailureText}</Text>
          </View>
        )
        break
      case RefreshState.Empty:
        footer = EmptyComponent || (
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={style}>{localProps.footerEmptyDataText}</Text>
          </View>
        )
        break
      default:
        return null
    }
    return footer
  }

  render () {
    const { refreshState } = this.state
    console.log({ refreshState })
    let { renderItem, ...rest } = this.props
    return (
      <FlatList
        ref={(node) => { this.refreshList = node }}
        onEndReached={this.onLoadMore}
        onRefresh={this.onRefreshing}
        refreshing={refreshState === RefreshState.Refreshing || refreshState === RefreshState.loading}
        ListFooterComponent={() => { return this.renderFooter() }}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        {...rest}
      />
    )
  }
}

export default RefreshList
