<template>
  <v-container fluid class="mt-0">
    <v-card>
      <transition mode="out-in">
        <v-card-title v-if="showAction" key="noSelect">
          {{ pageName }}
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-card-title v-else="!showAction" key="select" class="accent">            
            已選取 {{ selected.length }} 筆記錄
            <v-spacer></v-spacer>
            <v-btn flat icon @click="deleteItem()"><v-icon>delete</v-icon></v-btn>
        </v-card-title>
      </transition>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        v-model="selected"
        must-sort
        item-key="id"
        select-all
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox
              primary
              hide-details
              v-model="props.selected"
            ></v-checkbox>
          </td>
          <td class="text-xs-right">{{ props.item.time }}</td>
          <td class="text-xs-right">{{ props.item.role }}</td>
          <td class="text-xs-right">{{ props.item.subtag | filterSubtagName }}</td>
          <td class="text-xs-right">{{ props.item.cost }}</td>
          <td class="text-xs-right">{{ props.item.note }}</td>
          <td class="justify-center layout px-0">
            <v-btn flat icon @click.stop="showAccountDialog(props.item)"><v-icon>edit</v-icon></v-btn>
            <v-btn flat icon @click.stop="deleteItem(props.item.id)"><v-icon>delete</v-icon></v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-spacer></v-spacer>
    <FAB></FAB>
    <v-dialog v-model="accountDialog" max-width="500px"><add-account :form="formData" :mode="'edit'" @close="closeDialog"></add-account></v-dialog>
  </v-container>
</template>

<script>
import AddAccount from '@/components/AddAccount'
import FAB from '@/components/FloatActionButton'
export default {
  components: {
    AddAccount, FAB
  },
  data () {
    return {
      pageName: this.$route.params.tagName,
      accountDialog: false,
      formData: {
        id: null,
        date: null,
        time: null,
        role: null,
        tag: {id: null},
        subtag: null,
        note: null,
        cost: null
      },
      rowsPerPageItems: [10, 15, 20, { text: 'All', value: -1 }],
      pagination: {'sortBy': 'time', 'descending': true},
      search: '',
      selected: [],
      headers: [
        { text: '時間', value: 'time', align: 'left' },
        { text: '對象', value: 'role', align: 'left' },
        { text: '子分類', value: 'subtag', align: 'left' },
        { text: '花費', value: 'cost', align: 'left' },
        { text: '備註', value: 'note', align: 'left', sortable: false },
        { text: '動作', value: 'icon', align: 'center', sortable: false }
      ]
    }
  },
  computed: {
    showAction () {
      return !this.selected.length > 0
    },
    items () {
      return this.$store.getters['bill/tag']
    }
  },
  filters: {
    filterSubtagName (subtag) {
      return subtag ? subtag.name : '無'
    }
  },
  created () {
    let tagName = this.$route.path.split('/').pop()
    let tag = this.$store.getters['tag/getTagID'](tagName)
    this.$store.dispatch('bill/tagBill', tag.id)
  },
  methods: {
    showAccountDialog (item) {
      // console.log(item)
      this.formData = Object.assign(this.formData, item)
      let t = item.time.split(' ')
      this.formData.date = t[0]
      this.formData.time = t[1]
      this.accountDialog = true
    },
    deleteItem (id = 0) {
      let billsID = []
      if (id !== 0) {
        billsID.push(id)
      } else {
        this.selected.forEach(bill => {
          billsID.push(bill.id)
        })
      }
      this.$store.dispatch('bill/deleteBill', billsID).then(() => {
        this.selected = []
        this.$store.dispatch('bill/tagBill', this.items[0].tag.id)
      })
    },
    closeDialog () {
      this.accountDialog = false
    }
  }
}
</script>

<style scoped>
.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity .0s
}

.v-leave-to {
  opacity: 0;
}

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity .15s;
}

.v-enter-to {
  opacity: 1;
}
</style>
