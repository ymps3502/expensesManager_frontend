<template>
  <v-card>
    <v-card-title class="headline">
      子標籤
      <v-spacer></v-spacer>
      <v-btn flat icon @click="close"><v-icon>close</v-icon></v-btn>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form>
          <v-layout row
                    justify-center
                    align-center>
            <v-flex xs12>
              <v-text-field label="名稱"
                            v-model="form.name"
                            required></v-text-field>
            </v-flex>
          </v-layout>
          <v-select :items="tags"
                    v-model="form.tag_id"
                    label="主分類"
                    item-text="name"
                    item-value="tag_id"></v-select>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary"
            flat
            nuxt
            @click="sendForm">{{ modeBtn }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    },
    mode: {
      type: String,
      default: 'add'
    }
  },
  computed: {
    tags () {
      return this.$store.getters['tag/addSubtag']
    },
    modeBtn () {
      return this.mode === 'add' ? '新增' : '儲存'
    },
    editMode () {
      return this.mode === 'edit'
    }
  },
  methods: {
    sendForm () {
      if (this.mode === 'add') this.add()
      else this.update()
    },
    add () {
      this.close()
      this.$store.dispatch('tag/addSubtag', this.form)
    },
    update () {
      // TODO prevent sending data without changed
      this.close()
      this.$store.dispatch('tag/updateSubtag', this.form)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>