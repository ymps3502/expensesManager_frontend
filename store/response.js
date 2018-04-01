export const state = () => ({
  msg: '',
  status: 'info',
  show: false
})

export const getters = {
  msg (state) {
    return state.msg
  },
  color (state) {
    switch (state.status) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      default:
        return 'info'
    }
  },
  show (state) {
    return state.show
  }
}

export const mutations = {
  setMsg (state, msg) {
    state.msg = msg
  },
  setStatus (state, status) {
    state.status = status
  },
  setShow (state, bool) {
    state.show = bool
  }
}

// export const actions = {

// }
