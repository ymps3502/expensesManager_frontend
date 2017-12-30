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
        <v-list-tile v-for="item in time"
                      :key="item.title"
                      :to="item.to"
                      @click="updataTimeText(item.title)">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
  mounted () {
    let path = window.location.pathname.split(/\//)[2]
    switch (path) {
      case 'thisWeek':
        this.updataTimeText('本週')
        break
      case 'thisMonth':
        this.updataTimeText('本月')
        break
      case 'thisYear':
        this.updataTimeText('今年')
        break
      case undefined:
        this.updataTimeText('今天')
        break
    }
  },
  methods: {
    updataTimeText (newText) {
      this.timeText = newText
    }
  }
}
</script>

