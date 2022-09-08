<template>
    <q-page padding>
        <div v-if="loading">
            Cargando
        </div>
        <div else>
            <div v-if="getExperiencesLength">
                <pre>
                    {{experiences}}
                </pre>
            </div>
        </div>
        <div v-if="error">
            {{error}} Ahh
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStoreExperiences } from 'src/stores/experiences';

const storeExperiences = useStoreExperiences();
const { setExperiences } = storeExperiences;
const { getExperiencesLength, experiences, loading, error } =   storeToRefs(storeExperiences);

setExperiences('workExperience','dateEnd');



    
</script>

<style scoped>

</style>