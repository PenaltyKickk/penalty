<template>
  <div id="audio-button">
    <i @click.prevent="toggleMute" v-if="isPlaying" class="volume-button fas fa-volume-up fa-3x"></i>
    <i @click.prevent="toggleMute" v-if="!isPlaying" class="volume-button fas fa-volume-off fa-3x"></i>
  </div>
</template>

<script>
export default {
  data: () => ({
    isPlaying: false
  }),

  methods: {
    toggleMute() {
      if (this.audio.isPlaying) {
        this.audio.file.pause();
        this.isPlaying = false;
      } else {
        this.audio.file.play();
        this.isPlaying = true;
      }
    }
  },

  props: ['currentAudio'],

  computed: {
    audio () {
      return {
        file: new Audio(this.currentAudio),
        isPlaying: this.isPlaying
      }
    }
  }
}
</script>

<style>
  .volume-button {
    /* float: left; */
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
  }
</style>