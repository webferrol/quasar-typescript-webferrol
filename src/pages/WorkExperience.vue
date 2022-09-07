<template>
    <q-page padding>
        Experiencia laboral
    </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStoreExperiences } from 'src/stores/experiences';
const { experiences } =  storeToRefs<any>(useStoreExperiences());
    
</script>

<style scoped>

</style>