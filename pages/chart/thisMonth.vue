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
                <line-chart :data="lineData" :options="lineOptions" v-if="isLoaded.line"></line-chart>
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
                    <pie-chart :data="pieRoleData" :options="pieOptions" v-if="isLoaded.role"></pie-chart>
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
                    <pie-chart :data="pieTagData" :options="pieOptions" v-if="isLoaded.tag"></pie-chart>
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
import LineChart from '@/components/LineChart.js'
export default {
  components: {
    PieChart, LineChart
  },
  data () {
    return {
      isLoaded: {
        line: false,
        role: false,
        tag: false
      }
    }
  },
  computed: {
    ...mapGetters({
      lineData: 'chart/lineChart',
      lineOptions: 'chart/barAndLineOptions',
      pieRoleData: 'chart/pieChart_roles',
      pieTagData: 'chart/pieChart_tags',
      pieOptions: 'chart/pieOptions'
    })
  },
  mounted () {
    this.$store.dispatch('chart/monthBar').then(() => {
      this.isLoaded.line = true
    })
    this.$store.dispatch('chart/monthRole').then(() => {
      this.isLoaded.role = true
    })
    this.$store.dispatch('chart/monthTag').then(() => {
      this.isLoaded.tag = true
    })
  }
}
</script>

<style scoped>
.cell {
  min-width: 0;
}
</style>

