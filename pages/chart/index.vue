<template>
  <v-container fluid
               grid-list-md
               class="px-3">
    <v-layout row
              wrap>
      <v-flex xs12
              sm12
              md4>
        <v-card>
          <v-card-text>
            <v-list class="mb-0">
              <v-list-tile v-bind:key="index" v-for="(item, index) in accounts">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.role }}</v-list-tile-action-text>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.cost }} $</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-divider class="red darken-1"></v-divider>
            <h3 class="headline pt-2 mb-0 text-xs-right">總額 {{ totolPrice }} $</h3>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12
              sm12
              md8>
        <v-layout row
                  wrap>
          <v-flex xs12>
            <v-card>
              <v-container wrap>
                <v-layout>
                  <v-flex class="cell">
                    <pie-chart :data="chart.data1" :options="chart.options"></pie-chart>
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
                    <pie-chart :data="chart.data2" :options="chart.options"></pie-chart>
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
export default {
  components: {
    PieChart
  },
  data () {
    return {
      accounts: [
        { title: '早餐', role: '自己', cost: 10 },
        { title: '車費', role: '自己', cost: 20 },
        { title: '飲料', role: '女友', cost: 30 },
        { title: '早餐', role: '自己', cost: 10 },
        { title: '車費', role: '自己', cost: 20 },
        { title: '飲料', role: '女友', cost: 30 },
        { title: '早餐', role: '自己', cost: 10 },
        { title: '車費', role: '自己', cost: 20 },
        { title: '飲料', role: '女友', cost: 30 },
        { title: '晚餐', role: '自己', cost: 40 }
      ],
      chart: {
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
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'right'
          }
        }
      }
    }
  },
  computed: {
    totolPrice () {
      return this.accounts.reduce((previousValue, key) => {
        return previousValue + key.cost
      }, 0)
    }
  }
}
</script>

<style scoped>
.cell {
  min-width: 0;
}
</style>

