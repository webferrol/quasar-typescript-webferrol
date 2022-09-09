<template>
    <q-page padding>
        <experiences-masonry :loading="loading" :rows="experiences"></experiences-masonry>
    </q-page>
</template>

<script setup lang="ts">
//Composables
import { useMeta } from 'quasar';
//Store
import { storeToRefs } from 'pinia'
import { useStoreExperiences } from 'src/stores/experiences';
import ExperiencesMasonry from '../components/ExperiencesMasonry.vue';

const storeExperiences = useStoreExperiences();
const { setExperiences } = storeExperiences;
const { experiences, loading } = storeToRefs(storeExperiences);

//SEO
const metaData: Object = {
    // sets document title
    title: 'Experiencia Laboral',
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: (title: String) => `${title} - WebFerrol`,

    // meta tags
    meta: {
        description: { name: 'description', content: 'Curriculum Vitae de Xurxo González Tenreiro. Programador y diseñador web' },
        keywords: { name: 'keywords', content: 'Programador, programador web, diseñador web' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    },
    // <noscript> tags
    noscript: {
        default: 'This is content for browsers with no JS (or disabled JS)'
    }
}
useMeta(metaData);

//Carga de datos
setExperiences('workExperience', 'dateEnd');
</script>

