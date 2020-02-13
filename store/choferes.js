export const state = () => ({
  list: []
})

export const mutations = {
  set(state, choferes) {
    state.list = choferes
  },
  remove(state, chofer) {
    state.list.splice(state.list.indexOf(chofer), 1)
  },
}
export const actions = {
  async get({ commit }) {
    const { data } = await this.$axios.post('/chofer/all')
    commit('set', data)
  }
}