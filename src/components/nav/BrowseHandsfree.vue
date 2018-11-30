<template lang="pug">
v-list-group
  v-list-tile(slot='activator')
    v-list-tile-action
      img(src='/browsehandsfree.png' width=48)
    v-list-tile-title BrowseHandsfree
  v-list-tile(:to='{name: "homeBrowseHandsfree"}')
    v-list-tile-action
      v-icon public
    v-list-tile-title Home
  v-list-tile(:to='{name: "youtubeLanding"}')
    v-list-tile-action
      v-icon ondemand_video
    v-list-tile-title Handsfree YouTube
</template>

<script>
export default {
  name: 'NavBrowseHandsfree'
}
</script>
