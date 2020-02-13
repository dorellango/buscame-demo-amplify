export const state = () => ({
  list: []
})

export const mutations = {
  set(state, asientos) {
    state.list = asientos
  },
  remove(state, asiento) {
    state.list.splice(state.list.indexOf(asiento), 1)
  },
}
export const actions = {
  async get({ commit }) {
    const { data } = await this.$axios.post('/asiento/all')
    commit('set', data)
  }
}