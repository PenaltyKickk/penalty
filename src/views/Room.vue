<template>
  
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
    console.log(this.$store.state.room)
    db.collection("rooms").doc(this.$store.state.room)
    .onSnapshot(function(doc) {
        console.log(" data: ", doc.data());
    });
  }
}
</script>

<style>

</style>