<template>

  <div>
    {{ status }}

    <br>
    {{ hostName }}
    {{ hostScore }}

    <br>
    {{ guestName }}
    {{ guestScore }}
  </div>
</template>

<script>
export default {
  computed: {
    hostScore(){
      return this.$store.state.host.score
    },
    guestScore(){
      return this.$store.state.guest.score
    },
    hostName() {
      return this.$store.state.host.name
    },
    guestName() {
      return this.$store.state.guest.name
    },
    status(){
      console.log('ini logged role', localStorage.getItem('player'))
      let role = localStorage.getItem('player')
      let result = 'draw'
      if(role == 'host') {
        if(this.hostScore > this.guestScore) {
          result = 'win'
        } else if(this.hostScore === this.guestScore) {
          result = 'draw'
        } else {
          result = 'lose'
        }
      } else {
        if(this.hostScore < this.guestScore) {
          result = 'win'
        } else if(this.hostScore === this.guestScore) {
          result = 'draw'
        } else {
          result = 'lose'
        }
      }
      return result
    }
  }
}
</script>

<style>

</style>