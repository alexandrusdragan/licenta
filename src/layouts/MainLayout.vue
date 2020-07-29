<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="$route.fullPath.includes('/chat')"  v-go-back.single icon="arrow_back" flat dense label="Back" />
        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>
        <q-btn to="/auth" class="absolute-right q-pr-sm" icon="account_circle" no-caps flat dense label="Login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework', 
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  computed:{
    title(){
      console.log(this.$route)
      let currentPath=this.$route.fullPath
      if(currentPath=='/') return 'LicentaApp'
      else if(currentPath=='/chat') return 'Chat'
      else if(currentPath=='/auth') return 'Login'
    }
  },
  components: { EssentialLink },
  
}
</script>
