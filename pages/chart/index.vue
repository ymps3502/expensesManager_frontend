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
export default {
  components: {
    PieChart
  },
  data () {
    return {
      isLoaded: {
        role: false,
        tag: false
      }
    }
  },
  computed: {
    ...mapGetters({
      totolPrice: 'bill/todayTotal',
      accounts: 'bill/today',
      pieOptions: 'chart/pieOptions',
      pieRoleData: 'chart/pieChart_roles',
      pieTagData: 'chart/pieChart_tags'
    })
  },
  mounted () {
    this.$store.dispatch('bill/todayBill')
    this.$store.dispatch('chart/todayRole').then(() => {
      this.isLoaded.role = true
    })
    this.$store.dispatch('chart/todayTag').then(() => {
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

