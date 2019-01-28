<template lang="pug">
div
  v-container(grid-list-lg flex)
    v-layout(row wrap)
      DocsSidebar

      v-flex(xs12 md8)
        v-card
          v-card-title(primary-title)
            h1.headline.mb-0 Default Usage
          v-card-text
            p By default, Handsfree.js adds a cursor on the screen for one user at a time. This cursor is capable of the following:
            ul
              li Clicking and focusing elements with a "Click Action" (smile wide by default)
              li Display a virtual keyboard when clicking into <code>&lt;input&gt;</code> fields
              li Scroll pages by moving the cursor above or below the window

            v-expansion-panel(v-model='tab')
              v-expansion-panel-content
                strong(slot='header') Buttons and Switches
                v-card
                  v-card-text
                    p Last pressed button: <strong>{{lastButton}}</strong>
                    v-btn(large color='primary' @click='lastButton = "A"') Test button A
                    v-btn(large color='success' @click='lastButton = "B"') Test button B
                    v-btn(large color='error' @click='lastButton = "C"') Test button C
                    br
                    v-radio-group(v-model='lastRadio')
                      v-radio(label='Test Switch A' value=0)
                      v-radio(label='Test Switch B' value=1)
                      v-radio(label='Test Switch C' value=2)

            v-flex
              v-btn(color='primary' :to='{name: "docs"}')
                v-icon chevron_left
                | Getting Started
              v-btn(color='primary' :to='{name: "docsConfig"}' style='float: right')
                | Config &amp; Settings
                v-icon chevron_right
              .clear
</template>

<script>
import DocsSidebar from './Sidebar'

export default {
  name: 'docsDefaultUsage',
  components: {DocsSidebar},
  mounted () {this.$store.dispatch('syntaxHighlight')},

  data () {
    return {
      lastButton: '',
      lastRadio: 0,
      tab: 0
    }
  }
}
</script>