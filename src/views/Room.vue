<template>
  <div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import db from '../configs/firebase'

export default {
  name: 'room',
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
      this.$store.commit('CHANGE_HOST', doc.data().host)
      this.$store.commit('CHANGE_GUEST', doc.data().guest)
    })
  }
}
</script>

<style>

</style>
