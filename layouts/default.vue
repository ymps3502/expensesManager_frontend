<template>
  <v-app>
    <v-navigation-drawer temporary
                         light
                         v-model="drawer"
                         overflow
                         absolute>
      <v-list class="pt-2">
        <v-list-group v-for="item in items"
                      :key="item.title">
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
                       :key="subItem.title"
                       :to="subItem.to">
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
        <v-menu offset-y open-on-hover>
          <v-btn flat slot="activator">
            新增
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in adds" :key="item" @click="showDialog(item)">
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog v-model="accountDialog" max-width="500px"><add-account :form="form.AddAccount" :mode="'add'" @close="closeDialog"></add-account></v-dialog>
    <v-dialog v-model="addTagDialog" max-width="300px"><add-tag :form="form.AddTag" @close="closeDialog"></add-tag></v-dialog>
    <v-dialog v-model="addSubtagDialog" max-width="300px"><add-subtag :form="form.AddSubtag" @close="closeDialog"></add-subtag></v-dialog>
    <main>
      <nuxt />
    </main>
    <FAB></FAB>
    <v-snackbar
      :timeout=3000
      :color="snackbarColor"
      v-model="showSnackbar"
    >
      {{ snackbarMsg }}
      <v-btn dark flat @click.native="showSnackbar = false">關閉</v-btn>
    </v-snackbar>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
import AddAccount from '@/components/AddAccount'
import AddTag from '@/components/AddTag'
import AddSubtag from '@/components/AddSubtag'
import FAB from '@/components/FloatActionButton'
export default {
  components: {
    AddAccount, AddTag, AddSubtag, FAB
  },
  data () {
    return {
      snackbar: false,
      drawer: false,
      accountDialog: false,
      addTagDialog: false,
      addSubtagDialog: false,
      form: {
        AddAccount: {
          id: null,
          date: null,
          time: null,
          role: null,
          tag: {id: null},
          subtag: null,
          note: null,
          cost: null
        },
        AddTag: {
          name: null
        },
        AddSubtag: {
          tag_id: null,
          name: null
        }
      },
      title: {
        to: '/history'
      },
      listItems: [
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
          items: []
        },
        {
          action: 'settings',
          title: '設定',
          to: '/settings'
        }
      ],
      adds: ['記帳', '標籤', '子標籤']
    }
  },
  computed: {
    items () {
      let tags = this.$store.getters['tag/default']
      this.listItems.forEach(element => {
        if (element.title === '標籤') {
          element.items = tags
        }
      })
      return this.listItems
    },
    snackbarColor () {
      return this.$store.getters['response/color']
    },
    snackbarMsg () {
      return this.$store.getters['response/msg']
    },
    showSnackbar: {
      get () {
        return this.$store.getters['response/show']
      },
      set (value) {
        this.$store.commit('response/setShow', value)
      }
    }
  },
  created () {
    this.$store.dispatch('tag/allTag')
  },
  methods: {
    showDialog (item) {
      switch (item) {
        case '記帳':
          this.accountDialog = true
          break
        case '標籤':
          this.addTagDialog = true
          break
        case '子標籤':
          this.addSubtagDialog = true
          break
        default:
          break
      }
    },
    closeDialog () {
      this.accountDialog = false
      this.addTagDialog = false
      this.addSubtagDialog = false
    }
  }
}
</script>

