<template lang="pug">
  v-container
    v-layout(justify-center text-xs-center wrap)
      v-flex(xs12)
        v-img(
          :src='require("../assets/logo.svg")'
          class='my-3'
          contain
          height='200')

      v-flex(mb-4 xs12 md6)
        h1.display-2.font-weight-bold.mb-3 Handsfree.js
        p
          img.mr-2(src='https://img.shields.io/npm/v/handsfree.svg')
          img.mr-2(src='https://img.shields.io/github/last-commit/BrowseHandsfree/handsfreeJS.svg')
          img.mr-2(src='https://travis-ci.org/BrowseHandsfree/handsfreeJS.svg?branch=master')
          img(src='https://img.shields.io/codecov/c/github/BrowseHandsfree/handsfreeJS/master.svg?style=flat')
        p.subheading.font-weight-regular.text-xs-left
          | A JavaScript drop-in library for adding handsfree interfaces to any website, service, and Internet of Thing, and also for creating handsfree games and experiences. Runs on any device that supports <a href="https://caniuse.com/#feat=stream">getUserMedia()</a>.
</template>

<script>
  export default {
    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader'
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify'
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify'
        }
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com'
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com'
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuetifyjs.com'
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs'
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify'
        }
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer'
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined'
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
        }

      ]
    })
  }
</script>

<style>

</style>
