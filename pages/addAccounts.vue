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
                                      label="日期"
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
                                      label="時間"
                                      v-model="e6"
                                      prepend-icon="access_time"
                                      readonly></v-text-field>
                        <v-time-picker v-model="e6"
                                       autosave></v-time-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                  <v-select v-bind:items="whos"
                            v-model="who"
                            label="對象"
                            item-value="text"></v-select>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md6>
                      <v-select v-bind:items="tags"
                                v-model="tag"
                                label="主分類"
                                item-value="text"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-select v-bind:items="subTags"
                                v-model="subTag"
                                label="子分類"
                                item-value="text"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-text-field label="備註"
                                v-model="name"
                                multi-line
                                required></v-text-field>
                  <v-text-field label="金額"
                                value="0"
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
                 to="/inspire">新增</v-btn>
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
      e3: null,
      menu: false,
      modal: false,
      e6: null,
      menu2: false,
      modal2: false,
      who: null,
      whos: ['自己', '女友', '其他'],
      tag: null,
      subTag: null,
      tags: [
        { text: '正餐',
          subTags: [
            {text: '早餐'},
            {text: '午餐'},
            {text: '晚餐'},
            {text: '消夜'}
          ]
        },
        { text: '零食飲料' },
        { text: '車費',
          subTags: [
            {text: '加油費'},
            {text: '換機油'},
            {text: '火車'},
            {text: '其他'}
          ]
        },
        { text: '食材' },
        { text: '儲值',
          subTags: [
            {text: '悠遊卡'},
            {text: '郵局'}
          ]
        },
        { text: '日用品' },
        { text: '生活費',
          subTags: [
            {text: '房租'},
            {text: '電費'},
            {text: '水費'},
            {text: '網路費'},
            {text: '瓦斯費'},
            {text: '其他'}
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
      var selectTag = this.tags.find(tag => tag.text === this.tag)
      if (selectTag && selectTag.subTags) {
        return selectTag.subTags
      }
      return ['無']
    }
  }
}
</script>
