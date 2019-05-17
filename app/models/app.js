import { Platform } from 'react-native'

export default {
  namespace: 'app',
  state: {
    STATE: null,
    isIos: Platform.OS === 'ios'
  },
  reducers: {
    update (state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {

  },
  subscriptions: {
    setup ({ dispatch }) {
    }
  }
}
