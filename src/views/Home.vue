<template>
  <div id="home">
    <div class="input-form">
      <div class="input-form-content">
        <img src="../assets/logo.gif">
        <div style="margin-top: 20px; margin-bottom: 10px;">Enter your name!</div>
        <form @submit.prevent="inputName">
          <b-field>
            <b-input rounded class="input-text" v-model="playerName" type="text" name="Name" id="input-name" placeholder="Cristiano Ronaldo"></b-input>
          </b-field>
          <b-button class="button-home" type="is-primary">ENTER STADIUM</b-button>
        </form>
        <img style="height: 150px; margin-top: 20px;" src="../assets/keeper.png">
      </div>
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
      this.$store.commit('SET_PLAYER_NAME', this.playerName)
      this.$router.push({ path: 'room' })
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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Chewy|Luckiest+Guy&display=swap');

  * {
    margin: 0;
    padding: 0;
  }

  #home {
    background-image: url('../assets/home-bg.jpg');
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    font-family: 'Chewy', cursive;
    color: #281C08;
    font-size: 20px;
  }

  .input-form {
    box-shadow: 3px -1px 28px -6px rgba(0,0,0,0.75);
    width: 500px;
    height: 500px;
    margin-top: 100px;
    padding-top: 50px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    border-radius: 5%;
    text-align: center;
    margin-right: 20px;
    margin-left: 20px;
  }

  .input-text {
    color: red !important;
    font-size: 20px;
    border-radius: 10px;
  }

  .button-home {
    font-family: 'Luckiest Guy', cursive;
    font-size: 25px;
    height: 50px;
    width: 200px;
    background: #97BE5B !important;
  }
</style>
