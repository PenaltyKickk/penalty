<template>
  <div id="home">
    <img class="soccer-ball" src="https://media2.giphy.com/media/3mJpUDBH8EmAlx6pnz/giphy.gif" alt="" srcset="">
    <div class="scoreboard-container">
      <!-- <img class="soccer-ball" src="https://img.pngio.com/football-png-images-images-of-soccer-balls-png-2400_2359.png" alt="soccer ball" srcset=""> -->
      <div class="scoreboard">
        <div class="winner-name">
          <h1>{{ winnerName }}</h1>
        </div>

        <div class="winner-score">
          <h1>00</h1>
        </div>

        <div class="loser-name">
          <h1>{{ loserName }}</h1>
        </div>
        <div class="loser-score">
          <h1>00</h1>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data: () => ({
    // playerName:
  }),

  computed: {
    winnerName: function () {
      return localStorage.getItem('playerName').toUpperCase()
    },

    loserName: function () {
      return 'HARDCODE'
    }
  }
}
</script>

<style>
  @font-face {
    font-family: 'Dotty';
    src: url('../assets/dotty.ttf');
  }

  @font-face {
    font-family: 'Digital';
    src: url('../assets/digital.otf');
  }

  * {
    margin: 0;
    padding: 0;
  }

  #home {
    background-image: url('../assets/football-field.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: white;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scoreboard-container {
    position: absolute;
    bottom: 50%;
  }

  .soccer-ball {
    top: 55%;
    height: 300px;
    width: 300px;
    position: absolute;
    /* left: 42.5%; */
    /* bottom: 1000%; */
    z-index: 100;
  }

  .scoreboard {
    height: 250px;
    width: 500px;
    background-color: #211f1f;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10%;
    /* border: 2px white solid; */
    box-shadow: -2px 4px 30px 24px rgba(0,0,0,0.38);
  }

  .winner-name {
    width: 150px;
    height: 30px;
    color: red;
    /* background-color: aliceblue; */
    position: absolute;
    text-align: center;
    left: 10%;
    top: 10%;
    padding-bottom: 2%;
    padding: 20px 5px 10px 5px;
  }

  .winner-name > h1, .loser-name > h1 {
    font-size: 20px;
    font-family: 'Digital';
    font-weight: 100;
    color: white;
  }

  .loser-name {
    width: 150px;
    height: 30px;
    /* background-color: aliceblue; */
    position: absolute;
    text-align: center;
    right: 10%;
    top: 10%;
    padding-bottom: 2%;
    padding: 20px 5px 10px 5px;
  }

  .winner-score {
    text-align: center;
    position: absolute;
    width: 150px;
    height: 150px;
    top: 70px;
    left: 50px;
    /* color: red; */
    /* background-color: aliceblue; */
    z-index: 10;
    padding-left: 10px;
  }

  .winner-score > h1, .loser-score > h1 {
    font-size: 150px;
    font-weight: 500;
    /* color: grey; */
    text-align: center;
    font-family: 'Digital';
    color: red;
  }

  .loser-score {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 70px;
    right: 50px;
    /* background-color: aliceblue; */
    z-index: 10;
    padding-left: 10px;
    /* padding-right: 0px; */
  }

</style>
