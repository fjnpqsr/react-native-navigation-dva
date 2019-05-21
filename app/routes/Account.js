import React from 'react'
import { Page, AutoHeightImage } from '../components'

const Account = () => {
  return (
    <Page>
      <AutoHeightImage
        onPress={() => {
          console.log('1')
        }}
        source={{ uri: 'http://i8.17173.itc.cn/v3/dota2/2013/09/25/092516404566438102.jpg' }}
      />
      <AutoHeightImage
        onPress={() => {
          console.log('1')
        }}
        touchOpacity
        activeOpacity={0.8}
        style={{ marginTop: 12 }}
        wingBlank={15}
        source={{ uri: 'http://i8.17173.itc.cn/v3/dota2/2013/09/25/092516404566438102.jpg' }}
      />
    </Page>
  )
}

export default Account
