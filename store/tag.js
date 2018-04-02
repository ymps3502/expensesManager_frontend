export const state = () => ({
  tag: []
})

export const getters = {
  default (state) {
    let item = []
    state.tag.forEach(tag => {
      item.push({
        title: tag.name,
        to: '/tags/' + tag.name
      })
    })
    return item
  },
  getTagID: (state) => (name) => {
    return state.tag.find(tag => tag.name === name)
  },
  addAccount (state) {
    let item = []
    state.tag.forEach(tag => {
      item.push({
        id: tag.id,
        name: tag.name,
        subtags: tag.subtag
      })
    })
    return item
  },
  addSubtag (state) {
    let item = []
    state.tag.forEach(tag => {
      item.push({
        tag_id: tag.id,
        name: tag.name
      })
    })
    return item
  },
  settings (state) {
    let item = []
    state.tag.forEach(tag => {
      item.push({
        value: false,
        id: tag.id,
        tag: tag.name,
        chips: tag.subtag
      })
    })
    return item
  }
}

export const mutations = {
  setTag (state, tag) {
    state.tag = tag
  }
}

export const actions = {
  async allTag ({ state, commit }) {
    let response = await this.$axios.get('tag/all')
    commit('setTag', response.data)
  },
  async addTag ({dispatch}, form) {
    await this.$axios.post('tag/add', form)
      .then(response => {
        dispatch('allTag')
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        dispatch('response/setResponse', error.response, {root: true})
        console.log(error.response)
      })
  },
  async updateTag ({dispatch}, form) {
    await this.$axios.put('tag/update/' + form.id, form)
      .then(response => {
        dispatch('allTag')
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  },
  async deleteTag ({dispatch}, tagsID) {
    await this.$axios.delete('tag/delete', {params: {'id': tagsID}})
      .then(response => {
        dispatch('allTag')
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  },
  async addSubtag ({dispatch}, form) {
    await this.$axios.post('subtag/add', form)
      .then(response => {
        dispatch('allTag')
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  },
  async updateSubtag ({dispatch}, form) {
    await this.$axios.put('subtag/update/' + form.id, form)
      .then(response => {
        dispatch('allTag')
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  },
  async deleteSubtag ({dispatch}, id) {
    await this.$axios.delete('subtag/delete/' + id)
      .then(response => {
        dispatch('allTag')
        dispatch('response/setResponse', response, {root: true})
      })
      .catch(error => {
        console.log(error)
      })
  }
}
