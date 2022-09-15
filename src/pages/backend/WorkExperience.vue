<script setup lang="ts">
//Store
import { storeToRefs } from 'pinia'
import { useStoreExperiences } from 'src/stores/experiences';
import ExperiencesTableBackend from 'src/components/experiences/ExperiencesTableBackend.vue';


//Obtención de constantes y métodos de Pinia
const storeExperiences = useStoreExperiences();
const { setExperiencesFromCloud } = storeExperiences;
//Carga datos del modelo
setExperiencesFromCloud();
//Registros obtenidos y estado de carga de los datos 
const { experiences, loading } = storeToRefs(storeExperiences);
</script>
<template>
    <q-page padding>
        <experiences-table-backend :loading="loading" :experiences="experiences"></experiences-table-backend>
    </q-page>
</template>