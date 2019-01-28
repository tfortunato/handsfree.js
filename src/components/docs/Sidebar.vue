<template lang="pug">
v-flex(xs12 md4)
  v-card
    slot
    v-card-text
      v-list(three-line)
        v-list-tile(:to='{name: "docs"}')
          v-list-tile-avatar
            v-img(style='border-radius: 0 !important' src='/favicon.png')
          v-list-tile-content
            v-list-tile-title Getting Started
            v-list-tile-sub-title Learn how to setup Handsfree.js through CDN or NPM
        v-divider
        v-list-tile(:to='{name: "docsQuickstart"}')
          v-list-tile-content
            v-list-tile-title Quickstart
            v-list-tile-sub-title Description ...
        v-divider
        v-list-tile(:to='{name: "docsConfig"}')
          v-list-tile-content
            v-list-tile-title Config and Settings
            v-list-tile-sub-title Description ...
        v-divider
        v-list-tile(:to='{name: "docsPlugins"}')
          v-list-tile-content
            v-list-tile-title Plugins
            v-list-tile-sub-title Description ...
        v-divider
        v-list-tile(:to='{name: "docsEvents"}')
          v-list-tile-content
            v-list-tile-title Events
            v-list-tile-sub-title Description ...
        v-divider
        v-list-tile(:to='{name: "docsCursor"}')
          v-list-tile-content
            v-list-tile-title handsfree.cursor
            v-list-tile-sub-title Description ...
</template>

<script>
export default {
  name: 'DemoSidebar'
}
</script>
