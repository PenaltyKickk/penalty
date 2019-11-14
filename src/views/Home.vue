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
  </div>
</template>

<script>
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
      this.$store.commit('SET_PLAYER_NAME', this.playerName)
      this.$router.push({ path: 'room' })
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
