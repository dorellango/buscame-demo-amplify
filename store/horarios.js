export const state = () => ({
  list: []
})

export const mutations = {
  set(state, horarios) {
    state.list = horarios
  },
  remove(state, horario) {
    state.list.splice(state.list.indexOf(horario), 1)
  },
}
export const actions = {
  async get({ commit, state }) {
    const { data } = await this.$axios.post('/horario/all')
    commit('set', data)
  }
}