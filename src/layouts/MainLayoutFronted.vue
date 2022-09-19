<template>
    <q-layout view="hHh lpR fFf">

        <q-header reveal bordered class="bg-primary text-white">

            <q-toolbar class="shadow-2 rounded-borders">
                <q-toolbar-title>
                    <q-btn no-caps flat label="WebFerrol" size="lg" :to="{name: 'Home'}" />
                </q-toolbar-title>


                <!-- Navegation -->
                <q-btn-dropdown stretch flat :icon="icon" v-model="menuState">
                    <div class="dropdown-list">
                        <q-list>
                            <nav-sign></nav-sign>
                            <q-separator></q-separator>
                            <q-item-label header>Opciones</q-item-label>
                            <nav-item-menu v-for="item of navItems" :key="item.title" v-bind="item"></nav-item-menu>
                        </q-list>
                    </div>
                </q-btn-dropdown>
                <!-- //Navegation -->


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
                <!-- linkedin -->
                <the-linkedin></the-linkedin>
                <!-- //linkedin -->
            </q-toolbar>           
        </q-footer>

    </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
//Componentes
import LoginAvatar from '../components/LoginAvatar.vue';
import NavSign from 'src/components/NavSign.vue';
import NavItemMenu, { NavMenuBackendProps } from 'src/components/NavItemMenu.vue';
import TheLinkedin from 'src/components/TheLinkedin.vue';

const menuState: Ref<boolean> = ref(false);//Detectamos si el menú está abierto o cerrado
const icon = computed((): string => !menuState.value ? 'menu' : 'menu_open');//Según el estado del menú (abierto/cerrado) insertamos un icono u otro

const navItems: NavMenuBackendProps[] = [
    {
        title: 'Curriculum Vitae',
        caption: 'Experiencia laboral',
        icon: 'assignment',
        to: { name: 'WorkExperience' }
    }
];

//Valor de las pestañas de navegación. Descomentar por si queremos utilizar su valor
//const tab = ref<string>('');
</script>


<style scoped>
.dropdown-list {
    max-width: 350px;
}
</style>