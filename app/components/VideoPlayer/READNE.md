# Video

#### dependencies

- `react-native-video`
- `react-native-orientation`
- `react-native-vector-icons`
- `react-native-linear-gradient`

### props

| props | desc | value | default |
| --- | --- | --- | --- |
| source | 资源配置 | `Object` | {} |
| title | 视频标题, 显示在播放器上部分, 超出自动隐藏 | `String` | '' |
| repeat | 循环播放 | `Boolean` | false |
| muted | 是否静音 | `Boolean` | false |
| autoPlay | 是否在加载完后自动播放 | `Boolean` | false |
| resizeMode | 适配模式 | `contain`, `cover`, `stretch` | `contain` |
| onLoad | 准备播放时调用的函数 | `Function` | null |
| onLoadStart | 媒体开始加载时调用的函数 | `Function` | null |
| onEnd | 播放完毕后调用的函数 | `Function` | null |
| onBack | 点击播放器的返回按钮调用的函数 | `Function` | null |
| autoHideControlsTimeout | 控制栏自动隐藏的延时 | `Number` | 10000 (ms) |
| enabledFullscreen | 是否启用全屏按钮 | `Boolean` | true |
| enabledBack | 是否启用返回按钮 | `Boolean` | true |
| extraComponent | 在最上层显示自定义组件 | `ReactComponent` | null |
| startTime | 视频的开始位置 | `Number` | 0 |
| showLoading | 控制视频在加载的时候是否需要显示loading | `Number` | 0 |

### apis

- `play`
- `pause`
- `replay`
- `toggleControls`
- `toggleFullScreen`
- `extra.show` // 自定义组件的控制显示
- `extra.hide` // 自定义组件的控制隐藏

通过 ref 挂在获取节点后可以通过 node.method()来调用播放器的内部方法

### state

- `paused`
- `isEnd`
- `fullscreen`
- `showControls`

通过 ref 挂在获取节点后可以通过 node.state.props来查看播放器内部的状态

当 !enabledBack && !title 的时候视频的上部份控制不会渲染

支持其他所有 [react-native-video](https://github.com/react-native-community/react-native-video) 的属性

PS: 

- Video组件的在zIndex最小值为500, 其他组件的在Index请勿超过500, 不然在全屏显示的时候回出现问题
