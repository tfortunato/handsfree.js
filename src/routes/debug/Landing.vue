<template lang="pug">
div
  v-container(grid-list-md)
    v-layout(wrap)
      v-flex(xs12 md6 lg8)
        v-card
          v-card-title
            h2 Debug
          v-card-text
            v-alert(type='info' value=1) This route displays useful debug information.
</template>

<script>
export default {
  name: 'debugLanding',

  mounted () {
  }
}
</script>
