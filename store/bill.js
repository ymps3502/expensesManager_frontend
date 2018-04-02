import moment from 'moment'

export const state = () => ({
  allBill: [],
  tagBill: [],
  todayBill: [],
  weekBill: [],
  monthBill: [],
  yearBill: []
})

export const getters = {
  history (state) {
    let item = []
    state.allBill.forEach(bill => {
      item.push({
        value: false,
        time: moment(bill.time).format('YYYY-MM-DD hh:mma'),
        role: bill.role,
        tag: bill.tag,
        subtag: bill.subtag,
        cost: bill.cost,
        note: bill.note,
        id: bill.id
      })
    })
    return item
  },
  today (state) {
    let item = []
    state.todayBill.forEach(bill => {
      item.push({
        tag: bill.tag.name,
        role: bill.role,
        cost: bill.cost
      })
    })
    return item
  },
  todayTotal (state) {
    return state.todayBill.reduce((previousValue, key) => {
      return previousValue + key.cost
    }, 0)
  },
  tag (state) {
    let item = []
    state.tagBill.forEach(bill => {
      item.push({
        value: false,
        time: moment(bill.time).format('YYYY-MM-DD hh:mma'),
        role: bill.role,
        tag: bill.tag,
        subtag: bill.subtag,
        cost: bill.cost,
        note: bill.note,
        id: bill.id
      })
    })
    return item
  }
}

export const mutations = {
  setAllBill (state, bill) {
    state.allBill = bill
  },
  setTodayBill (state, bill) {
    state.todayBill = bill
  },
  setWeekBill (state, bill) {
    state.weekBill = bill
  },
  setMonthBill (state, bill) {
    state.monthBill = bill
  },
  setYearBill (state, bill) {
    state.yearBill = bill
  },
  setTagBill (state, bill) {
    state.tagBill = bill
  }
}

export const actions = {
  async allBill ({ commit }) {
    let response = await this.$axios.get('bill/all')
    commit('setAllBill', response.data)
  },
  async todayBill ({ commit }) {
    let response = await this.$axios.get('bill/today')
    commit('setTodayBill', response.data)
  },
  async weekBill ({ commit }) {
    let response = await this.$axios.get('bill/week')
    commit('setWeekBill', response.data)
  },
  async monthBill ({ commit }) {
    let response = await this.$axios.get('bill/month')
    commit('setMonthBill', response.data)
  },
  async yearBill ({ commit }) {
    let response = await this.$axios.get('bill/year')
    commit('setYearBill', response.data)
  },
  async tagBill ({ commit }, id) {
    let response = await this.$axios.get('bill/tag/' + id)
    commit('setTagBill', response.data)
  },
  async addBill ({dispatch}, form) {
    await this.$axios.post('bill/add', form)
      .then(response => {
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  },
  async updateBill ({dispatch}, form) {
    await this.$axios.put('bill/update/' + form.id, form)
      .then(response => {
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  },
  async deleteBill ({dispatch}, billsID) {
    await this.$axios.delete('bill/delete', {params: {'id': billsID}})
      .then(response => {
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  }
}
