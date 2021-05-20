import API from '@/services/api';

export default {
  state: {
    cryptoData: [],
    cryptoDataPromoted: [],
    cryptoDataTodayBest: [],
    clientIP: null,
    coin: null,
    token: null
  },
  getters: {

  },
  mutations: {
    SET_CRYPTO_DATA(state, cryptoData) {
      state.cryptoData = cryptoData;
    },
    SET_CRYPTO_DATA_PROMOTED(state, cryptoData) {
      state.cryptoDataPromoted = cryptoData;
    },
    SET_CRYPTO_DATA_TODAY_BEST(state, cryptoData) {
      state.cryptoDataTodayBest = cryptoData;
    },
    SET_COIN_DATA(state, coinData) {
      state.coin = coinData;
    },
    SET_CLIENT_IP(state, clientIP) {
      state.clientIP = clientIP;
    },
    UPDATE_VOTE_COUNT(state, coinData) {
      let votedCoin = state.cryptoData.filter((coin) => coin.id === coinData.id);
      //update the vote count
      votedCoin[0].vote_count = coinData.vote_count;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    FETCH_CRYPTO_DATA({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('loaders/SET_LOADING', true, { root: true })
        API.get("coins", {
          params: {
            per_page: 20,
            direction: "DESC",
            sort_key: "vote_count",
            ip_address: state.clientIP,
            page: 1
          }
        }).then((response) => {
          if (response) {
            let payload = response.data.payload.data;
            commit('SET_CRYPTO_DATA', payload);
            commit('loaders/SET_LOADING', false, { root: true })
            resolve();
          } else {
            commit('loaders/SET_LOADING', false, { root: true })
            reject();
          }
        });
      });
    },
    FETCH_PROMOTED_CRYPTO_DATA({ commit, state }) {
      return new Promise((resolve, reject) => {
        API.get("coins/promoted", {
          params: {
            per_page: 20,
            direction: "DESC",
            sort_key: "vote_count",
            ip_address: state.clientIP,
            page: 1
          }
        }).then((response) => {
          if (response) {
            let payload = response.data.payload;
            commit('SET_CRYPTO_DATA_PROMOTED', payload);
            resolve(payload);
          } else {
            reject();
          }
        });
      });
    },
    FETCH_TODAY_BEST_CRYPTO_DATA({ commit, state }) {
      return new Promise((resolve, reject) => {
        API.get("coins/today-best", {
          params: {
            per_page: 20,
            direction: "DESC",
            sort_key: "vote_count",
            ip_address: state.clientIP,
            page: 1
          }
        }).then((response) => {
          if (response) {
            let payload = response.data.payload;
            commit('SET_CRYPTO_DATA_TODAY_BEST', payload);
            resolve(payload);
          } else {
            reject();
          }
        });
      });
    },
    FETCH_CLIENT_IP({ commit }) {
      return new Promise((resolve, reject) => {
        commit('loaders/SET_API_LOADING', true, { root: true })
        API.get("https://api.ipify.org", { params: { format: "json" } }).then((response) => {
          if (response) {
            let clientIP = response.data.ip
            commit('SET_CLIENT_IP', clientIP);
            resolve(clientIP);
            commit('loaders/SET_API_LOADING', false, { root: true })
          } else {
            reject(
              commit('loaders/SET_API_LOADING', false, { root: true })
            );
          }
        });
      });
    },

    FETCH_COIN_DATA({ commit }, coinContract) {
      return new Promise((resolve, reject) => {
        API.get(`coin/${coinContract}`).then((response) => {
          if (response) {
            let coinData = response.data.payload;
            commit('SET_COIN_DATA', coinData);
            resolve(coinData);
          } else {
            reject();
          }
        });
      });
    },
    CAST_VOTE({ dispatch, commit }, coinID) {
      commit('loaders/SET_LOADING', true, { root: true })
      //get the ip address from store
      let clientIP = this.state.crypto.clientIP;
      if (clientIP != null) {
        //send the vote request
        API.post(`coin/${coinID}/vote`, { client_ip: clientIP }).then(() => {
          commit('loaders/SET_LOADING', false, { root: true })
          // let coinData = response.data.payload;
          dispatch('FETCH_CRYPTO_DATA');
          dispatch('FETCH_TODAY_BEST_CRYPTO_DATA');
          dispatch('FETCH_PROMOTED_CRYPTO_DATA');

          // commit('UPDATE_VOTE_COUNT', coinData);

        })
          .finally(() => {
            commit('loaders/SET_LOADING', false, { root: true })
          });

      }
      else {
        commit('loaders/SET_LOADING', false, { root: true })
      }

    },
    REGISTER_USER({ commit }, userData) {
      return new Promise((resolve, reject) => {

        //set loader status to true
        commit('loaders/SET_LOADING', true, { root: true });

        API.post('/auth/register', userData).then((response) => {

          console.log("register", response);
          console.log("userData", userData);
          let token = response.data.payload.token;
          localStorage.setItem('token', token);

          commit('SET_TOKEN', token);
          resolve(response);

        }).catch((error) => {

          reject(error);

        }).finally(() => {

          //set loader status to false
          commit('loaders/SET_LOADING', false, { root: true });
        });
      })
    },
    USER_LOGIN({ commit }, userData) {
      return new Promise((resolve, reject) => {

        //set loader status to true
        commit('loaders/SET_LOADING', true, { root: true });

        API.post('/auth/login', userData).then((response) => {

          console.log("register", response);
          console.log("userData", userData);
          let token = response.data.payload.token;
          localStorage.setItem('token', token);

          commit('SET_TOKEN', token);
          resolve(response);

        }).catch((error) => {

          reject(error);

        }).finally(() => {

          //set loader status to false
          commit('loaders/SET_LOADING', false, { root: true });
        });
      })
    },
    UPDATE_REALTIME_VOTE({ commit }, coinData) {
      commit('UPDATE_VOTE_COUNT', coinData);
    }
  }
}