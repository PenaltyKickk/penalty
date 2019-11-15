<template>
  <div id="room">
    <!-- <button v-for="num in 6" :key="num" @click.prevent="move(num)">
      {{ num }}
    </button> -->
    <div class="room-container">
      <div class="info-container">
        <b-button class="button-room" v-if="host && ready && !start" @click.prevent="startGame()">start</b-button>
        <span style="margin: 20px;">ROUND: {{ round }}</span>
      </div>
    <div class="post-container">
      <div class="columns is-multiline is-mobile columns-post">
        <div class="column is-4 column-post" v-for="num in 6" :key="num" @click.prevent="move(num)">
          <div v-if="position === num && positionMusuh === 0">
            <div v-if="role == 'keeper'">
              <!-- ready keeper -->
              <img class="image-keeper" src="../assets/just-keeper.png">
            </div>
            <div v-else>
              <!-- ready bola -->
              <img class="image-ball" src="../assets/target.png">
            </div>
          </div>
          <div v-if="position === num && positionMusuh === num">
            <div>
              <!-- bola dan keeper -->
              <img class="image-keeper" src="../assets/ball-and-keeper.png">
            </div>
          </div>
          <div v-if="position === num && positionMusuh !== 0 && positionMusuh !== num">
            <div v-if="loggedRole == 'keeper'">
              <div>
                <!-- keeper -->
                <img class="image-keeper" src="../assets/just-keeper.png">
              </div>
            </div>
            <div v-else>
              <!-- bola -->
              <img class="image-ball" src="../assets/ball.png">
            </div>
          </div>
          <div v-if="positionMusuh === num && positionMusuh !== position && loggedReady">
            <div v-if="loggedRole == 'keeper'">
              <!-- bola -->
              <img class="image-ball" src="../assets/ball.png">
            </div>
            <div v-else>
              <div>
                <!-- keeper -->
                <img class="image-keeper" src="../assets/just-keeper.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="grass">
      <div class="ball-container">
        <img class="ball-image" src="../assets/ball.png" v-if="role === 'shooter' && (positionMusuh == 0 || !loggedReady)">
      </div>
    </div>
    <div>
      <button v-if="host && ready" @click.prevent="startGame()">start</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import db from '../configs/firebase'

export default {
  name: 'room',
  data() {
    return {
      start: false,
      ballKickSound: new Audio('soccer-ball-hit.wav'), // play this sound when the ball is kicked
      host:  false,
      ready: false,
      role: ''
    }
  },
  methods: {
    roomGet () {
      this.$store.commit('CHANGE_ROOM', this.$route.params.id)
    },
    move(pos){
      const role = localStorage.getItem('player')
      console.log(this.$store.state[role].ready)
      if(!this.$store.state[role].ready && this.start) {
        console.log('trigger')
        if(role == 'host'){
          this.$store.dispatch('hostTurn', {
            roomId: this.$route.params.id,
            position: pos
          })
        }
        else{
          this.$store.dispatch('guestTurn', {
            roomId: this.$route.params.id,
            position: pos
          })
        }
      }
    },
    startGame(){
      this.$store.dispatch('updateStart', true)
    },
    roomDone(){
      this.$router.push('/result')
    }
  },
  computed: {
    position(){
      return this.$store.state.position
    },
    positionMusuh(){
      return this.$store.state.positionMusuh
    },
    loggedRole(){
      console.log('ini logged role', this.$store.state[localStorage.getItem('player')].role)
      return this.$store.state[localStorage.getItem('player')].role
    },
    round(){
      return this.$store.state.round
    },
    loggedReady(){
      this.$store.state[localStorage.getItem('player')].ready
      return this.$store.state[localStorage.getItem('player')].ready
    }
  },
  created () {
    this.roomGet()
    db.collection("rooms").doc(this.$store.state.roomId)
    .onSnapshot((doc)=>{
      const data = doc.data()
      const host = data.host
      const guest = data.guest

      if(data.round > 6){
        this.$router.push('/result')
      }
      else{
        this.$store.commit('CHANGE_HOST', data.host)
        this.$store.commit('CHANGE_GUEST', data.guest)
        this.$store.commit('CHANGE_ROUND', data.round)
        this.start = data.start
  
        if(this.round % 2 == 0){
          if(localStorage.getItem('player') == 'host'){
            this.role = 'shooter'
          }
          else{
            this.role = 'keeper'
          }
        }
        else{
          if(localStorage.getItem('player') == 'host'){
            this.role = 'keeper'
          }
          else{
            this.role = 'shooter'
          }
        }

        if(host.name == localStorage.getItem('playerName') || localStorage.getItem('player') == 'host'){
          localStorage.setItem('player', 'host')
          this.$store.dispatch('changeHostName')
        }
        else{
          localStorage.setItem('player', 'guest')
          this.$store.dispatch('changeGuestName')
        }
  
        if(localStorage.getItem('player') == 'host'){
          this.$store.commit('CHANGE_POSITION', data.host.position)
          this.$store.commit('CHANGE_POSITION_MUSUH', data.guest.position)
        }
        else{
          this.$store.commit('CHANGE_POSITION', data.guest.position)
          this.$store.commit('CHANGE_POSITION_MUSUH', data.host.position)
        }
  
        if(localStorage.getItem('player') === 'host'){
          console.log('host masuk')
          this.host = true
        }
  
        if(!data.available){
          this.ready = true
        }
  
        if(this.start && localStorage.getItem('player') === 'host'){
          if(host.ready && guest.ready && !this.$store.state.updating){
            this.$store.commit('CHANGE_UPDATING', true)
            if(host.role == 'keeper'){
              if(host.position == guest.position){
                host.score++
                const hostScore = host.score
                console.log(hostScore)
                this.$store.dispatch('updateScoreHost', {
                  roomId: this.$store.state.roomId,
                  score: hostScore
                })
              }
              else{
                guest.score++
                const guestScore = guest.score
                console.log(guestScore)
  
                this.$store.dispatch('updateScoreGuest', {
                  roomId: this.$store.state.roomId,
                  score: guestScore
                })
              }
            }
            else{
              if(host.position !== guest.position){
                host.score++
                const hostScore = host.score
                console.log(hostScore)
                this.$store.dispatch('updateScoreHost', {
                  roomId: this.$store.state.roomId,
                  score: hostScore
                })
              }
              else{
                guest.score++
                const guestScore = guest.score
                console.log(guestScore)
  
                this.$store.dispatch('updateScoreGuest', {
                  roomId: this.$store.state.roomId,
                  score: guestScore
                })
              }
            }
          }
        }
      }

    })
  }
}
</script>

<style>
  .room-container {
    background-image: url('../assets/crowd.jpg');
    background-position: 50px;
    background-size: cover;
    /* opacity: 0.5; */
  }
  .columns-post {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 0;
    margin-bottom: 0;
    border-top: solid 20px white;
    border-left: solid 20px white;
    border-right: solid 20px white;
    border-radius: 10px;
    box-shadow: inset 11px -18px 55px -5px rgba(0,0,0,0.1), 3px -1px 28px -6px rgba(0,0,0,0.75);
  }
  .column-post {
    height: 25vh;
    cursor: pointer;
    text-align: center;
  }
  .post-container {
    padding-top: 10vh;
    margin-left: 20px;
    margin-right: 20px;
  }
  .grass {
    background-image: url('https://www.123freevectors.com/wp-content/original/113923-green-horizontal-striped-background-vector.jpg');
    background-size: cover;
    height: 50vh;
  }
  .ball-container {
    padding-top: 80px;
    text-align: center;
  }
  .ball-image {
    height: 80px;
  }
  .image-keeper {
    height: 180px;
  }
  .image-ball {
    height: 50px;
  }
  .button-room {
    box-shadow: inset 11px -18px 55px -5px rgba(0,0,0,0.1) !important;
    font-family: 'Luckiest Guy', cursive;
    font-size: 25px;
    height: 50px;
    width: 200px;
    color: #7E3965;
    box-shadow: 3px -1px 28px -6px #FFEAC8;
    background: #FFEBC8 !important;
  }
  .info-container {
    padding-top: 20px;
    padding-left: 100px;
    font-family: 'Luckiest Guy', cursive;
    font-size: 30px;
    color: #FFFFFF;
  }
</style>
