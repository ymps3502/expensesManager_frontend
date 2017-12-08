<template>
  <v-container>
    <v-card>
      <transition mode="out-in">
        <v-card-title v-if="showAction" key="noSelect">
          Nutrition
        </v-card-title>
        <v-card-title v-else="!showAction" key="select" class="accent">            
            已選取 {{ selected.length }} 筆記錄
            <v-spacer></v-spacer>
            <v-btn flat icon><v-icon>delete</v-icon></v-btn>
        </v-card-title>
      </transition>
      <v-data-table
        :headers="headers"
        :items="items"
        :rows-per-page-items="rowsPerPageItems"
        v-model="selected"
        item-key="name"
        select-all
        class="elevation-1"
      >
        <template slot="items" scope="props">
          <td>
            <v-checkbox
              primary
              hide-details
              v-model="props.selected"
            ></v-checkbox>
          </td>
          <td>
            <v-edit-dialog lazy>
              {{ props.item.name }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.name"
                single-line
                counter="25"
                :rules="[max25chars]"
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog lazy>
              {{ props.item.calories }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.calories"
                single-line
                counter="25"
                :rules="[max25chars]"
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td>
            <v-select
              chips
              tags
              append-icon=""
              clearable
              v-model="props.item.chips"
            >
              <template slot="selection" scope="data">
                <v-chip
                  close
                  @input="removeChip(props.item.chips, data.item)"
                  :selected="data.selected"
                >
                  <strong>{{ data.item }}</strong>
                </v-chip>
              </template>
            </v-select>
          </td>
        </template>
      </v-data-table>
    </v-card>
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
      formData: {
        date: null,
        time: null,
        who: null,
        mainTag: null,
        subTag: null,
        info: null,
        cost: null
      },
      rowsPerPageItems: [10, 15, 20, { text: 'All', value: -1 }],
      search: '',
      selected: [],
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      headers: [
        { text: '主標籤', value: 'name', align: 'left', sortable: false },
        { text: '圖示', value: 'calories', align: 'left', sortable: false },
        { text: '子標籤', value: 'fat', align: 'left', sortable: false }
      ],
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          chips: []
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          chips: []
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          chips: []
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    }
  },
  computed: {
    showAction () {
      return !this.selected.length > 0
    }
  },
  methods: {
    showAccountDialog (item) {
      // console.log(item)
      this.formData.date = item.name
      this.accountDialog = true
    },
    closeDialog () {
      this.accountDialog = false
    },
    removeChip (chips, item) {
      console.log(chips)
      chips.splice(chips.indexOf(item), 1)
      chips = [...chips]
    }
  }
}
</script>

<style scoped>
.no-margin-top {
  margin: 0;
}

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
s