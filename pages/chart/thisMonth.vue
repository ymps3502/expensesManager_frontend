<template>
  <v-container fluid
               grid-list-md>
    <v-layout row
              wrap>
      <v-flex xs12
              sm12
              md5>
        <v-card>
          <v-container wrap>
            <v-layout>
              <v-flex class="cell">
                <line-chart :data="chart.line" :options="chart.options.line" v-if="chart.line.isLoaded"></line-chart>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12
              sm12
              md7>
        <v-layout row
                  wrap>
          <v-flex xs12>
            <v-card>
              <v-container wrap>
                <v-layout>
                  <v-flex class="cell">
                    <pie-chart :data="chart.data1" :options="chart.options.pie" v-if="chart.data1.isLoaded"></pie-chart>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-container>
                <v-layout>
                  <v-flex class="cell">
                    <pie-chart :data="chart.data2" :options="chart.options.pie" v-if="chart.data2.isLoaded"></pie-chart>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import moment from 'moment'
import PieChart from '@/components/PieChart.js'
import LineChart from '@/components/LineChart.js'
export default {
  components: {
    PieChart,
    LineChart
  },
  data () {
    return {
      chart: {
        line: {
          isLoaded: false,
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: '#8FD8D8',
              borderColor: '#75afaf',
              fill: false
            }
          ]
        },
        data1: {
          isLoaded: false,
          labels: [],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#2780c4', '#fccd32', '#c6c6c6'],
              data: []
            }
          ]
        },
        data2: {
          isLoaded: false,
          labels: [],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: [
                '#2780c4',
                '#fccd32',
                '#f78731',
                '#e22d45',
                '#ce2970',
                '#954a97',
                '#59bae0',
                '#38a052',
                '#c6c6c6'
              ],
              data: []
            }
          ]
        },
        options: {
          pie: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              position: 'right'
            }
          },
          line: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{ barPercentage: 1 }],
              yAxes: [{ gridLines: { display: true } }]
            }
          }
        }
      }
    }
  },
  async mounted () {
    this.chart.line.labels = new Array(moment().daysInMonth()).fill('')
    for (let day = 1; day <= moment().daysInMonth(); day++) {
      if ((day - 1) % 7 === 0) {
        this.chart.line.labels[day - 1] = day.toString()
      }
    }
    this.chart.line.datasets[0].data = new Array(moment().daysInMonth()).fill(0)
    let respLine = await this.$axios.get('bill/month')
    respLine.data.forEach(data => {
      this.chart.line.datasets[0].data[data.day - 1] = data.sum
    })
    this.chart.line.isLoaded = true

    let respRoleChart = await this.$axios.get('bill/month/role')
    respRoleChart.data.forEach(data => {
      this.chart.data1.labels.push(data.role)
      this.chart.data1.datasets[0].data.push(data.sum)
    })
    this.chart.data1.isLoaded = true

    let respTagChart = await this.$axios.get('bill/month/tag')
    respTagChart.data.forEach(data => {
      this.chart.data2.labels.push(data.tag.name)
      this.chart.data2.datasets[0].data.push(data.sum)
    })
    this.chart.data2.isLoaded = true
  }
}
</script>

<style scoped>
.cell {
  min-width: 0;
}
</style>

