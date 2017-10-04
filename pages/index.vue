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
          <v-menu :nudge-width="100">
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
      <v-flex d-flex
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
      <v-flex d-flex
              sm12
              md8>
        <v-layout row
                  wrap>
          <v-flex d-flex>
            <v-card>
              <v-card-text v-text="lorem.slice(0, 70)">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card>
              <v-card-text v-text="lorem.slice(0, 70)">
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
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
      ]
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
