<template>
  <v-card>
    <v-card-title class="headline">
      新增標籤
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
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary"
            flat
            nuxt
            @click="sendForm">新增</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    }
  },
  methods: {
    sendForm () {
      this.add()
    },
    async add () {
      // TODO vuex response message 
      await this.$axios.post('tag/add', this.form)
        .then(response => {
          this.close()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>