export default {
  namespaced: true,
  state: {
    loading: false,
  },
  getters: {
    loading: state => state.loading,
  },
  mutations: {
    SET_LOADING(state, data) {
      state.loading = data;
    },
  },
  actions: {},
}
