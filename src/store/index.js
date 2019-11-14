import Vue from 'vue'
import Vuex from 'vuex'
import db from '../configs/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomId: '',
    host: {
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
    CHANGE_HOST(state, payload){
      state.host = payload
    },
    CHANGE_GUEST(state, payload){
      state.guest = payload
    },
    CHANGE_HOST_ROLE(state, payload){
      state.host.role = payload
    },
    CHANGE_GUEST_ROLE(state, payload){
      state.guest.role = payload
    }
  },
  actions: {
    updateRoom({state, commit}, payload){
      const roomId =  payload
      delete payload.roomId
      db.collection('rooms').doc(roomId).update({
        host: payload
      })
        .then(doc=>{
          console.log('update success')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    updateScoreHost({state, commit}, payload){
      const roomId =  payload
      db.collection('rooms').doc(roomId).update({
        "host.score": payload.score
      })
        .then(_=>{
          console.log('update success')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    updateScoreGuest({state, commit}, payload){
      const roomId =  payload
      db.collection('rooms').doc(roomId).update({
        "guest.score": payload.score
      })
        .then(_=>{
          console.log('update success')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    hostTurn({state, commit}, payload){
      const roomId =  payload
      db.collection('rooms').doc(roomId).update({
        "host.position": payload.position
      })
        .then(_=>{
          console.log('update success')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    guestTurn({state, commit}, payload){
      const roomId =  payload
      db.collection('rooms').doc(roomId).update({
        "guest.position": payload.position
      })
        .then(_=>{
          console.log('update success')
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  modules: {
  }
})
