import { DefaultTheme } from '@react-navigation/native'
// 配置React-Navigation提供的控件的主题颜色 (底部导航栏, 侧边抽屉等控件)
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffbc2d'
  }
}
