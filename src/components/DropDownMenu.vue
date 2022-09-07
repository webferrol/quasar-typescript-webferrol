<template>
  <q-btn-dropdown stretch flat :icon="icon" v-model="menuState">
    <div class="dropdown-list">
      <q-list>
        <q-item-label header>Acceso</q-item-label>
        <q-item :to="{name:'SignIn'}" clickable v-close-popup tabindex="0">
          <q-item-section avatar>
            <q-avatar icon="login" color="secondary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Login/Sign in</q-item-label>
            <q-item-label caption>Acceso Backend</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset spaced />
        <q-item-label header>Archivos</q-item-label>
        <q-item clickable v-close-popup tabindex="0">
          <q-item-section avatar>
            <q-avatar icon="assignment" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Curriculum</q-item-label>
            <q-item-label caption>February 22, 2016</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="info" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-btn-dropdown>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';


const menuState: Ref<boolean> = ref(false);//Detectamos si el menú está abierto o cerrado

const icon = computed((): string => !menuState.value ? 'menu' : 'menu_open');//Según el estado del menú (abierto/cerrado) insertamos un icono u otro



</script>

<style scoped>
.dropdown-list {
  max-width: 350px;
}
</style>