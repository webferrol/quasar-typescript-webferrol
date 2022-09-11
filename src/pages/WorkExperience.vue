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
//SEO
import { useMetaLabels } from '../composables/meta.hook';

const storeExperiences = useStoreExperiences();
const { setExperiences } = storeExperiences;
const { experiences, loading } = storeToRefs(storeExperiences);

//SEO
useMetaLabels({title: 'Experiencia laboral',descriptionContent: 'Curriculum Vitae de Xurxo González Tenreiro. Programador y diseñador web',keywordsContent:['Curriculum Vitae','experiencia laborar de Xurxo González Tenreiro','Programador', 'programador web', 'diseñador web','gestor de contenidos']});


//Carga de datos
setExperiences('workExperience', 'dateEnd');
</script>

