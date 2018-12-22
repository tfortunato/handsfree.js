<template lang="pug">
div
  .handsfree-simple-keyboard
</template>

<script>
export default {
  name: 'Keyboard'
}
</script>

<style lang="stylus" scoped>
>>>.handsfree-simple-keyboard
  position: fixed
  bottom: -450px
  height: 450px
  left: 0
  right: 0
  z-index: 10
  color: #444

.handsfree-simple-keyboard-is-visible .handsfree-simple-keyboard
  bottom: 0
</style>
