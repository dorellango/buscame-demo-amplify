export const state = () => ({
  list: []
})

export const mutations = {
  set(state, trayectos) {
    state.list = trayectos
  },
  remove(state, trayecto) {
    state.list.splice(state.list.indexOf(trayecto), 1)
  },
}
export const actions = {
  async get({ commit, state }) {
    const { data } = await this.$axios.post('/trayecto/all')
    commit('set', data)
  }
}