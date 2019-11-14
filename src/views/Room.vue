<template>
  <div>
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
        if(host.ready && guest.ready){
          if(host.role == 'keeper'){
            if(host.position == guest.position){
              this.$store.dispatch('updateScoreHost')
            }
            else{
              this.$store.dispatch('updateScoreGuest')
            }
          }
          else{
            if(host.position !== guest.position){
              this.$store.dispatch('updateScoreHost')
            }
            else{
              this.$store.dispatch('updateScoreGuest')
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
