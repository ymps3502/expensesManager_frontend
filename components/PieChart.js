import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['data', 'options'],
  mounted () {
    this.addPlugin({
      id: 'my-plugin',
      afterDraw: (chart) => {
        if (chart.data.datasets[0].data.length === 0) {
          // No data is present
          let ctx = chart.chart.ctx
          let width = chart.chart.width
          let height = chart.chart.height
          chart.clear()
          ctx.save()
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.font = '18px Noto Sans TC'
          ctx.fillText('無資料', width / 2, height / 2)
          ctx.restore()
        }
      }
    })
    this.renderChart(this.data, this.options)
  }
}
