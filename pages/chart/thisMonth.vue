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
                <line-chart :data="chart.line" :options="chart.options.bar"></line-chart>
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
                    <pie-chart :data="chart.data1" :options="chart.options.pie"></pie-chart>
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
                    <pie-chart :data="chart.data2" :options="chart.options.pie"></pie-chart>
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
          labels: [
            '1', '', '', '', '', '',
            '7', '', '', '', '', '',
            '14', '', '', '', '', '',
            '21', '', '', '', '', '',
            '28', '', ''
          ],
          datasets: [
            {
              data: [1, 2, 3, 4, 4, 5, 3, 4, 8, 2, 45, 2, 8, 9, 3],
              backgroundColor: '#8FD8D8',
              borderColor: '#75afaf',
              fill: false
            }
          ]
        },
        data1: {
          labels: ['自己', '女友', '其他'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#2780c4', '#fccd32', '#c6c6c6'],
              data: [10, 20, 50]
            }
          ]
        },
        data2: {
          labels: ['正餐', '零食飲料', '車費', '食材', '儲值', '日用品', '生活費', '娛樂', '其他'],
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
              data: [10, 20, 30, 40, 10, 20, 50, 40, 60]
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
              yAxes: [{ gridLines: { display: true } }]
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.cell {
  min-width: 0;
}
</style>

