import Vue from 'vue'
import Vuex from 'vuex'
import db from '../configs/firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    updating: false,
    playerName: '',
    rooms: [],
    roomId: '',
    host: {
      name: null,
      position: 5,
      ready: false,
      role: 'keeper',
      score: 0
    },
    guest: {
      name: null,
      position: 5,
      ready: false,
      role: 'shooter',
      score: 0
    },
    position: 0,
    positionMusuh: 0
  },
  mutations: {
    CHANGE_ROOM(state, payload){
      state.roomId = payload
    },
    SET_PLAYER_NAME (state, payload) {
      state.playerName = payload
    },
    CHANGE_ROOMS(state, payload){
      state.rooms = payload
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
    },
    CHANGE_UPDATING(state, payload){
      state.updating = payload
    },
    CHANGE_POSITION(state, payload){
      state.position = payload
    },
    CHANGE_POSITION_MUSUH(state, payload){
      state.positionMusuh = payload
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
    updateScoreHost({state, commit, dispatch}, payload){
      const roomId =  payload.roomId
      console.log(payload)
      db.collection('rooms').doc(roomId).update({
        "host.score": payload.score
      })
        .then(_=>{
          console.log('masuk change score host')
          commit('CHANGE_UPDATING', true)
          dispatch('changeRound', roomId)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    updateScoreGuest({state, commit, dispatch}, payload){
      const roomId =  payload.roomId
      console.log(payload)
      db.collection('rooms').doc(roomId).update({
        "guest.score": payload.score
      })
        .then(_=>{
          console.log('masuk change score guest')
          commit('CHANGE_UPDATING', true)
          dispatch('changeRound', roomId)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    hostTurn({state, commit}, payload){
      const roomId =  payload.roomId
      db.collection('rooms').doc(roomId).update({
        "host.position": payload.position,
        "host.ready": true,
      })
        .then(_=>{
          console.log('update success')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    guestTurn({state, commit}, payload){
      const roomId =  payload.roomId
      db.collection('rooms').doc(roomId).update({
        "guest.position": payload.position,
        "guest.ready": true
      })
        .then(_=>{
          console.log('update success')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    changeHostName({state, commit}){
      const roomId = state.roomId
      const playerName = localStorage.getItem('playerName')
      db.collection('rooms').doc(roomId).update({
        "host.name": playerName
      })
        .then(_=>{
          console.log('Name Changed')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    changeGuestName({state, commit}){
      const roomId = state.roomId
      const playerName = localStorage.getItem('playerName')
      db.collection('rooms').doc(roomId).update({
        "guest.name": playerName
      })
        .then(_=>{
          console.log('Name Changed')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    updateStart({state}, payload){
      const roomId = state.roomId
      db.collection('rooms').doc(roomId).update({
        start: payload
      })
        .then(_=>{
          console.log('Game Ready')
        })
        .catch(err=>{
          console.log(err)
        })
    },
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
    createRoom (context, payload) {
      console.log('ini payload', payload)
      db.collection('rooms').doc(payload).set({
        host: {
          name: localStorage.getItem('playerName'),
          role: 'keeper',
          position: 0,
          ready: false,
          score: 0
        },
        guest: {
          name: null,
          role: 'shooter',
          position: 0,
          ready: false,
          score: 0
        },
        round: 1,
        start: false,
        available: true
      })
      .then((docRef) => {
          localStorage.setItem('room', payload)
          context.commit('CHANGE_ROOM', payload)
          router.push('/room/'+payload)
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
    },
    changeRound (context, payload) {
      setTimeout(() => {
        db.collection("rooms").doc(payload).get()
        .then((room) => {
          let hostRole = room.data().host.role;
          let guestRole = room.data().guest.role;
          let round = room.data().round;
          round++;
  
          if (hostRole === 'keeper') hostRole = "shooter"
          else hostRole = "keeper"
          if (guestRole === 'keeper') guestRole = "shooter"
          else guestRole = "keeper"
  
          return db.collection("rooms").doc(payload).update({
              "host.role": hostRole,
              "host.position": 0,
              "host.ready": false,
              "guest.role": guestRole,
              "guest.position": 0,
              "guest.ready": false,
              round: round
          })
        })
        .then(() => {
        context.commit('CHANGE_UPDATING', false)
          localStorage.setItem('room', payload)
        })
        .catch((error) => {
          context.commit('CHANGE_UPDATING', false)
          console.error("Error change round : ", error)
        })
      }, 3000)
    }
  },
  modules: {
  }
})
