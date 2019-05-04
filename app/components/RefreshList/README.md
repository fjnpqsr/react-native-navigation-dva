# RefreshList
----



### Apis

| props |  desc  | type  | default |
| --- | --- | --- | --- |
| data | dataSource for list render | `Array` | null |
| renderItem | function for item render | `function` | null |
| refresh | function for refresh | `function` | null |
| loadMore | function for loadMore | `function` | null |
| localProps | settings | `Object` | null |
| ListEmptyComponent | instead of default empty component | component | `<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{string}</Text></View>` |

support `react-native@FlatList` props

#### localProps

| props |  desc  | type  | default |
| --- | --- | --- | --- |
| footerRefreshingText | string of loadMore | `String` | `数据加载中…` |
| footerFailureText | string of loadMore failed | `String` | `点击重新加载` |
| footerNoMoreDataText | string of load all | `String` | `已加载全部数据` |
| footerEmptyDataText | string of empty data | `String` | `暂时没有相关数据` |
| LoadingComponent | instead of default loading component | component | null |
| NoMoreComponent | instead of default no-more component | component | null |
| FailComponent | instead of default load-failed component | component | null |



### Methods


- `refreshState(stateString, isScrollToTop)`
- `scrollTo()`
