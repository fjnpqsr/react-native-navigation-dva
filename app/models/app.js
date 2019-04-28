
export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false
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
      dispatch({ type: 'loadStorage' })
    }
  }
}
