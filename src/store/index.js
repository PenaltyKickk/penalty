import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: ''
  },
  mutations: {
    CHANGE_ROOM(state, payload){
      state.room = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
