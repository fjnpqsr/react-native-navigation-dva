import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import { getDurationString } from '../VideoPlayer'
import Sound from 'react-native-sound'

const AUDIOPLAYSTYLE_1 = require('./icon_audio_play_1.png')
const AUDIOPLAYSTYLE_2 = require('./icon_audio_play_2.png')
const AUDIOPLAYSTYLE_3 = require('./icon_audio_play_3.png')

const getPlayStyle = (time) => {
  if (time === 0) {
    return AUDIOPLAYSTYLE_3
  }
  switch (time % 3) {
    case 0:
      return AUDIOPLAYSTYLE_3
    case 1:
      return AUDIOPLAYSTYLE_1
    case 2:
      return AUDIOPLAYSTYLE_2
  }
}

const getWidth = (duration) => {
  let width = 80
  if (duration > 10) {
    width = 80 + Math.floor((duration - 10) / 10) * 5
  }
  if (width > 200) {
    width = 200
  }
  return width
}

class Audio extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: 0,
      duration: null,
      channels: null,
      status: 'prepare'
    }
    this.sound = null
    this.progress = null
    this.play = this.play.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
    this.init = this.init.bind(this)
    // this.pause = this.pause.bind(this)
    this.addListener = this.addListener.bind(this)
    this.removeListener = this.removeListener.bind(this)
  }
  componentDidMount () {
    this.init()
  }
  componentWillUnmount () {
    this.sound && this.sound.release()
    this.removeListener()
  }

  componentWillReceiveProps (nextProps, nextContext) {
    console.log({ nextProps, nextContext })
  }

  init () {
    const that = this
    const { src } = this.props
    this.sound = new Sound(src, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        this.setState({ status: 'loadError' })
        return false
      }
      // sound loaded
      console.log('audio loaded success')
      const duration = that.sound.getDuration()
      const channels = that.sound.getNumberOfChannels()
      this.setState({ duration: Math.floor(duration), channels })
    })
  }
  play () {
    if (!this.sound) {
      this.init()
    }
    this.setState({ status: 'play' })
    this.sound.play((success) => {
      if (success) {
        console.log('successfully finished playing')
        this.stop()
      } else {
        console.log('playback failed due to audio decoding errors')
        this.setState({ status: 'playError' })
        this.removeListener()
      }
    })
    if (!this.progress) {
      this.addListener()
    }
  }
  // 监听当前时间
  addListener () {
    const that = this
    this.progress = setInterval(function () {
      that.sound.getCurrentTime((seconds) => {
        that.setState({ currentTime: Math.ceil(seconds) })
      })
    }, 1000)
  }
  removeListener () {
    clearTimeout(this.progress)
    this.progress = null
  }
  stop () {
    const { loop = true } = this.props
    this.sound.stop(() => {
      console.log('end....')
      if (loop) {
        this.sound.setCurrentTime(0)
        this.setState({ currentTime: 0 })
      }
      this.setState({ status: 'end' })
    })
    this.removeListener()
  }
  // not use
  // pause () {
  //   this.sound.pause()
  //   this.removeListener()
  //   this.setState({ status: 'pause' })
  // }
  togglePlay () {
    const { status } = this.state
    if (status === 'play') {
      this.stop()
      return false
    }
    this.play()
  }

  render () {
    console.log(this.sound, this.state)
    const { duration, currentTime } = this.state

    const { style, backgroundColor = '#eee' } = this.props
    return (
      <View>
        <View style={[css.container, style]}>
          <TouchableWithoutFeedback
            onPress={this.togglePlay}
          >
            <View style={[css.audio, { backgroundColor: backgroundColor }, { width: getWidth(duration) }]}>
              <View style={[css.arrow, { borderRightColor: backgroundColor }]} />
              <Image
                style={css.playStyle}
                source={getPlayStyle(currentTime)}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={css.audioText}>{`${duration}"`}</Text>
        </View>
        {/* <Text>状态: {this.state.status}</Text> */}
        {/* <Text>{getDurationString(currentTime)}: {getDurationString(duration)}</Text> */}
      </View>
    )
  }
}

const css = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 4
  },
  audio: {
    height: 30,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative'
  },
  audioText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 12
  },
  playStyle: {
    width: 12,
    height: 12,
    marginLeft: 12
  },
  arrow: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderRightWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    position: 'absolute',
    left: -14,
    top: 11,
    zIndex: 10
  }
})

export default Audio
