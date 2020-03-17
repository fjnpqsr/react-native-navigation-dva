import { Dimensions, PixelRatio } from 'react-native'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
// 设计稿的尺寸
const designWidth = 750
const designHeight = 1334
// PixelRatio值
const pxr = PixelRatio.get()

const dp2Px = (dp) => PixelRatio.getPixelSizeForLayoutSize(dp)
const px2dp = (px) => PixelRatio.roundToNearestPixel(px)

/**
 *
 * @param px 设计稿对应的px单位
 */
export const pxW = (px) => {
  // 计算屏幕宽度px单位尺寸与设计稿宽度的px单位尺寸的缩放比例
  const scaleW = dp2Px(screenWidth) / designWidth
  //  计算缩放后的px数据
  const scalePx = px * scaleW
  // 根据PixelRatio值计算在页面中显示的实际UI值
  const finalPx = scalePx / pxr
  // 通过PixelRatio.roundToNearestPixel函数将实际UI值转为dp为单位的值
  return px2dp(finalPx)
}
// 同上
export const pxH = (px) => {
  const scaleH = dp2Px(screenHeight) / designHeight
  const scalePx = px * scaleH
  const finalPx = scalePx / pxr
  return px2dp(finalPx)
}

/**
 * 校验适配结果
 * 布局一个同设备宽的VIEW(750*1334, 就创建750), 查看转换后的dp值与screenWidth是否相同
 */

export const UIAdaptInfo = {
  designWidth,
  designHeight,
  PixelRatio: pxr
}
