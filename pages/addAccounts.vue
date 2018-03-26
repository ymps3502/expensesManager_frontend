<template>
  <v-container fluid>
    <v-layout row
              justify-center
              align-center>
      <v-flex xs12
              sm8
              md5>
              <AddAccount :form="form"></AddAccount>
      </v-flex>
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
      form: {
        id: null,
        date: null,
        time: null,
        role: null,
        tag: {id: null},
        subtag: null,
        note: null,
        cost: null
      }
    }
  }
}
</script>

