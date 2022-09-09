<template>
    <q-page padding>
        <experiences-masonry :loading="loading" :rows="experiences"></experiences-masonry>
        <div v-if="error">
            {{error}} Ahh
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStoreExperiences } from 'src/stores/experiences';
import ExperiencesMasonry from '../components/ExperiencesMasonry.vue';

const storeExperiences = useStoreExperiences();
const { setExperiences } = storeExperiences;
const { getExperiencesLength, experiences, loading, error } =   storeToRefs(storeExperiences);

setExperiences('workExperience','dateEnd');



    
</script>

<style scoped>

</style>