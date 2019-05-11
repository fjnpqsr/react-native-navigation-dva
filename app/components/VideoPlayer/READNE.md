# Video Player 
---

| props | desc | type | default |
| --- | --- | --- | --- |
| source | 资源属性 | `Object` | null |
| resizeMode | 视频与背景大小不一样的时候的显示模式 | `String` |  "contain' |
| title | 视屏顶部的标题 | `String` | '' |
| theme | 主题颜色配置 | `Object` | defaultThem |
| controlsTheme | 控制栏的主题配置 | `Object` | defaultThem |

---
# defaultTheme
以下是支持修改的主题样式
```
const defaultVideoTheme = {
  height: 280,
  backgroundColor: '#000'
  // ...theme props
}

const defaultControlsTheme = {
  header: {
    backgroundColor: 'rgba(0,0,0,.8)',
    height: 40,
    color: '#fff',
    fontSize: 12
  },
  footer: {
    backgroundColor: 'rgba(0,0,0,.8)',
    height: 40,
    color: '#fff',
    fontSize: 12
  },
  icon: { color: '#fff' }
  // ...controlsTheme props
}
```
---