import React from 'react'
import { View, Text, StyleSheet, StatusBar, TouchableWithoutFeedback, Image } from 'react-native'
import { Circle } from 'react-native-progress'
import { RNCamera } from 'react-native-camera'
import RNVideo from 'react-native-video'
import RNThumbnail from 'react-native-thumbnail'
import { AudioUtils } from 'react-native-audio'

class VideoRecorder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 0, // 0: 初始化, 1: 录制中, 2: 录制完成, 3: 录制取消, 4: 录制出错
      recordInfo: null,
      maxDuration: props.maxDuration || 15,
      recordProgress: 0,
      cameraType: RNCamera.Constants.Type.back
    }
    this.camera = null
    this.duration = 0
    this.durationTimer = null
    this.start = this.start.bind(this)
    this.reset = this.reset.bind(this)
    this.toggleCamera = this.toggleCamera.bind(this)
  }
  componentDidMount () {
    StatusBar.setHidden(true)
  }
  componentWillUnmount () {
    StatusBar.setHidden(false)
  }
  toggleCamera () {
    const { status, cameraType } = this.state
    if (status !== 0) {
      return false
    }
    if (cameraType === RNCamera.Constants.Type.back) {
      this.setState({ cameraType: RNCamera.Constants.Type.front })
    } else if (cameraType === RNCamera.Constants.Type.front) {
      this.setState({ cameraType: RNCamera.Constants.Type.back })
    }
  }
  start () {
    console.log('start <<<<<<<<<<<<<<<<<<<')
    this.setState({ recordProgress: 0 })
    const that = this
    const { maxDuration } = this.state
    const { onFinished = () => {}, onBeforeRecord = () => {} } = this.props
    onBeforeRecord && onBeforeRecord()
    this.durationTimer = setInterval(function () {
      that.duration = that.duration + 0.1
      const recordProgress = (that.duration / maxDuration).toFixed(2) - 0
      that.setState({ recordProgress })
      if (that.duration >= that.state.maxDuration) {
        that.stop()
      }
    }, 100)
    this.camera.recordAsync({
      // 配置录制缓存文件存放的位置
      // path: AudioUtils.DocumentDirectoryPath + '/cache.mp4'
    }).then(res => {
      this.setState({ recordInfo: res })
      onFinished && onFinished(res)
      RNThumbnail.get(res.uri).then(data => {
        console.log({ data }, 'RNThumbnail')
      })
    })
  }
  stop () {
    if (this.state.status === 2) {
      return false
    }
    this.camera.stopRecording()
    this.setState({ status: 2 })
    console.log('stop >>>>>>>>>>>>>')
    this.duration = 0
    clearInterval(this.durationTimer)
    this.durationTimer = null
  }
  reset () {
    this.duration = 0
    this.setState({ status: 0, recordProgress: 0, recordInfo: null })
  }
  render () {
    const NotAuthView = (
      <View style={css.notAllow}>
        <Text>相机权限未开启</Text>
      </View>
    )
    const { status, recordProgress, recordInfo, cameraType } = this.state
    const { onClose = () => {}, repeatPreview = true, onOk = () => {}, ...extraProps } = this.props
    const finished = status === 2
    const ready = status === 0
    console.log(this)
    return (
      <View style={css.container}>
        <RNCamera
          {...extraProps}
          type={cameraType}
          style={css.screen}
          ref={node => { this.camera = node }}
          notAuthorizedView={NotAuthView}
          pendingAuthorizationView={null}
          androidCameraPermissionOptions={null}
        >
          <TouchableWithoutFeedback
            onPress={onClose}
          >
            <View style={css.close}>
              <Image source={require('./assets/icon_close.png')} style={{ width: 25, height: 25 }} />
            </View>
          </TouchableWithoutFeedback>
          {ready && (
            <TouchableWithoutFeedback
              onPress={this.toggleCamera}
            >
              <View style={css.toggleFront}>
                <Image source={require('./assets/icon_camera_type_change.png')} style={{ width: 28, height: 25 }} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </RNCamera>
        {finished && recordInfo && (
          <View style={css.preview}>
            <RNVideo
              style={css.video}
              repeat={repeatPreview}
              source={{ uri: recordInfo.uri }}
              resizeMode={'cover'}
            />
          </View>
        )}
        <View style={css.controls}>
          {ready && (
            <View
              style={[css.button, { width: 120, height: 120, borderRadius: 60 }]}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={() => { this.start() }}
              onResponderRelease={() => { this.stop() }}
            >
              <View
                style={{
                  width: 110,
                  height: 110,
                  margin: 5,
                  borderWidth: 5,
                  borderColor: '#000',
                  borderRadius: 55,
                  position: 'absolute'
                }}
              />
              <Circle
                size={120}
                thickness={5}
                borderWidth={0}
                color={'#ffbc2d'}
                progress={recordProgress}
              />
            </View>
          )}
          {/* 取消按钮, 重新录制 */}
          {finished && (
            <TouchableWithoutFeedback
              onPress={this.reset}
            >
              <Image
                style={css.button}
                source={require('./assets/icon_back.png')}
              />
            </TouchableWithoutFeedback>
          )}
          {/* 确定按钮, 完成录制并执行相应动作 */}
          {finished && (
            <TouchableWithoutFeedback
              onPress={() => { onOk(recordInfo) }}
            >
              <Image
                style={css.button}
                source={require('./assets/icon_confirm.png')}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    )
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'column'
  },
  preview: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: '#000',
    zIndex: 50
  },
  video: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 60
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    width: '100%',
    height: 240,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    marginHorizontal: 80,
    backgroundColor: '#fff'
  },

  notAllow: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  close: {
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    zIndex: 110
  },
  toggleFront: {
    width: 56,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    zIndex: 110
  }
})

VideoRecorder.navigationOptions = {
  header: null
}
export default VideoRecorder
