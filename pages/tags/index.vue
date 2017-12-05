<template>
  <v-container fluid class="no-margin-top">
    <v-layout>
      <v-flex>
        <v-card>
            <transition mode="out-in" name="slide-y-transition">
              <v-card-title v-if="showAction" key="noSelect">
                Nutrition
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
                  <div class="subheading">已選取 {{ selected.length }} 筆記錄</div>
                  <v-spacer></v-spacer>
                  <v-btn flat icon><v-icon>delete</v-icon></v-btn>
              </v-card-title>
            </transition>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            v-model="selected"
            item-key="name"
            select-all
            class="elevation-1"
          >
            <template slot="headerCell" scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>
            <template slot="items" scope="props">
              <td>
                <v-checkbox
                  primary
                  hide-details
                  v-model="props.selected"
                ></v-checkbox>
              </td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.calories }}</td>
              <td>{{ props.item.fat }}</td>
              <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td>{{ props.item.protein }}</td>
              <td class="text-lg-right"><v-btn flat icon @click.stop="showAccountDialog(props.item)"><v-icon>edit</v-icon></v-btn></td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-dialog v-model="accountDialog" max-width="500px"><add-account :form="formData" :mode="'edit'"></add-account></v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import AddAccount from '@/components/AddAccount'
export default {
  components: {
    AddAccount
  },
  data () {
    return {
      accountDialog: false,
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
      headers: [
        { text: '時間', value: 'name', align: 'left' },
        { text: '對象', value: 'calories', align: 'left' },
        { text: '子分類', value: 'fat', align: 'left' },
        { text: '花費', value: 'carbs', align: 'right' },
        { text: '備註', value: 'protein', align: 'left' },
        { text: '', value: 'icon' }
      ],
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
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
      this.accountDialog = !this.accountDialog
    }
  }
}
</script>

<style scoped>
.no-margin-top {
  margin: 0;
}
</style>
