<template>
  <div>
    {{ hostScore }}

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
    }
  }
}
</script>

<style>

</style>