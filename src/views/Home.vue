<template>
  <div id="home">
      <div class="input-form">
        <form @submit.prevent="inputName">
          <input v-model="playerName" type="text" name="Name" id="input-name" placeholder="Please input your name.."/>
          <input type="submit" value="Join">
        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data: () => ({
    playerName: ''
  }),

  methods: {
    inputName: function () {
      localStorage.setItem('playerName', this.playerName)
      this.$router.push({ path: 'room' })
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
