<template>
  <div id="myScreen">
    <audio loop id="music" preload="auto" style="display: none">
        <source src="./assets/Station.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  methods: {
      ...mapActions([
          'loadGraphics'
      ]),
  },
  created(){
    this.$nextTick(function () {
      let element = document.getElementById('myScreen');
      this.$store.dispatch( 'loadGraphics', element );
    })
  }
}
</script>
<style scoped>
  #myScreen{
    width: 100vw;
    height: 100vh;
  }
</style>
