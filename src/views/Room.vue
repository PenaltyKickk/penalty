<template>
  <div id="room">
    <!-- <button v-for="num in 6" :key="num" @click.prevent="move(num)">
      {{ num }}
    </button> -->
    <div class="room-container">
    <div class="post-container">
      <div class="columns is-multiline is-mobile columns-post">
        <div class="column is-4 column-post" @click.prevent="move(1)">
          First column
        </div>
        <div class="column is-4 column-post" @click.prevent="move(2)">
          Second column
        </div>
        <div class="column is-4 column-post" @click.prevent="move(3)">
          Third column
        </div>
        <div class="column is-4 column-post" @click.prevent="move(4)">
          First column
        </div>
        <div class="column is-4 column-post" @click.prevent="move(5)">
          Second column
        </div>
        <div class="column is-4 column-post" @click.prevent="move(6)">
          Third column
        </div>
      </div>
    </div>
    </div>
    <div class="grass">
      <div class="ball-container">
        <img class="ball-image" src="../assets/ball.png">
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import db from '../configs/firebase'

export default {
  name: 'room',
  data() {
    return {
      start: false
    }
  },
  methods: {
    roomGet(){
      this.$store.commit('CHANGE_ROOM', this.$route.params.id)
    },
    move(pos){
      const role = localStorage.getItem('player')
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
    }
  },
  computed: {
  },
  created(){
    this.roomGet()
    db.collection("rooms").doc(this.$store.state.roomId)
    .onSnapshot((doc)=>{
      const data = doc.data()
      const host = data.host
      const guest = data.guest
      this.$store.commit('CHANGE_HOST', data.host)
      this.$store.commit('CHANGE_GUEST', data.guest)
      this.start = data.start

      if(this.start){
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
    })
  }
}
</script>

<style>
  .room-container {
    background-image: url('../assets/crowd.jpg');
    background-position: 50px;
    background-size: cover;
    opacity: 0.5;
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
</style>
