<template>
  <div>
    <AudioButton :current-audio="currentAudio" />
    <router-view />
  </div>
</template>

<script>
import AudioButton from "./components/AudioButton";
import championSong from '../public/champions-song.mp3'
import crowdNoise from '../public/crowd-noise.wav';

export default {
  data: () => ({
    currentAudio: championSong
  }),
  components: { AudioButton },
  watch: {
    '$route'() {
      if (this.$route.path.includes('room')) {
        this.currentAudio = crowdNoise
        console.log("ini masuk", this.currentAudio);
      }
      console.log(this.$route.path);
    }
  }
};
</script>

<style>
</style>
