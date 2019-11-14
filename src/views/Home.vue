<template>
  <div id="home">
      <div v-if="showPlayerName" class="input-form">
        <form @submit.prevent="getPlayerName">
          <input v-model="playerName" type="text" name="Name" id="input-name" placeholder="Please input your name.."/>
          <input type="submit" value="Join">
        </form>
      </div>
      <div v-else>
        <div v-for="room in rooms" :key="room.id">
          {{ room.id }}
          <button @click="joinRoom(room.id)">Join Room</button>
        </div>
        <button @click="createRoom">Create Room</button>
      </div>
  </div>
</template>

<script>
import db from '../configs/firebase'

export default {
  name: 'home',
  created () {
    this.$store.dispatch('getFreeRoom');
    if (localStorage.getItem('playerName')) {
      this.showPlayerName = false
    } else {
      this.playerName = ''
      this.showPlayerName = false
    }
  },
  data: () => ({
    playerName: '',
    showPlayerName: true
  }),
  computed: {
    rooms () {
      return this.$store.state.rooms
    }
  },
  methods: {
    getPlayerName: function () {
      localStorage.setItem('playerName', this.playerName)
      this.showPlayerName = false
    },
    createRoom () {
      this.$store.dispatch('createRoom');
    },
    joinRoom (id) {
      this.$store.dispatch('joinRoom', id);
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
