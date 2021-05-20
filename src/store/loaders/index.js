export default {
  namespaced: true,
  state: {
    loading: false,
    apiloading: false
  },
  getters: {
    loading: state => state.loading,
    apiloading: state => state.apiloading,
  },
  mutations: {
    SET_LOADING(state, data) {
      state.loading = data;
    },
    SET_API_LOADING(state, data) {
      state.apiloading = data;
    },
  },
  actions: {},
}
