<template>
    <q-item clickable :to="to">
        <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" />
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
            <q-item-label caption>{{ caption }}</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
export interface NavMenuBackendProps {
    icon?: string;
    title?: string;
    to?: string | object;
    caption?: string;
}
withDefaults(defineProps<NavMenuBackendProps>(), {
    caption: 'Descripción del título',
    title: 'Título'
});
</script>