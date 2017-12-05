<template>
  <v-container fluid>
    <v-layout row
              justify-center
              align-center>
      <v-flex xs12
              sm8
              md5>
              <AddAccount></AddAccount>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddAccount from '@/components/AddAccount'
export default {
  components: {
    AddAccount
  }
}
</script>

