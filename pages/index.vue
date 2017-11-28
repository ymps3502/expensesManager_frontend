<template>
  <v-container fluid
               grid-list-md>
    <v-layout row
              wrap>
      <v-flex d-flex
              xs12>
        <v-toolbar class="white"
                   flat
                   prominent>
          <v-toolbar-title class="title grey--text">今天</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu :nudge-width="100" class="mr-2">
            <v-toolbar-title slot="activator"
                             class="body-2 grey--text">
              <span>時間</span>
              <v-icon>arrow_drop_down</v-icon>
            </v-toolbar-title>
            <v-list>
              <v-list-tile v-for="item in textTime"
                           :key="item"
                           @click="">
                <v-list-tile-title v-text="item"></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-flex>
      <v-flex xs12
              sm12
              md4>
        <v-card>
          <v-card-text>
            <v-list class="mb-0">
              <template v-for="(item, index) in accounts">
                <v-list-tile v-bind:key="index">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.action }} $</v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
            <v-divider class="grey darken-1"></v-divider>
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
                    <CommitChart :data="chart.data1" :options="chart.options"></CommitChart>
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
                    <CommitChart :data="chart.data2" :options="chart.options"></CommitChart>
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
import CommitChart from '../components/CommitChart.js'
export default {
  components: {
    CommitChart
  },
  data () {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      textTime: [
        '今天', '本週', '本月', '今年'
      ],
      accounts: [
        { title: '早餐', action: 10 },
        { title: '車費', action: 20 },
        { title: '飲料', action: 30 },
        { title: '晚餐', action: 40 }
      ],
      chart: {
        data1: {
          labels: ['自己', '女友', '其他'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#2780c4', '#fccd32', '#38a052'],
              data: [10, 20, 50]
            }
          ]
        },
        data2: {
          labels: ['正餐', '零食飲料', '車費', '食材', '儲值', '日用品', '生活費', '娛樂', '其他'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: ['#2780c4', '#fccd32', '#f78731', '#e22d45', '#ce2970', '#954a97', '#59bae0', '#38a052', '#c6c6c6'],
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
        return previousValue + key.action
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

