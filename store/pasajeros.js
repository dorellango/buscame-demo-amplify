export const state = () => ({
  list: []
})

export const mutations = {
  set(state, pasajeros) {
    state.list = pasajeros
  },
  remove(state, pasajero) {
    state.list.splice(state.list.indexOf(pasajero), 1)
  },
}
export const actions = {
  async get({ commit, state }) {
    const { data } = await this.$axios.post('/pasajero/all')
    commit('set', data)
  }
}