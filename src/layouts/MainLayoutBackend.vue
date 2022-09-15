<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn icon="home" no-caps flat color="primary" text-color="white" label="Ir a Frontend" size="md" :to="{name: 'Home'}" />
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menú de navegación
        </q-item-label>
        <q-item>
          <LoginAvatar></LoginAvatar>
        </q-item>
        <NavMenuBackend v-for="to of navMenuBackend" :key="to.title" v-bind="to"></NavMenuBackend>
        <q-separator />
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//Components
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import NavMenuBackend, { NavMenuBackendProps } from 'src/components/NavMenuBackend.vue';
import LoginAvatar from 'src/components/LoginAvatar.vue';

const navMenuBackend: NavMenuBackendProps[] = [
  {
    title: 'Dashboard',
    caption: 'Escritorio principal',
    icon: 'dashboard',
    to: { name: 'HomeAdmin' }
  },
  {
    title: 'Curriculum vitae',
    caption: 'Experiencia laboral',
    icon: 'work',
    to: { name: 'WorkExperienceAdmin' }
  },
  {
    title: 'Curriculum vitae',
    caption: 'Nueva Experiencia',
    icon: 'assignment_add',
    to: { name: 'NewExperience' }
  },
];
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Iconos de Google',
    caption: 'Material Icons',
    icon: 'palette',
    link: 'https://fonts.google.com/icons'
  },
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

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
