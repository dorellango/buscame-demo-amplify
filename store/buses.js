export const state = () => ({
  list: []
})

export const mutations = {
  set(state, buses) {
    state.list = buses
  },
  remove(state, bus) {
    state.list.splice(state.list.indexOf(bus), 1)
  },
}
export const actions = {
  async get({ commit, state }) {
    const { data } = await this.$axios.post('/bus/all')
    commit('set', data)
  }
}