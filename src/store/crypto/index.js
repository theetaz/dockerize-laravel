import API from '@/services/api';
import AXIOS from '@/services/api';

export default {
  state: {
    oneCoinData: [],
    cryptoData: [],
    cryptoDataPromoted: [],
    cryptoDataTodayBest: [],
    cryptoDataAuditedCoins: [],
    clientIP: null,
    coin: null,
    token: null,
    profile: null,
    comments: [],
    best_total: null,
    promoted_total: null,
    audit_total: null,
    all_total: null,
    cryptoDataTrusted: []
  },
  getters: {

  },
  mutations: {
    SET_ONE_COIN_DATA(state, oneCoinData) {
      state.oneCoinData = oneCoinData;
    },
    SET_CRYPTO_DATA(state, cryptoData) {
      state.cryptoData = cryptoData;
    },
    SET_CRYPTO_DATA_PROMOTED(state, cryptoData) {
      state.cryptoDataPromoted = cryptoData;
    },
    SET_CRYPTO_DATA_TODAY_BEST(state, cryptoData) {
      state.cryptoDataTodayBest = cryptoData;
    },
    SET_CRYPTO_DATA_AUDITED_COINS(state, cryptoData) {
      state.cryptoDataAuditedCoins = cryptoData;
    },
    SET_COIN_DATA(state, coinData) {
      state.coin = coinData;
    },
    SET_CLIENT_IP(state, clientIP) {
      state.clientIP = clientIP;
    },
    UPDATE_VOTE_COUNT(state, coinData) {

      if (state.cryptoData && state.cryptoData.length > 0) {
        if (state.cryptoData && state.cryptoData.length > 0) {
          let index = 0;
          state.cryptoData.forEach(coin => {
            if (coin.id == coinData.id) {
              state.cryptoData[index].vote_count = coinData.vote_count;
            }
            index++
          });
        }

      }

      if (state.cryptoDataPromoted && state.cryptoDataPromoted.length > 0) {
        if (state.cryptoDataPromoted && state.cryptoDataPromoted.length > 0) {
          let index = 0;
          state.cryptoDataPromoted.forEach(coin => {
            if (coin.id == coinData.id) {
              state.cryptoDataPromoted[index].vote_count = coinData.vote_count;
            }
            index++
          });
        }
      }

      if (state.cryptoDataAuditedCoins && state.cryptoDataAuditedCoins.length > 0) {
        if (state.cryptoDataAuditedCoins && state.cryptoDataAuditedCoins.length > 0) {
          let index = 0;
          state.cryptoDataAuditedCoins.forEach(coin => {
            if (coin.id == coinData.id) {
              state.cryptoDataAuditedCoins[index].vote_count = coinData.vote_count;
            }
            index++
          });
        }

      }

      if (state.cryptoDataTodayBest && state.cryptoDataTodayBest.length > 0) {
        if (state.cryptoDataTodayBest && state.cryptoDataTodayBest.length > 0) {
          let index = 0;
          state.cryptoDataTodayBest.forEach(coin => {
            if (coin.id == coinData.id) {
              state.cryptoDataTodayBest[index].vote_count = coinData.vote_count;
            }
            index++
          });
        }

      }

      if (state.coin && (state.coin.id == coinData.id)) {
        state.coin.vote_count = coinData.vote_count;
      }

    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_PROFILE_DATA(state, profileData) {
      state.profile = profileData;
    },
    ALL_BEST_TOTAL(state, totalData) {
      state.best_total = totalData;
    },
    PROMOTED_TOTAL(state, totalData) {
      state.promoted_total = totalData;
    },
    AUDIT_TOTAL(state, totalData) {
      state.audit_total = totalData;
    },
    ALL_TOTAL(state, totalData) {
      state.all_total = totalData;
    },
    SET_CRYPTO_DATA_TRUSTED(state, cryptoData ) {
      state.cryptoDataTrusted = cryptoData;
    }
  },
  actions: {
    FETCH_CRYPTO_DATA({ commit, state }, perPage) {
      return new Promise((resolve, reject) => {
        commit('loaders/SET_LOADING', true, { root: true })
        API.get("coins", {
          params: {
            per_page: perPage,
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
            commit('ALL_TOTAL', response.data.payload.total)
            resolve();
          } else {
            commit('loaders/SET_LOADING', false, { root: true })
            reject();
          }
        });
      });
    },
    FETCH_PROMOTED_CRYPTO_DATA({ commit, state }, perPage) {
      return new Promise((resolve, reject) => {
        API.get("coins/promoted", {
          params: {
            per_page: perPage,
            direction: "DESC",
            sort_key: "vote_count",
            ip_address: state.clientIP,
            page: 1
          }
        }).then((response) => {
          if (response) {
            let payload = response.data.payload;
            commit('SET_CRYPTO_DATA_PROMOTED', payload);
            commit('PROMOTED_TOTAL', response.data.payload.total)
            resolve(payload);
          } else {
            reject();
          }
        });
      });
    },
    FETCH_TODAY_BEST_CRYPTO_DATA({ commit, state }, perPage) {
      return new Promise((resolve, reject) => {
        API.get("coins/today-best", {
          params: {
            per_page: perPage,
            direction: "DESC",
            sort_key: "vote_count",
            ip_address: state.clientIP,
            page: 1
          }
        }).then((response) => {
          if (response) {
            let payload = response.data.payload;
            commit('SET_CRYPTO_DATA_TODAY_BEST', payload);
            commit('ALL_BEST_TOTAL', response.data.payload.total)
            resolve(payload);
          } else {
            reject();
          }
        });
      });
    },
    FETCH_AUDITED_CRYPTO_DATA({ commit, state }, perPage) {
      return new Promise((resolve, reject) => {
        API.get("coins/audited-coins", {
          params: {
            per_page: perPage,
            direction: "DESC",
            sort_key: "vote_count",
            ip_address: state.clientIP,
            page: 1
          }
        }).then((response) => {
          if (response) {
            let payload = response.data.payload;
            commit('SET_CRYPTO_DATA_AUDITED_COINS', payload);
            commit('AUDIT_TOTAL', response.data.payload.total)
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
            //set client IP into local storage
            localStorage.setItem("clientIP", clientIP);
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

    FETCH_COIN_DATA({ commit }, id) {
      return new Promise((resolve, reject) => {
        //get the ip address from store
        let clientIP = localStorage.getItem("clientIP");
        API.get(`coin/${id}`,
          {
            params: {
              ip_address: clientIP,
            }
          }
        ).then((response) => {
          if (response) {
            let coinData = response.data.payload;
            commit('SET_COIN_DATA', coinData);
            commit('SET_COMMENTS', coinData.comments);
            resolve(coinData);
          } else {
            reject();
          }
        });
      });
    },
    FETCH_MOST_TRUST_DATA({ commit, state }) {
      return new Promise((resolve, reject) => {
        API.get("coins/trusted", {
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
            commit('SET_CRYPTO_DATA_TRUSTED', payload);
            resolve(payload);
          } else {
            reject();
          }
        });
      });
    },
    CAST_VOTE({ dispatch, commit }, data) {

      return new Promise((resolve, reject) => {
        commit('loaders/SET_LOADING', true, { root: true })
        //get the ip address from store
        let clientIP = localStorage.getItem("clientIP");

        if (clientIP != null) {
          //send the vote request
          API.post(`coin/${data.coinID}/vote`, { client_ip: clientIP }).then((response) => {
            commit('loaders/SET_LOADING', false, { root: true })
            // let coinData = response.data.payload;
            dispatch('FETCH_CRYPTO_DATA', data.perPage);
            dispatch('FETCH_TODAY_BEST_CRYPTO_DATA', data.perPage);
            dispatch('FETCH_PROMOTED_CRYPTO_DATA', data.perPage);
            dispatch('FETCH_MOST_TRUST_DATA', data.perPage);

            resolve(response);

          }).catch((error) => {

            reject(error);
          })
            .finally(() => {
              commit('loaders/SET_LOADING', false, { root: true })
            });
        }
        else {
          commit('loaders/SET_LOADING', false, { root: true })
        }

      })

    },
    CAST_ONE_VOTE({ dispatch, commit }, coinId) {

      return new Promise((resolve, reject) => {
        commit('loaders/SET_LOADING', true, { root: true })
        //get the ip address from store
        let clientIP = localStorage.getItem("clientIP");

        if (clientIP != null) {
          //send the vote request
          API.post(`coin/${coinId}/vote`, { client_ip: clientIP }).then((response) => {
            commit('loaders/SET_LOADING', false, { root: true })
            // let coinData = response.data.payload;
            dispatch('FETCH_COIN_DATA', coinId)
            .then((response) => {
              commit('SET_ONE_COIN_DATA', response.data);
            })

            resolve(response);

          }).catch((error) => {

            reject(error);
          })
            .finally(() => {
              commit('loaders/SET_LOADING', false, { root: true })
            });
        }
        else {
          commit('loaders/SET_LOADING', false, { root: true })
        }

      })

    },
    REGISTER_USER({ commit }, userData) {
      return new Promise((resolve, reject) => {

        //set loader status to true
        commit('loaders/SET_LOADING', true, { root: true });

        API.post('/auth/register', userData).then((response) => {


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
    FETCH_PROFILE_DATA({ commit }, token) {
      return new Promise((resolve, reject) => {

        //set loader status to true
        commit('loaders/SET_LOADING', true, { root: true });

        let headers = {
          'Authorization': 'Bearer ' + token
        };

        API.get('/auth/profile', { headers }).then((response) => {

          commit('SET_PROFILE_DATA', response.data.payload.user);
          localStorage.setItem('profile', JSON.stringify(response.data.payload.user));
          resolve(response);

        }).catch((error) => {

          reject(error);

        }).finally(() => {
          //set loader status to false
          commit('loaders/SET_LOADING', false, { root: true });
        });
      })
    },
    ADD_COMMENT({ commit, dispatch }, commentData) {
      return new Promise((resolve, reject) => {

        //set loader status to true
        commit('loaders/SET_LOADING', true, { root: true });

        const token = localStorage.getItem('token');

        AXIOS.post('/coin/comment', commentData, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }).then((response) => {
          if (response.message == 'success') {
            dispatch('FETCH_COIN_DATA', commentData.coin_id)
          }

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