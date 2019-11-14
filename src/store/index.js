import Vue from 'vue'
import Vuex from 'vuex'
import db from '../configs/firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
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
    CHANGE_ROOMS(state, payload){
      state.rooms = payload
    }
  },
  actions: {
    getFreeRoom (context) {
      db.collection('rooms').where('available', '==', true)
      .onSnapshot((querySnapshot) => {
          let lists = [];
          querySnapshot.forEach(function(doc) {
              let room = {
                id: doc.id,
                ...doc.data()
              }
              lists.push(room);
          });
          context.commit('CHANGE_ROOMS', lists)
      });
    },
    createRoom (context) {
      db.collection("rooms").add({
        host: {
          name: localStorage.getItem('playerName'),
          role: 'keeper',
          position: 5,
          ready: false,
          score: 0
        },
        guest: {
          name: null,
          role: 'shooter',
          position: 5,
          ready: false,
          score: 0
        },
        round: 1,
        start: false,
        available: true
      })
      .then((docRef) => {
          localStorage.setItem('room', docRef.id)
          context.commit('CHANGE_ROOM', docRef.id)
          router.push('/room/'+docRef.id)
      })
      .catch((error) => {
          console.error("Error adding document: ", error)
      })
    },
    joinRoom (context, payload) {
      db.collection("rooms").doc(payload).update({
          "guest.name": localStorage.getItem('playerName'),
          available: false
      })
      .then(() => {
          localStorage.setItem('room', payload)
          router.push('/room/'+payload)
      })
      .catch((error) => {
          console.error("Error updating document: ", error)
      })
    }
  },
  modules: {
  }
})
