import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: '',
    playerName: ''
  },
  mutations: {
    CHANGE_ROOM (state, payload) {
      state.room = payload
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
