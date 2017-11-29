<template>
  <v-container fluid
               grid-list-md>
    <v-layout row
              wrap>
      <v-flex d-flex
              xs12>
        <date-range-toolbar></date-range-toolbar>
      </v-flex>
      <nuxt-child/>
    </v-layout>
  </v-container>
</template>
<script>
import DateRangeToolbar from '../components/DateRangeToolbar'
export default {
  components: {
    DateRangeToolbar
  }
}
</script>

