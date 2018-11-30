<template lang="pug">
  div
    p Turn on the webcam, then move the cursor outside your browser to "look" towards that direction. Start/pause by clicking, which you can do by smiling 😊
    #youtube-player
</template>

<script>
require('../../handsfree.js/plugins/YouTube360.js')

export default {
  name: 'Demo',

  /**
   * Load YouTube API
   */
  mounted () {
  }
}
</script>