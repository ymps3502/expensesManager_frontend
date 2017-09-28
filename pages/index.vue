<template>
  <v-layout row
            justify-center
            align-center>
    <v-flex xs12
            sm8
            md5>
      <v-card>
        <v-card-title class="headline">記帳</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="valid">
              <v-layout row
                        justify-center
                        align-center>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md6 wrap>
                      <v-menu lazy
                              :close-on-content-click="false"
                              v-model="menu"
                              transition="scale-transition"
                              offset-y
                              full-width
                              :nudge-left="40">
                        <v-text-field slot="activator"
                                      label="Picker in menu"
                                      v-model="e3"
                                      prepend-icon="event"
                                      readonly></v-text-field>
                        <v-date-picker v-model="e3"
                                       locale="zh-tw"
                                       no-title
                                       scrollable
                                       actions>
                          <template scope="{ save, cancel }">
                            <v-card-actions>
                              <v-btn flat
                                     primary
                                     @click.native="cancel()">Cancel</v-btn>
                              <v-btn flat
                                     primary
                                     @click.native="save()">Save</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-menu lazy
                              :close-on-content-click="false"
                              v-model="menu2"
                              transition="scale-transition"
                              offset-y
                              full-width
                              :nudge-left="40">
                        <v-text-field slot="activator"
                                      label="Picker in menu"
                                      v-model="e6"
                                      prepend-icon="access_time"
                                      readonly></v-text-field>
                        <v-time-picker v-model="e6"
                                       autosave></v-time-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                  <v-select v-bind:items="items"
                            v-model="e1"
                            label="Select"
                            item-value="text"></v-select>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md6>
                      <v-select v-bind:items="items"
                                v-model="e1"
                                label="Select"
                                item-value="text"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-select v-bind:items="items"
                                v-model="e1"
                                label="Select"
                                item-value="text"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-text-field label="Name"
                                v-model="name"
                                multi-line
                                required></v-text-field>
                  <v-text-field label="Amount"
                                value="10"
                                prefix="$"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary
                 flat
                 nuxt
                 to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      e3: null,
      menu: false,
      modal: false,
      e6: null,
      menu2: false,
      modal2: false,
      e1: null,
      items: [
        { text: 'State 1' },
        { text: 'State 2' },
        { text: 'State 3' },
        { text: 'State 4' },
        { text: 'State 5' },
        { text: 'State 6' },
        { text: 'State 7' }
      ]
    }
  }
}
</script>
