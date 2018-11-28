<template lang="pug">
  div
    v-container(grid-list-md)
      v-layout(wrap)
        v-flex(xs12 md6 lg8)
          v-card(light)
            v-card-title
              h2 Settings
        v-flex(xs12 md6 lg4)
          v-card(light)
            v-card-title
              h2 Plugins
</template>

<script>
export default {
  name: 'Settings'
}
</script>

