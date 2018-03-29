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
                <bar-chart :data="chart.bar" :options="chart.options.bar" v-if="chart.bar.isLoaded"></bar-chart>
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
import PieChart from '@/components/PieChart.js'
import BarChart from '@/components/BarChart.js'
export default {
  components: {
    PieChart,
    BarChart
  },
  data () {
    return {
      chart: {
        bar: {
          isLoaded: false,
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          datasets: [
            {
              data: [],
              backgroundColor: '#8FD8D8',
              borderColor: '#75afaf',
              borderWidth: 1.5
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
          bar: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{ barPercentage: 1 }],
              yAxes: [{
                gridLines: {display: true}
              }]
            }
          }
        }
      }
    }
  },
  async mounted () {
    let respBar = await this.$axios.get('bill/year')
    respBar.data.forEach(data => {
      this.chart.bar.datasets[0].data[data.month - 1] = data.sum
    })
    this.chart.bar.isLoaded = true

    let respRoleChart = await this.$axios.get('bill/year/role')
    respRoleChart.data.forEach(data => {
      this.chart.data1.labels.push(data.role)
      this.chart.data1.datasets[0].data.push(data.sum)
    })
    this.chart.data1.isLoaded = true

    let respTagChart = await this.$axios.get('bill/year/tag')
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

