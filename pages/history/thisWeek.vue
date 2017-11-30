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
                <BarChart :data="chart.bar" :options="chart.options.bar"></BarChart>
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
                    <PieChart :data="chart.data1" :options="chart.options.pie"></PieChart>
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
                    <PieChart :data="chart.data2" :options="chart.options.pie"></PieChart>
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
          labels: ['一', '二', '三', '四', '五', '六', '日'],
          datasets: [
            {
              data: [10, 20, 50, 40, 100, 10, 0],
              backgroundColor: '#8FD8D8',
              borderColor: '#75afaf',
              borderWidth: 1.5
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
              yAxes: [{
                gridLines: {display: true}
              }]
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

