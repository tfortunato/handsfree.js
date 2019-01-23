<template lang="pug">
div
  v-container(grid-list-lg)
    v-layout(row wrap)
      DocsSidebar

      v-flex(xs12 md8 lg9)
        v-card
          v-card-title
            h1 Quickstart
          v-card-text
            p <strong>Handsfree.js</strong> is a drop-in library that adds head tracked cursors in just a few lines. By default, these cursors come with several plugins to enable clicking, typing, and page scrolling with no setup!
            p.text-xs-center
              img(src='https://media.giphy.com/media/7JmuMG4jX2I3fV8XvT/source.gif')
            p.text-xs-center 
              a(href='https://handsfree-drawing.glitch.me') Remix the Handsfree Drawing Starter Kit on Glitch.com
            v-flex
              v-btn(color='primary' :to='{name: "docsIntro"}')
                v-icon chevron_left
                | Intro
              v-btn(color='primary' :to='{name: "docsQuickstart"}' style='float: right')
                | Quickstart
                v-icon chevron_right
              .clear
</template>

<script>
import DocsSidebar from './Sidebar'

export default {
  name: 'docsQuickstart',
  components: {DocsSidebar}
}
</script>