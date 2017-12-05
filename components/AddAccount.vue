<template>
  <v-card>
    <v-card-title class="headline">
      記帳
      <v-spacer></v-spacer>
      <v-btn flat icon v-show="editMode"><v-icon>close</v-icon></v-btn>
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
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat
                                primary
                                @click.native="cancel()"
                                取消</v-btn>
                            <v-btn flat
                                  primary
                                  @click.native="save()">選取</v-btn>
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
              <v-select :items="whos"
                        v-model="form.who"
                        label="對象"
                        item-value="text"></v-select>
              <v-layout row
                        wrap>
                <v-flex xs12
                        sm6
                        md6>
                  <v-select :items="tags"
                            
                            v-model="form.mainTag"
                            label="主分類"
                            item-value="text"></v-select>
                </v-flex>
                <v-flex xs12
                        sm6
                        md6>
                  <v-select :items="subTags"
                            v-model="form.subTag"
                            label="子分類"
                            item-value="text"></v-select>
                </v-flex>
              </v-layout>
              <v-text-field label="備註"
                            v-model="form.info"
                            multi-line></v-text-field>
              <v-text-field label="金額"
                            prefix="$"
                            v-model="form.cost"></v-text-field>
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
            to="/inspire">{{ modeBtn }}</v-btn>
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
  data () {
    return {
      valid: false,
      picker: {
        date: false,
        time: false
      },
      whos: ['自己', '女友', '其他'],
      tags: [
        {
          text: '正餐',
          subTags: [
            { text: '早餐' },
            { text: '午餐' },
            { text: '晚餐' },
            { text: '消夜' }
          ]
        },
        { text: '零食飲料' },
        {
          text: '車費',
          subTags: [
            { text: '加油費' },
            { text: '換機油' },
            { text: '火車' },
            { text: '其他' }
          ]
        },
        { text: '食材' },
        {
          text: '儲值',
          subTags: [
            { text: '悠遊卡' },
            { text: '郵局' }
          ]
        },
        { text: '日用品' },
        {
          text: '生活費',
          subTags: [
            { text: '房租' },
            { text: '電費' },
            { text: '水費' },
            { text: '網路費' },
            { text: '瓦斯費' },
            { text: '其他' }
          ]
        },
        { text: '娛樂' },
        { text: '其他' }
      ]
    }
  },
  computed: {
    subTags () {
      this.subTag = null
      var selectTag = this.tags.find(tag => tag.text === this.form.mainTag)
      if (selectTag && selectTag.subTags) {
        return selectTag.subTags
      }
      return ['無']
    },
    modeBtn () {
      return this.mode === 'add' ? '新增' : '儲存'
    },
    editMode () {
      return this.mode === 'edit'
    }
  }
}
</script>