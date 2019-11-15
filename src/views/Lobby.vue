<template>
  <div class="lobby">
    <!-- <AudioButton/> -->
    <b-button @click="createRoom" class="button-lobby">Create Room</b-button>
    <div class="columns columns-room is-multiline is-centered">
      <div v-for="room in rooms" :key="room.id" class="column column-room is-one-fifth">
        <div>
          {{ room.id }}
        </div>
        <div>
          <b-button class="button-join" @click="joinRoom(room.id)">
            <b-icon style="margin-right: 5px;"
                icon="plus-circle"
                size="is-small">
            </b-icon>JOIN</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../configs/firebase'
// import AudioButton from '../components/AudioButton'

export default {
  name: 'Lobby',
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
      this.$store.commit('SET_PLAYER_NAME', this.playerName)
      this.$router.push({ path: 'room' })
      // this.$router.push({ path: 'room' })
      this.showPlayerName = false
    },
    createRoom () {
      this.$buefy.dialog.prompt({
        message: `Enter room name`,
        type: 'is-warning',
        inputAttrs: {
          placeholder: '',
          maxlength: 15
        },
        trapFocus: true,
        onConfirm: (value) => this.$store.dispatch('createRoom', value)
      })
      // this.$store.dispatch('createRoom');
    },
    joinRoom (id) {
      this.$store.dispatch('joinRoom', id);
    },
    removeRoom () {
      if (localStorage.getItem('room')) {

      }
    }
  },
  components: {
    // AudioButton
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Chewy|Luckiest+Guy&display=swap');

.lobby {
  text-align: center;
  background-image: url('../assets/lobby-bg.jpg');
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
.button-lobby {
  box-shadow: inset 11px -18px 55px -5px rgba(0,0,0,0.1) !important;
  margin-top: 50px;
  font-family: 'Luckiest Guy', cursive;
  font-size: 25px;
  height: 50px;
  width: 200px;
  color: #7E3965;
  box-shadow: 3px -1px 28px -6px #FFEAC8;
  background: #FFEBC8 !important;
}
.button-join {
  margin-top: 10px;
  color: #7E3965;
  font-family: 'Chewy', cursive;
  background: #FFEBC8 !important;
}

.column-room {
  background: #7E3965;
  border-radius: 10px;
  margin: 10px;  
  font-family: 'Chewy', cursive;
  color: #FFEBC8;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: inset 11px -18px 55px -5px rgba(0,0,0,0.5), 3px -1px 28px -6px #FFEAC8;
}

.columns-room {
  margin-top: 30px;
}

.input-name-modal {
  max-width: 400px !important;
}
</style>