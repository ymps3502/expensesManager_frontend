<template>
  <v-container class="mt-0">
    <v-card>
      <transition mode="out-in">
        <v-card-title v-if="!showAction" key="noSelect">
          設定標籤
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-card-title v-else="showAction" key="select" class="accent">            
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
                    @input="removeChip(chip.id)"
                    @click="showDialog(chip)">{{ chip.name }}</v-chip>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="addSubtagDialog" max-width="300px"><add-subtag :form="form.AddSubtag" :mode="'edit'" @close="closeDialog"></add-subtag></v-dialog>
  </v-container>
</template>

<script>
import AddSubtag from '@/components/AddSubtag'
export default {
  components: {
    AddSubtag
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
      addSubtagDialog: false,
      form: {
        AddSubtag: {
          tag_id: null,
          name: null
        }
      }
    }
  },
  computed: {
    showAction () {
      return this.selected.length !== 0
    },
    items () {
      return this.$store.getters['tag/settings']
    }
  },
  methods: {
    saveValue (tag) {
      this.orginValue = tag
    },
    updateTag (item) {
      if (item.tag !== this.orginValue) {
        let form = {
          id: item.id,
          name: item.tag
        }
        this.$store.dispatch('tag/updateTag', form)
      }
    },
    removeChip (chipID) {
      this.$store.dispatch('tag/deleteSubtag', chipID)
    },
    async removeTag () {
      let tagsID = []
      this.selected.forEach(tag => {
        tagsID.push(tag.id)
      })
      this.$store.dispatch('tag/deleteTag', tagsID).then(() => {
        this.selected = []
      })
    },
    showDialog (item) {
      Object.assign(this.form.AddSubtag, item)
      this.addSubtagDialog = true
    },
    closeDialog () {
      this.addSubtagDialog = false
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