<template>
  <div>
    <button v-for="num in 6" :key="num" @click.prevent="move(num)">
      {{ num }}
    </button>
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

</style>
