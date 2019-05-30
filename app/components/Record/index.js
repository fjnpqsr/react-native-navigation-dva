import { AudioRecorder, AudioUtils } from 'react-native-audio'
import Sound from 'react-native-sound'

async function _record () {
  ReactRecord.prepareRecordingPath()
  try {
    await AudioRecorder.startRecording()
  } catch (error) {
    console.error(error)
  }
}

async function _pause () {
  try {
    await AudioRecorder.pauseRecording()
  } catch (error) {
    console.error(error)
  }
}

async function _stop () {
  try {
    const filePath = await AudioRecorder.stopRecording()
    console.log(filePath)
    return filePath
  } catch (error) {
    console.error(error)
  }
}

async function _resume () {
  try {
    await AudioRecorder.resumeRecording()
  } catch (error) {
    console.error(error)
  }
}

async function _play (path) {
  console.log(path, '>>>>>>>>>>>>>>>>')
  setTimeout(() => {
    const sound = new Sound(path, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error)
      }
    })

    setTimeout(() => {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
    }, 100)
  }, 100)
}

const ReactRecord = {
  path: AudioUtils.DocumentDirectoryPath + '/test.aac',
  config: {
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: 'Low',
    AudioEncoding: 'aac',
    AudioEncodingBitRate: 32000
  },
  init: (props = {}) => {
    const { path = ReactRecord.path, configs = {}, onProgress, onFinished, onError } = props
    if (path) {
      ReactRecord.path = path
    }
    if (configs) {
      ReactRecord.configs = configs
    }
    console.log({ props })
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      console.log({ isAuthorised }, '录音权限')
      // 处理授权失败的问题
      if (!isAuthorised) {
        onError && onError({ isAuthorised: isAuthorised })
        return false
      }
      // 配置监听进度函数
      AudioRecorder.onProgress = (data) => {
        onProgress && onProgress(data)
      }
      // 配置录制结束函数
      AudioRecorder.onFinished = (data) => {
        onFinished && onFinished(data)
      }
    })
  },
  prepareRecordingPath: (audioPath = ReactRecord.path) => {
    AudioRecorder.prepareRecordingAtPath(audioPath, ReactRecord.config)
  },
  record: _record,
  pause: _pause,
  stop: _stop,
  play: _play,
  resume: _resume
}

export default ReactRecord
