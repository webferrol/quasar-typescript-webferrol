<template>
    <q-layout view="hHh lpR fFf">

        <q-header reveal bordered class="bg-primary text-white">

            <q-toolbar class="shadow-2 rounded-borders">
                <q-toolbar-title>
                    <q-btn no-caps flat label="WebFerrol" size="lg" :to="{name: 'Home'}" />
                </q-toolbar-title>
                <drop-down-menu></drop-down-menu>
            </q-toolbar>

            <!-- <q-toolbar>
                <q-toolbar-title>
                    <HorizontalMenu></HorizontalMenu>
                </q-toolbar-title>
            </q-toolbar> -->
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer elevated class="bg-grey-8 text-white">
            <q-toolbar class="shadow-2 rounded-borders">
                <q-toolbar-title>
                    <login-avatar></login-avatar>
                </q-toolbar-title>
                <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
                <!-- Descomentar si queremos usar el modelo "tab"
                <q-tabs v-model="tab" shrink> -->
                <!-- <q-tabs shrink>
                    <q-route-tab no-caps name="tab1" :to="{name: 'WorkExperience'}" label="Experiencia laboral" />
                </q-tabs> -->
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script setup lang="ts">
//import { ref } from 'vue';
//Componentes
import DropDownMenu from 'src/components/DropDownMenu.vue';
import LoginAvatar from '../components/LoginAvatar.vue';

//Valor de las pestañas de navegación. Descomentar por si queremos utilizar su valor
//const tab = ref<string>('');
</script>