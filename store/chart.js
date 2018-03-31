import moment from 'moment'
export const state = () => ({
  data: {
    role: {
      labels: [],
      data: []
    },
    tag: {
      labels: [],
      data: []
    },
    bar: {
      labels: [],
      data: []
    }
  },
  colorSet: {
    roles: ['#2780c4', '#fccd32', '#c6c6c6'],
    tags: [
      '#2780c4', '#fccd32', '#f78731', '#e22d45', '#ce2970',
      '#954a97', '#59bae0', '#38a052', '#c6c6c6'
    ],
    bar: {
      backgroundColor: '#8FD8D8',
      borderColor: '#75afaf',
      borderWidth: 1.5
    }
  },
  options: {
    pie: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right'
      }
    },
    bar_and_line: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        xAxes: [{ barPercentage: 1 }],
        yAxes: [{ gridLines: { display: true } }]
      }
    }
  }
})

export const getters = {
  pieChart_roles (state) {
    return {
      labels: state.data.role.labels,
      datasets: [
        {
          backgroundColor: state.colorSet.roles,
          data: state.data.role.data
        }
      ]
    }
  },
  pieChart_tags (state) {
    return {
      labels: state.data.tag.labels,
      datasets: [
        {
          backgroundColor: state.colorSet.tags,
          data: state.data.tag.data
        }
      ]
    }
  },
  barChart (state) {
    return {
      labels: state.data.bar.labels,
      datasets: [
        {
          data: state.data.bar.data,
          backgroundColor: state.colorSet.bar.backgroundColor,
          borderColor: state.colorSet.bar.borderColor,
          borderWidth: state.colorSet.bar.borderWidth
        }
      ]
    }
  },
  lineChart (state) {
    return {
      labels: state.data.bar.labels,
      datasets: [
        {
          data: state.data.bar.data,
          backgroundColor: state.colorSet.bar.backgroundColor,
          borderColor: state.colorSet.bar.borderColor,
          fill: false
        }
      ]
    }
  },
  pieOptions (state) {
    return state.options.pie
  },
  barAndLineOptions (state) {
    return state.options.bar_and_line
  }
}

export const mutations = {
  setRole (state, roles) {
    state.data.role.labels = roles.map(role => role.role)
    state.data.role.data = roles.map(role => role.sum)
  },
  setTag (state, tags) {
    state.data.tag.labels = tags.map(tag => tag.tag.name)
    state.data.tag.data = tags.map(tag => tag.sum)
  },
  setWeekBar (state, data) {
    let sumData = new Array(7).fill(0)
    data.forEach(day => {
      sumData[moment(day.day, 'DD').day()] = day.sum
    })
    state.data.bar.labels = ['日', '一', '二', '三', '四', '五', '六']
    state.data.bar.data = sumData
  },
  setMonthBar (state, data) {
    let labels = new Array(moment().daysInMonth()).fill('')
    for (let day = 1; day <= moment().daysInMonth(); day++) {
      if ((day - 1) % 7 === 0) {
        labels[day - 1] = day.toString()
      }
    }
    let sumData = new Array(moment().daysInMonth()).fill(0)
    data.forEach(day => {
      sumData[day.day - 1] = day.sum
    })
    state.data.bar.labels = labels
    state.data.bar.data = sumData
  },
  setYearBar (state, data) {
    let sumData = []
    data.forEach(day => {
      sumData[data.month - 1] = data.sum
    })
    state.data.bar.labels = [...Array(12).keys()].map(v => 1 + v)
    state.data.bar.data = sumData
  }

}

export const actions = {
  async todayRole ({ commit }) {
    let response = await this.$axios.get('bill/today/role')
    commit('setRole', response.data)
  },
  async todayTag ({ commit }) {
    let response = await this.$axios.get('bill/today/tag')
    commit('setTag', response.data)
  },
  async weekBar ({ commit }) {
    let response = await this.$axios.get('bill/week')
    commit('setWeekBar', response.data)
  },
  async weekRole ({ commit }) {
    let response = await this.$axios.get('bill/week/role')
    commit('setRole', response.data)
  },
  async weekTag ({ commit }) {
    let response = await this.$axios.get('bill/week/tag')
    commit('setTag', response.data)
  },
  async monthBar ({ commit }) {
    let response = await this.$axios.get('bill/month')
    commit('setMonthBar', response.data)
  },
  async monthRole ({ commit }) {
    let response = await this.$axios.get('bill/month/role')
    commit('setRole', response.data)
  },
  async monthTag ({ commit }) {
    let response = await this.$axios.get('bill/month/tag')
    commit('setTag', response.data)
  },
  async yearBar ({ commit }) {
    let response = await this.$axios.get('bill/year')
    commit('setYearBar', response.data)
  },
  async yearRole ({ commit }) {
    let response = await this.$axios.get('bill/year/role')
    commit('setRole', response.data)
  },
  async yearTag ({ commit }) {
    let response = await this.$axios.get('bill/year/tag')
    commit('setTag', response.data)
  }
}
