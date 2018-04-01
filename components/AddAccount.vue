<template>
  <v-card>
    <v-card-title class="headline">
      記帳
      <v-spacer></v-spacer>
      <v-btn flat icon @click="close"><v-icon>close</v-icon></v-btn>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form v-model="valid">
          <v-layout row
                    justify-center
                    align-center>
            <v-flex xs12>
              <v-layout row
                        wrap>
                <v-flex xs12
                        sm6
                        md6
                        wrap>
                  <v-menu lazy
                          :close-on-content-click="false"
                          v-model="picker.date"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-left="40">
                    <v-text-field slot="activator"
                                  label="日期"
                                  v-model="form.date"
                                  prepend-icon="event"
                                  readonly></v-text-field>
                    <v-date-picker v-model="form.date"
                                  locale="zh-tw"
                                  no-title
                                  scrollable
                                  actions>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat
                                color="primary"
                                @click.native="save()">選取</v-btn>
                          <v-btn flat
                                color="primary"
                                @click.native="cancel()">取消</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12
                        sm6
                        md6>
                  <v-menu lazy
                          :close-on-content-click="false"
                          v-model="picker.time"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-left="40">
                    <v-text-field slot="activator"
                                  label="時間"
                                  v-model="form.time"
                                  prepend-icon="access_time"
                                  readonly></v-text-field>
                    <v-time-picker v-model="form.time"
                                  autosave></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-select :items="roles"
                        v-model="form.role"
                        label="對象"
                        item-value="text"></v-select>
              <v-layout row
                        wrap>
                <v-flex xs12
                        sm6
                        md6>
                  <v-select :items="tags"
                            v-model="form.tag"
                            label="主分類"
                            item-text="name"
                            item-value="id"></v-select>
                </v-flex>
                <v-flex xs12
                        sm6
                        md6>
                  <v-select :items="subtags"
                            v-model="form.subtag"
                            label="子分類"
                            item-text="name"
                            item-value="id"></v-select>
                </v-flex>
              </v-layout>
              <v-text-field label="金額"
                            prefix="$"
                            v-model="form.cost"></v-text-field>
              <v-text-field label="備註"
                            v-model="form.note"
                            multi-line></v-text-field>
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
            @click="sendForm">{{ modeBtn }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
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
  data () {
    return {
      valid: false,
      picker: {
        date: false,
        time: false
      },
      roles: ['自己', '女友', '其他']
    }
  },
  computed: {
    tags () {
      return this.$store.getters['tag/addAccount']
    },
    subtags () {
      let selectTag = this.tags.find(tag => tag.id === this.form.tag)
      if (selectTag && selectTag.subtags) {
        return selectTag.subtags
      }
      return ['無']
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
      // console.log(this.mode)
      this.mode === 'add' ? this.add() : this.update()
    },
    add () {
      let time = this.form.date + ' ' + this.form.time
      let form = {
        time: moment(time, 'YYYY-MM-DD hh:mma').format('YYYY-MM-DD hh:mm'),
        role: this.form.role,
        tag_id: this.form.tag,
        subtag_id: this.form.subtag,
        note: this.form.note,
        cost: this.form.cost
      }
      this.close()
      this.$store.dispatch('bill/addBill', form).then(() => {
        this.updatePage()
      })
    },
    update () {
      let time = this.form.date + ' ' + this.form.time
      let form = {
        id: this.form.id,
        time: moment(time, 'YYYY-MM-DD hh:mma').format('YYYY-MM-DD hh:mm'),
        role: this.form.role,
        tag_id: this.form.tag,
        subtag_id: this.form.subtag.id,
        note: this.form.note,
        cost: this.form.cost
      }
      this.close()
      this.$store.dispatch('bill/updateBill', form).then(() => {
        this.updatePage()
      })
    },
    close () {
      this.$emit('close')
    },
    updatePage () {
      let pathName = this.$route.path.split('/').pop()
      let pathLists = {
        chart: ['bill/todayBill'],
        thisWeek: ['bill/weekBill'],
        thisMonth: ['bill/monthBill'],
        thisYear: ['bill/yearBill'],
        history: ['bill/allBill']
      }
      if (pathName in pathLists) {
        pathLists[pathName].forEach(path => {
          this.$store.dispatch(path)
        })
      } else {
        // tag page
        let tag = this.$store.getters['tag/getTagID'](pathName)
        this.$store.dispatch('bill/tagBill', tag.id)
      }
    }
  }
}
</script>