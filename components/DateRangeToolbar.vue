<template>
  <v-toolbar class="white"
              flat
              prominent>
    <v-toolbar-title class="title grey--text">{{ timeText }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu :nudge-width="100" class="mr-2">
      <v-toolbar-title slot="activator"
                        class="body-2 grey--text">
        <span>時間</span>
        <v-icon>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-group v-for="item in time"
                      :key="item.title">
          <v-list-tile slot="item"
                        :to="item.to">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      time: [
        {
          title: '今天',
          to: '/chart'
        },
        {
          title: '本週',
          to: '/chart/thisWeek'
        },
        {
          title: '本月',
          to: '/chart/thisMonth'
        },
        {
          title: '今年',
          to: '/chart/thisYear'
        }
      ]
    }
  },
  computed: {
    timeText () {
      let path = this.$route.path.split('/').pop()
      switch (path) {
        case 'thisWeek':
          return '本週'
        case 'thisMonth':
          return '本月'
        case 'thisYear':
          return '今年'
        default:
          return '今天'
      }
    }
  }
}
</script>

