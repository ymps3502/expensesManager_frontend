<template>
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
        <v-list-tile v-for="item in time"
                      :key="item.title"
                      :to="item.to">
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      timeText: '今天',
      time: [
        {
          title: '今天',
          to: '/history'
        },
        {
          title: '本週',
          to: '/history/thisWeek'
        },
        {
          title: '本月',
          to: '/history/thisMonth'
        },
        {
          title: '今年',
          to: '/history/thisYear'
        }
      ]
    }
  }
  // computeds: {
  //   TimeText () {
  //     return $nuxt.$route.path
  //   }
  // }
}
</script>

