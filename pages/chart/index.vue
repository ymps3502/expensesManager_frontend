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
                  <v-list-tile-title>{{ item.tag }}</v-list-tile-title>
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
                    <pie-chart :data="chart.data1" :options="chart.options" v-if="chart.data1.isLoaded"></pie-chart>
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
                    <pie-chart :data="chart.data2" :options="chart.options" v-if="chart.data2.isLoaded"></pie-chart>
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
import { mapGetters } from 'vuex'
import PieChart from '@/components/PieChart.js'
export default {
  components: {
    PieChart
  },
  data () {
    return {
      chart: {
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
    ...mapGetters({
      totolPrice: 'bill/todayTotal',
      accounts: 'bill/today'
    })
  },
  async mounted () {
    this.$store.dispatch('bill/todayBill')

    let respRoleChart = await this.$axios.get('bill/today/role')
    respRoleChart.data.forEach(data => {
      this.chart.data1.labels.push(data.role)
      this.chart.data1.datasets[0].data.push(data.sum)
    })
    this.chart.data1.isLoaded = true

    let respTagChart = await this.$axios.get('bill/today/tag')
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

