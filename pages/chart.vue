<template>
  <v-container fluid
               grid-list-md
               class="mt-0">
    <v-layout row
              wrap>
      <v-flex d-flex
              xs12>
        <date-range-toolbar ref="reset" class="mt-2"></date-range-toolbar>
      </v-flex>
      <nuxt-child/>
      <v-spacer></v-spacer>
      <FAB></FAB>
    </v-layout>
  </v-container>
</template>
<script>
import DateRangeToolbar from '../components/DateRangeToolbar'
import FAB from '@/components/FloatActionButton'
export default {
  components: {
    DateRangeToolbar, FAB
  },
  beforeRouteUpdate (to, from, next) {
    let nextPath = to.name
    if (nextPath === 'chart') { this.$refs.reset.updataTimeText('今天') }
    next()
  }
}
</script>

