import React from 'react'
import {View, Text, StyleSheet, StatusBar, TouchableWithoutFeedback} from 'react-native'
import {Circle} from 'react-native-progress'
import { RNCamera } from 'react-native-camera';
import RNVideo from 'react-native-video';


class VideoRecorder extends React.Component {
	constructor(props) {
		super (props)
		this.state = {
			status: 0, // 0: 初始化, 1: 录制中, 2: 录制完成, 3: 录制取消, 4: 录制出错
			recordInfo: null,
			maxDuration: 5,
			recordProgress:0,
		}
		this.camera = null
		this.duration = 0
		this.durationTimer = null
		this.start = this.start.bind(this)
		this.reset = this.reset.bind(this)
	}
	componentDidMount () {
		StatusBar.setHidden(true)
	}
	componentWillUnmount () {
		StatusBar.setHidden(false)
	}
	start () {
		console.log('start <<<<<<<<<<<<<<<<<<<')
		this.setState({recordProgress: 0})
		const that = this
		const {maxDuration} = this.state
		this.durationTimer = setInterval(function () {
			that.duration = that.duration + 0.1
			const recordProgress = (that.duration / maxDuration).toFixed(2) - 0
			that.setState({recordProgress})
			if (that.duration >= that.state.maxDuration) {
				that.stop()
			}
		}, 100)
		this.camera.recordAsync().then(res=> {
			this.setState({recordInfo: res})
		})
	}
	stop () {
		if (this.state.status === 2) {
			return false
		}
		this.camera.stopRecording()
		this.setState({status: 2})
		console.log('stop >>>>>>>>>>>>>')
		this.duration = 0
		clearInterval(this.durationTimer)
		this.durationTimer = null
	}
	reset () {
		this.duration = 0
		this.setState({status: 0, recordProgress: 0, recordInfo: null})
	}
	render () {
		const NotAuthView = (
			<View style={css.notAllow}>
				<Text>相机权限未开启</Text>
			</View>
		)
		const {status, recordProgress, recordInfo } = this.state
		const finished = status === 2
		const ready = status === 0
		console.log(this)
		return (
			<View style={css.container}>
				<RNCamera
					type={RNCamera.Constants.Type.back}
					style={css.screen}
					ref={node => this.camera = node}
					notAuthorizedView={NotAuthView}
					pendingAuthorizationView={null}
					androidCameraPermissionOptions={null}
				/>
				{finished && recordInfo && (
					<View style={css.preview}>
						<RNVideo
							style={css.video}
							repeat
							source={{uri: recordInfo.uri}}
						/>
						<Text>233</Text>
					</View>
				)}
				<View style={css.controls}>
					{ready && (
						<View
							style={[css.button, {width: 120, height: 120, borderRadius: 60}]}
							onStartShouldSetResponder={() => true}
							onMoveShouldSetResponder={() => true}
							onResponderGrant={() => {this.start()}}
							onResponderRelease={() => {this.stop()}}
						>
							<Circle
								size={120}
								thickness={5}
								borderWidth={0}
								fill={'#fff'}
								progress={recordProgress}
							/>
						</View>
					)}
					{finished && (
						<TouchableWithoutFeedback
							onPress={this.reset}
						>
							<View
								style={css.button}
							>
								<Text>cancel</Text>
							</View>
						</TouchableWithoutFeedback>
					)}
					{finished && (
						<TouchableWithoutFeedback>
							<View style={css.button}>
								<Text>sure</Text>
							</View>
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
		position:'absolute',
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
		alignItems: 'center',
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
		height:80,
		width: 80,
		borderRadius: 40,
		marginHorizontal: 80,
		backgroundColor: '#fff'
	},

	notAllow: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent:'center'
	}
})

VideoRecorder.navigationOptions = {
	header: null
}
export default VideoRecorder