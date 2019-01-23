<template lang="pug">
div
  v-container(grid-list-lg)
    v-layout(row wrap)
      DocsSidebar

      v-flex(xs12 md8 lg9)
        v-card
          v-card-title
            h1 Intro
          v-card-text
            p <strong>Handsfree.js</strong> is a drop-in library that adds head tracked cursors in just a few lines. By default, <strong>Handsfree.js</strong> is configured for web browsing: clicking, typing, and page scrolling all work out the box with no setup!
            p To calculate where to place these cursors, <strong>Handsfree.js</strong> uses computer vision libraries like <a href="https://github.com/Tastenkunst/brfv4_javascript_examples">BRFv4</a> and <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet</a> to extract pose information.
            p.text-xs-center
              img(src='https://media.giphy.com/media/7JmuMG4jX2I3fV8XvT/source.gif')
            p.text-xs-center 
              a(href='https://handsfree-drawing.glitch.me') Remix the Handsfree Drawing Starter Kit on Glitch.com
            v-flex
              v-btn(color='primary' :to='{name: "docsQuickstart"}' style='float: right')
                | Quickstart
                v-icon chevron_right
              .clear
</template>

<script>
import DocsSidebar from './Sidebar'

export default {
  name: 'docsLanding',
  components: {DocsSidebar}
}
</script>