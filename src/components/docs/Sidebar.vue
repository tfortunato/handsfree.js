<template lang="pug">
v-flex(xs12 md4 lg3)
  v-list
    v-list-tile(:to='{name: "docsIntro"}')
      v-list-tile-title Intro
    v-list-tile(:to='{name: "docsQuickstart"}')
      v-list-tile-title Quickstart
    v-list-tile(:to='{name: "docsConfig"}')
      v-list-tile-title Config and Settings
    v-list-tile(:to='{name: "docsPlugins"}')
      v-list-tile-title Plugins
    v-list-tile(:to='{name: "docsEvents"}')
      v-list-tile-title Events
    v-list-tile(:to='{name: "docsTarget"}')
      v-list-tile-title handsfree.$target
</template>

<script>
export default {
  name: 'DemoSidebar'
}
</script>
