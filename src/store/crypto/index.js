import API from '@/services/api';

export default {
  state: {
    cryptoData: [],
    clientIP: null,
    coin: null
  },
  getters: {

  },
  mutations: {
    SET_CRYPTO_DATA(state, cryptoData) {
      state.cryptoData = cryptoData;
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
    }
  },
  actions: {
    FETCH_CRYPTO_DATA({ commit, state }) {
      return new Promise((resolve, reject) => {
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
            resolve();
          } else {
            reject();
          }
        });
      });

    },
    FETCH_CLIENT_IP({ commit }) {
      return new Promise((resolve, reject) => {
        API.get("https://api.ipify.org", { params: { format: "json" } }).then((response) => {
          if (response) {
            let clientIP = response.data.ip
            commit('SET_CLIENT_IP', clientIP);
            resolve(clientIP);
          } else {
            reject();
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

    CAST_VOTE({ dispatch }, coinID) {

      //get the ip address from store
      let clientIP = this.state.crypto.clientIP;
      if (clientIP != null) {
        //send the vote request
        API.post(`coin/${coinID}/vote`, { client_ip: clientIP }).then(() => {
          // let coinData = response.data.payload;
          dispatch('FETCH_CRYPTO_DATA')
          // commit('UPDATE_VOTE_COUNT', coinData);
        });
      }

    }
  },



}