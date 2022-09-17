<template>
    <q-item-label header>Acceso</q-item-label>
    <template v-if="!user">
        <q-item exact :to="{name:'SignIn'}" clickable v-close-popup tabindex="0">
            <q-item-section avatar>
                <q-avatar icon="login" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Sign in</q-item-label>
                <q-item-label caption>Acceso Backend</q-item-label>
            </q-item-section>
        </q-item>
    </template>
    <template v-else>
        <q-item :to="{name:'HomeAdmin'}" clickable v-close-popup tabindex="0">
            <q-item-section avatar>
                <q-avatar icon="login" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Zona administrativa</q-item-label>
                <q-item-label caption>Backend</q-item-label>
            </q-item-section>
        </q-item>
        <q-item @click="handleSignOut" clickable v-close-popup tabindex="0">
            <q-item-section avatar>
                <q-avatar icon="logout" color="negative" text-color="white" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Sign out</q-item-label>
                <q-item-label caption>Cerrar sesión</q-item-label>
            </q-item-section>
        </q-item>
    </template>
</template>

<script setup lang="ts">
import { useStoreUsers } from 'src/stores/users';
import { storeToRefs } from 'pinia';

const { handleSignOut } = useStoreUsers();
const { user } = storeToRefs(useStoreUsers());
</script>
