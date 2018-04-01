<template>
  <div>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      hover
      fixed
      transition="slide-y-reverse-transition"
      class="hidden-sm-and-up"
    >
      <v-btn
          slot="activator"
          color="blue darken-2"
          dark
          fab
          hover
          v-model="fab"
      >
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-tooltip left v-for="btn in btns" :key="btn.tip">
        <v-btn
          fab
          dark
          small
          :color="btn.color"
          slot="activator"
          @click="showDialog(btn.tip)"
        >
          <v-icon>{{ btn.icon }}</v-icon>
        </v-btn>
        <span>{{ btn.tip }}</span>
      </v-tooltip>
    </v-speed-dial>
    <v-dialog v-model="accountDialog" max-width="500px"><add-account :form="form.AddAccount" :mode="'add'" @close="closeDialog()"></add-account></v-dialog>
    <v-dialog v-model="addTagDialog" max-width="300px"><add-tag :form="form.AddTag" @close="closeDialog()"></add-tag></v-dialog>
    <v-dialog v-model="addSubtagDialog" max-width="300px"><add-subtag :form="form.AddSubtag" @close="closeDialog()"></add-subtag></v-dialog>
  </div>
</template>

<script>
import AddAccount from '@/components/AddAccount'
import AddTag from '@/components/AddTag'
import AddSubtag from '@/components/AddSubtag'
export default {
  components: {
    AddAccount, AddTag, AddSubtag
  },
  data () {
    return {
      btns: [
        {
          icon: 'style',
          tip: '子標籤',
          color: 'red'
        },
        {
          icon: 'local_offer',
          tip: '標籤',
          color: 'green'
        },
        {
          icon: 'edit',
          tip: '記帳',
          color: 'indigo'
        }
      ],
      fab: false,
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
      }
    }
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

