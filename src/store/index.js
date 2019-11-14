import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerName: '',
    roomId: '',
    master: {
      name: null,
      position: 5,
      ready: false,
      role: 'kiper',
      score: 0
    },
    guest: {
      name: null,
      position: 5,
      ready: false,
      role: 'shooter',
      score: 0
    }
  },
  mutations: {
    CHANGE_ROOM(state, payload){
      state.roomId = payload
    },
    SET_PLAYER_NAME (state, payload) {
      state.playerName = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
