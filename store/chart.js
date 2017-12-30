export const state = () => ({
  expanses: [],
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
  totolPrice (state) {
    // need expenses structure
    return null
  },
  pieChart_roles (state) {
    // labels and data must be analysis from expenses
    let labels = ['自己']
    let data = [10]
    return {
      labels,
      datasets: [
        {
          backgroundColor: state.colorSet.roles,
          data
        }
      ]
    }
  },
  pieChart_tags (state) {
    // labels and data must be analysis from expenses
    let labels = ['正餐']
    let data = [10]
    return {
      labels,
      datasets: [
        {
          backgroundColor: state.colorSet.tags,
          data
        }
      ]
    }
  },
  barChart (state) {
    let labels = [1, 2, 3, 4, 5, 6, 7, 8, 9] // need week or month
    let data = [10]
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: state.bar.backgroundColor,
          borderColor: state.bar.borderColor,
          borderWidth: state.bar.borderWidth
        }
      ]
    }
  },
  lineChart (state) {
    /**
     * labels 為該月日期陣列，需列頭尾日期，每週為間隔，其餘補空字串
     * ex: ['1', '', '', '', '', '',
            '7', '', '', '', '', '',
            '14', '', '', '', '', '',
            '21', '', '', '', '', '',
            '28', '', '']
    */
    let labels = [10]
    let data = [10]
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: state.bar.backgroundColor,
          borderColor: state.bar.borderColor,
          fill: false
        }
      ]
    }
  }
}

export const mutations = {
  setExpenses (state, expenses) {
    state.expenses = expenses
  }
}

// export const actions = {
//   getExpenses (context, timeRange) {

//   }
// }
