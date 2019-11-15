<template>
  <div id="home" v-on="playSoundEffect">
    <img
      class="soccer-ball"
      src="https://media2.giphy.com/media/3mJpUDBH8EmAlx6pnz/giphy.gif"
      alt
      srcset
    />
    <div class="scoreboard-container">
      <div class="scoreboard">
        <div class="result-message" v-if="playerName === winnerName">
          <h1>Congratulations, you won the game!</h1>
        </div>
        <div class="result-message" v-else-if="!winnerName">
          <h1>It's a draw!</h1>
        </div>
        <div class="result-message" v-else-if="winnerName && playerName !== winnerName">
          <h1>You lost the game :(</h1>
        </div>

        <div class="master-name">
          <h1>{{ master.name ? master.name.toUpperCase() : '' }}</h1>
        </div>

        <div class="master-score">
          <h1>0{{ master.score ? master.score : 0 }}</h1>
        </div>

        <div class="guest-name">
          <h1>{{ guest.name? guest.name.toUpperCase() : '' }}</h1>
        </div>
        <div class="guest-score">
          <h1>0{{ guest.score ? guest.score : 0 }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "home",

  data: () => ({
    boo: new Audio('boo.wav'),
    cheer: new Audio('cheer.mp3'),
    crowd: new Audio('crowd-medium-distance.wav')
  }),

  methods: {
    sound: function(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function() {
        this.sound.play();
      };
      this.stop = function() {
        this.sound.pause();
      };
    }
  },

  computed: mapState({
    playerName: "playerName",
    master: "master",
    guest: "guest",

    playSoundEffect: function (state) {
      if (this.winnerName === state.playerName) {
        return [this.cheer.play(), this.crowd.play()]
      }
      else if (state.master.score === state.guest.score) {
        return [this.crowd.play()]
      }
      else if (this.winnerName !== state.playerName) return [this.boo.play(), this.crowd.play()]
    },

    winnerName: function (state) {
      if (state.master.score > state.guest.score) return state.master.name;
      if (state.master.score < state.guest.score) return state.guest.score;
      else return null;
    }
  })
};
</script>

<style>
@font-face {
  font-family: "Dotty";
  src: url("../assets/dotty.ttf");
}

@font-face {
  font-family: "Digital";
  src: url("../assets/digital.otf");
}

* {
  margin: 0;
  padding: 0;
}

#home {
  background-image: url("../assets/football-field.jpg");
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

.result-message {
  color: aliceblue;
  padding-top: 75px;
  font-family: "Chewy";
}

.result-message > h1 {
  font-size: 30px;
  font-weight: 100;
}

.soccer-ball {
  top: 55%;
  height: 300px;
  width: 300px;
  position: absolute;
  z-index: 100;
}

.scoreboard {
  height: 200px;
  width: 500px;
  background-color: #211f1f;
  position: relative;
  padding-bottom: 270px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10%;
  box-shadow: -2px 4px 45px -8px rgba(151, 108, 245, 1);
}

.master-name {
  width: 150px;
  height: 30px;
  position: absolute;
  text-align: center;
  left: 10%;
  top: 20%;
  padding-bottom: 2%;
  padding: 20px 5px 10px 5px;
}

.master-name > h1,
.guest-name > h1 {
  font-size: 30px;
  font-family: "Digital";
  font-weight: 100;
  color: white;
}

.guest-name {
  width: 150px;
  height: 30px;
  position: absolute;
  text-align: center;
  right: 10%;
  top: 20%;
  padding-bottom: 2%;
  padding: 20px 5px 10px 5px;
}

.master-score {
  text-align: center;
  position: absolute;
  width: 150px;
  height: 150px;
  top: 70px;
  left: 50px;
  z-index: 10;
  padding-left: 10px;
}

.master-score > h1,
.guest-score > h1 {
  font-size: 150px;
  font-weight: 500;
  /* color: grey; */
  text-align: center;
  font-family: "Digital";
  color: red;
}

.guest-score {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 70px;
  right: 50px;
  z-index: 10;
  padding-left: 10px;
}
</style>
