<template>
  <div id="home">
      <div v-if="showPlayerName" class="input-form">
        <form @submit.prevent="getPlayerName">
          <input v-model="playerName" type="text" name="Name" id="input-name" placeholder="Please input your name.."/>
          <input type="submit" value="Join">
        </form>
      </div>
      <div v-else>
        <button @click="createRoom">Create Room</button>
        <!-- <div v-for="room in rooms" :key="room"> -->
        <div v-for="room in rooms" :key="room.id">
          {{ room.id }}
        <button @click="joinRoom(room.id)">Join Room</button>
        </div>
      </div>
  </div>
</template>

<script>
import db from '../configs/firebase'

export default {
  name: 'home',
 
  created () {
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
        this.rooms = lists
    });
  },
  data: () => ({
    playerName: '',
    showPlayerName: true,
    rooms: []
  }),
  methods: {
    getPlayerName: function () {
      localStorage.setItem('playerName', this.playerName)
      // this.$router.push({ path: 'room' })
      this.showPlayerName = false
    },
    createRoom () {
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
          this.$store.commit('CHANGE_ROOM', docRef.id)
          this.$router.push('/room/'+docRef.id)
      })
      .catch((error) => {
          console.error("Error adding document: ", error)
      })
    },
    joinRoom (id) {
      db.collection("rooms").doc(id).update({
          "guest.name": localStorage.getItem('playerName'),
          available: false
      })
      .then(() => {
          localStorage.setItem('room', id)
          this.$router.push('/room/'+id)
      })
      .catch((error) => {
          console.error("Error adding document: ", error)
      })
    },
    removeRoom () {
      if (localStorage.getItem('room')) {

      }
    }
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #home {
    background-color: grey;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-form {
    height: 250px;
    width: 500px;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
