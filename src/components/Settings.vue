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
              h2 Quick Settings
            v-card-text
              v-radio-group(v-model='quickSetting')
                v-radio(label='Low accuracy; High performance' value='low')
                v-radio(label='Balanced' value='balanced')
                v-radio(label='High accuracy; Low performance' value='high')
                v-radio(label='Custom' value='custom')
              v-checkbox(label='Multi-user (beta)?' v-model='isMultiUser')
              v-checkbox.mt-0(label='Use animated background?' v-model='useBackground')
</template>

<script>
export default {
  name: 'Settings',

  watch: {
    useBackground () {this.toggleBackground()}
  },
  
  data () {
    return {
      useBackground: true,
      isMultiUser: false,
      quickSetting: 'custom'
    }
  },

  methods: {
    toggleBackground () {
      const plugin = window.handsfree.plugin['boids-debugger']
      if (this.useBackground) {
        plugin.enable()
      } else {
        plugin.disable()
      }
    }
  }
}
</script>

