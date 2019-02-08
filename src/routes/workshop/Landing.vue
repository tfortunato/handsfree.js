<template lang="pug">
div
  v-container(grid-list-lg flex)
    v-layout(row wrap)
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Day 1: Inspired by my visit to the STUDIO for Creative Inquiry at CMU, I&#39;m committing to a round of <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a><br><br>My goal is to overcome my Impostor Syndrome by posting one video a day on using <a href="https://t.co/hqzGH1Ya0m">https://t.co/hqzGH1Ya0m</a> to do almost anything handsfree from your browser ✨ <a href="https://t.co/FvCpwb3KIC">pic.twitter.com/FvCpwb3KIC</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1093258290933379072?ref_src=twsrc%5Etfw">February 6, 2019</a></blockquote>
      v-flex(xs12 md6 lg4)
        <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> Day 2: Today we&#39;ll start a 3D painting app (inspired by Tilt Brush). In this tutorial you&#39;ll learn how to:<br><br>- Extract head pose info<br>- React to clicks (smile gesture)<br><br>Tutorial: <a href="https://t.co/MEZSs7aSpB">https://t.co/MEZSs7aSpB</a><br>Demo: <a href="https://t.co/kMrBSesiKM">https://t.co/kMrBSesiKM</a> <a href="https://t.co/LkpYE2WdZ6">pic.twitter.com/LkpYE2WdZ6</a></p>&mdash; Oz Ramos 🧙 (@LabOfOz) <a href="https://twitter.com/LabOfOz/status/1093686802215362560?ref_src=twsrc%5Etfw">February 8, 2019</a></blockquote>
</template>

<script>
export default {
  name: 'WorkshopsLanding',

  mounted () {
    this.$store.dispatch('loadScripts', ['https://platform.twitter.com/widgets.js'])
  }
}
</script>

<style lang="stylus" scoped>
blockquote
  background: #fff
  padding: 20px
  border-radius: 3px
  box-shadow: 1px 1px 3px rgab(0, 0, 0, 0.35)
  overflow-wrap: break-word
  word-wrap: break-word
</style>
