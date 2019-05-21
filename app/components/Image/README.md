# Image components

> Image

base on `react-native/image` extends onPress event handle width `TouchOpacity` or `TouchWithoutFeedback`

- support all api of `react-native/image`

- touchOpacity: if this prop is true, user TouchOpacity to wrap feedback

- activeOpacity: config opacity rate of touchOpacity event

- onPress: handle press event

> AutoHeightImage

user image's width/height and screenWidth to calc final height

- support all api of `react-native/image`

- touchOpacity: if this prop is true, user TouchOpacity to wrap feedback

- activeOpacity: config opacity rate of touchOpacity event

- onPress: handle press event

- rate: lock the rate , not use the image's width/height 

- wingBlank: screenWidth reduce double this value for height, means calcWidth = screenWidth - 2*wingBlank

- maxWidth: user this value instead of screenWidth for height