<template>
    <q-page padding>
        <experiences-masonry :loading="loading" :rows="experiences"></experiences-masonry>
    </q-page>
</template>

<script setup lang="ts">
//Store
import { storeToRefs } from 'pinia'
import { useStoreExperiences } from 'src/stores/experiences';
import ExperiencesMasonry from '../components/ExperiencesMasonry.vue';
//SEO composable
import { useMetaLabels } from '../composables/meta.hook';
//SEO
useMetaLabels({title: 'Experiencia laboral',descriptionContent: 'Curriculum Vitae de Xurxo González Tenreiro. Programador y diseñador web',keywordsContent:['Curriculum Vitae','experiencia laborar de Xurxo González Tenreiro','Programador', 'programador web', 'diseñador web','gestor de contenidos']});

//Obtención de constantes y métodos de Pinia
const storeExperiences = useStoreExperiences();
const { setExperiencesFromCloud } = storeExperiences;
//Carga datos del modelo
setExperiencesFromCloud();
//Registros obtenidos y estado de carga de los datos 
const { experiences, loading } = storeToRefs(storeExperiences);
</script>

