<template>
  <div>
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
    }
  }
}
</script>

<style>

</style>