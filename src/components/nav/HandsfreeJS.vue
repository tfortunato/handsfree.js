<template lang="pug">
v-list-group
  v-list-tile(slot='activator')
    v-list-tile-action
      img(src='/favicon.png' width=48)
    v-list-tile-title Handsfree.js
  v-list-tile(:to='{name: "homeDocumentation"}')
    v-list-tile-action
      v-icon book
    v-list-tile-title Developers Guide
</template>

<script>
export default {
  name: 'NavHandsfreeJS'
}
</script>
