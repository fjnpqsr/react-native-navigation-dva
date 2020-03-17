
export default {
  namespace: 'app',

  state: {
    APPSTATE: 'active',
    num: 0
  },

  reducers: {
    update (state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {

    * loadStorage () {
      // app启动读取的本地数据储存初始化到APP中
    },
    * routerJump () {
      global.navigationRef.current.goBack()
    }
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    }
  }
}
