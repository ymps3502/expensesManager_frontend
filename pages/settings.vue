<template>
  <v-container class="mt-0">
    <v-card>
      <transition mode="out-in">
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
            已選取 {{ selected.length }} 筆標籤
            <v-spacer></v-spacer>
            <v-btn flat icon @click="removeTag"><v-icon>delete</v-icon></v-btn>
        </v-card-title>
      </transition>
      <v-data-table
        :headers="headers"
        :items="items"
        :rows-per-page-items="rowsPerPageItems"
        :search="search"
        v-model="selected"
        item-key="tag"
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
          <td>
            <v-edit-dialog lazy>
              {{ props.item.tag }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.tag"
                single-line
                counter="25"
                :rules="[max25chars]"
                @click="saveValue(props.item.tag)"
                @blur="updateTag(props.item)"
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td>
            <v-chip close 
                    v-for="chip in props.item.chips" 
                    :key="chip.name"
                    @input="removeChip(props.item.chips, props.item)"
                    @click="">{{ chip.name }}</v-chip>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import FAB from '@/components/FloatActionButton'
export default {
  components: {
    FAB
  },
  data () {
    return {
      orginValue: null,
      rowsPerPageItems: [10, 15, 20, { text: 'All', value: -1 }],
      search: '',
      selected: [],
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      headers: [
        { text: '主標籤', value: 'tag', align: 'left', sortable: false },
        { text: '子標籤', value: 'subtag', align: 'left', sortable: false }
      ],
      items: []
    }
  },
  computed: {
    showAction () {
      return !this.selected.length > 0
    }
  },
  async created () {
    let response = await this.$axios.get('tag/all')
    this.items = []
    let temp = {}
    response.data.forEach(tag => {
      temp = {
        value: false,
        id: tag.id,
        tag: tag.name,
        chips: tag.subtag
      }
      this.items.push(temp)
    })
  },
  methods: {
    saveValue (tag) {
      this.orginValue = tag
    },
    async updateTag (item) {
      if (item.tag !== this.orginValue) {
        let form = {name: item.tag}
        // TODO response
        await this.$axios.put('tag/update/' + item.id, form)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    async removeChip (chips, item) {
      let removeSubtag = chips.splice(chips.indexOf(item), 1)[0]
      chips = [...chips]
      // TODO response
      await this.$axios.delete('subtag/delete/' + removeSubtag.id)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async removeTag () {
      let tagsID = []
      this.selected.forEach(tag => {
        tagsID.push(tag.id)
      })
      await this.$axios.delete('tag/delete', {params: {'id': tagsID}})
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
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
s