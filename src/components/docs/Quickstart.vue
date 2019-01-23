<template lang="pug">
div
  v-container(grid-list-lg)
    v-layout(row wrap)
      DocsSidebar

      v-flex(xs12 md8 lg9)
        v-card
          v-card-title(primary-title)
            h2.headline.mb-0 Quickstart
          v-card-text
            v-expansion-panel(v-model='tab')
              v-expansion-panel-content
                strong(slot='header') In HTML
                v-card
                  v-card-text
                    p This is how we encourage you to use <strong>Handsfree.js</strong> when using standard web technologies or when experimenting on sites like <a href="https://glitch.com/~handsfree-starter">Glitch.com (check out the Handsfree Starter!)</a>:
                    pre 
                      code.xml.
                        &lt;!-- Lock Handsfree.js to a specific version (RECOMMENDED) --&gt;
                        &lt;script src="https://unpkg.com/handsfree@4.0.2/dist/handsfree.js">&lt;/script&gt;

                        &lt;!-------------------- or --------------------&gt;
                        &lt;!-- Use any new minor release before 5.0.0 --&gt;
                        &lt;script src="https://unpkg.com/handsfree@&lt;5/dist/handsfree.js">&lt;/script&gt;

                        &lt;!-------------------- or --------------------&gt;
                        &lt;!-- Use the very latest (NOT recommended) --&gt;
                        &lt;script src="https://unpkg.com/handsfree/dist/handsfree.js">&lt;/script&gt;

                        &lt;!------------------ then --------------------&gt;
                        &lt;!-- Instantiate Handsfree with default settings and start it --&gt;
                        &lt;script&gt;
                          handsfree = new Handsfree()
                          handsfree.start()
                        &lt;/script>

              v-expansion-panel-content
                strong(slot='header') In Node
                v-card
                  v-card-text
                    p When developing for the Internet of Things or non-browser based environments, we encourage you to use the below method:
                    pre
                      code.bash npm install handsfree

                    div then:
                    pre 
                      code.javascript.
                       import Handsfree from 'handsfree'
                        const handsfree = new Handsfree()
                        handsfree.start()

            v-flex
              v-btn(color='primary' :to='{name: "docsIntro"}')
                v-icon chevron_left
                | Intro
              v-btn(color='primary' :to='{name: "docsConfig"}' style='float: right')
                | Config &amp; Settings
                v-icon chevron_right
              .clear
</template>

<script>
import DocsSidebar from './Sidebar'
import hljs from 'highlight.js'

export default {
  name: 'docsQuickstart',
  components: {DocsSidebar},

  // @todo Turn this into a $store action
  mounted () {
    window.hljs = hljs
    hljs.initHighlighting.called = false
    hljs.initHighlighting()
  },

  data () {
    return {
      tab: 0
    }
  }
}
</script>