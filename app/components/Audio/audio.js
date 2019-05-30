import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { getDurationString } from '../VideoPlayer'
import Sound from 'react-native-sound'

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
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={this.togglePlay}
        >
          <View style={css.button}>
            <Text >sound status: {}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text>状态: {this.state.status}</Text>
        <Text>{getDurationString(currentTime)}: {getDurationString(duration)}</Text>
      </View>
    )
  }
}

const css = StyleSheet.create({
  button: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Audio
