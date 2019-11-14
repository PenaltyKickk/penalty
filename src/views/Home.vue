<template>
  <div id="home">
      <div class="input-form">
        <form @submit.prevent="inputName">
          <input v-model="playerName" type="text" name="Name" id="input-name" placeholder="Please input your name.."/>
          <input type="submit" value="Join">
        </form>
      </div>
      <div>
        <button @click="create">Create Room</button>
      </div>
  </div>
</template>

<script>
import db from '../configs/firebase'

export default {
  name: 'home',
  created(){
  },
  data: () => ({
    playerName: ''
  }),
  methods: {
    inputName: function () {
      localStorage.setItem('playerName', this.playerName)
      this.$router.push({ path: 'room' })
    },
    create () {
      db.collection("rooms").add({
          host: {
            name: localStorage.getItem('name'),
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
          console.log("Document written with ID: ", docRef.id)
          localStorage.setItem('room', docRef.id)
          this.$store.state.roomId = docRef.id
      })
      .catch((error) => {
          console.error("Error adding document: ", error)
      })
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
