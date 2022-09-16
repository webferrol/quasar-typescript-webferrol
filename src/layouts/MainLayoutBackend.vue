<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn icon="home" no-caps flat color="primary" text-color="white" label="Ir a Frontend" size="md"
            :to="{name: 'Home'}" />
        </q-toolbar-title>

        <!-- Logout -->
        <q-list>
          <q-item @click="onLogout" clickable v-close-popup tabindex="0">
            <q-item-section avatar>
              <q-avatar icon="logout" color="negative" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Sign out</q-item-label>
              <q-item-label caption>Cerrar sesión</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- //Logout -->
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
//Composables
import { useLogout } from '../composables/logout.hook';

//Método para cerrar sesión
const { onLogout } = useLogout();

//Menú lateral
const navMenuBackend: NavMenuBackendProps[] = [
  {
    title: 'Dashboard',
    caption: 'Escritorio principal',
    icon: 'dashboard',
    to: { name: 'HomeAdmin' }
  },
  {
    title: 'User profile',
    caption: 'Perfil de usuario',
    icon: 'badge',
    to: { name: 'UserProfile' }
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
//Enlaces del menú lateral
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
