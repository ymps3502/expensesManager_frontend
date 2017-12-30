<template>
  <v-app>
    <v-navigation-drawer temporary
                         light
                         v-model="drawer"
                         overflow
                         absolute>
      <v-list class="pt-2">
        <v-list-group v-for="item in items"
                      :value="item.active"
                      v-bind:key="item.title">
          <v-list-tile slot="item"
                       :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-show="'items' in item">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items"
                       v-bind:key="subItem.title"
                       :to="subItem.to"
                       @click="">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-toolbar-title :to="title.to">Title</v-toolbar-title> -->
      <v-toolbar-items>
        <v-btn flat large href="chart" class="title">Title</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat
               href="addAccounts">
          <v-icon>add</v-icon>
          新增
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <nuxt />
    </main>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      title: {
        to: '/history'
      },
      items: [
        {
          action: 'insert_chart',
          title: '圖表',
          to: '/chart'
        },
        {
          action: 'history',
          title: '歷史紀錄',
          to: '/history'
        },
        {
          action: 'local_offer',
          title: '標籤',
          items: [
            { title: '正餐', to: '/tags/正餐' },
            { title: '零食飲料', to: '/tags/零食飲料' },
            { title: '車費', to: '/tags/車費' },
            { title: '食材', to: '/tags/食材' },
            { title: '儲值', to: '/tags/食材' },
            { title: '日用品', to: '/tags/日用品' },
            { title: '生活費', to: '/tags/生活費' },
            { title: '娛樂', to: '/tags/娛樂' },
            { title: '其他', to: '/tags/其他' }
          ]
        },
        {
          action: 'settings',
          title: '設定',
          to: '/settings'
        }
      ]
    }
  }
}
</script>

