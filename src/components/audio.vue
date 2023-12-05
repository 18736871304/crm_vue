<template>
  <div>
    <!-- 录音播放器 -->
    <audio :src="audioSrc" ref="audio" autoplay="autoplay" controls="controls"></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      audioSrc: this.$route.query.url || ''
    }
  },
}
  
</script>