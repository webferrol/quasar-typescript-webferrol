<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreExperiences } from 'src/stores/experiences';
import { useNotify } from 'src/composables/notify.hook';
import FormExperience from 'src/components/experiences/FormExperience.vue';
import { Experience } from 'src/stores/models';
import { storeToRefs } from 'pinia';

//Carga del model
const { setExperience,updateExperience } = useStoreExperiences();
const { isExperience, experience, loading } = storeToRefs(useStoreExperiences());
//Enrutamiento
const route = useRoute();
//Composable de errores
const { error } = useNotify();
const form = ref<Experience>({}); //Almacenaremos los datos del store

/**
 * Carga de datos del formulario
 */
(async () => {
    try {
        //Obtenemos datos del modelo
        await setExperience(String(route.params.idDoc));
        //Cargamos formularios con los nuevos valores
        form.value = { ...experience.value };
        //Paso de datos en Timestamp a String para el formulario
        if (experience.value.dateStart !== undefined)
            form.value.dateStart = experience.value.dateStart.toDate().toISOString().split('T')[0];
        if (experience.value.dateEnd !== undefined)
            form.value.dateEnd = experience.value.dateEnd.toDate().toISOString().split('T')[0]
        if (!isExperience.value)
            throw new Error(`Identificador no existente: ${route.params.idDoc}`);

    } catch (err: any) {
        error(err.message);
    }
})()

/**
 * Reseteo del formulario a su estado inicial
 */
const handleReset = () => {
    form.value = { ...experience.value };
    if (experience.value.dateStart !== undefined)
        form.value.dateStart = experience.value.dateStart.toDate().toISOString().split('T')[0];
    if (experience.value.dateEnd !== undefined)
        form.value.dateEnd = experience.value.dateEnd.toDate().toISOString().split('T')[0]
}
</script>
    
<template>
    <q-page padding>
        <h1 class="text-h5">Editar experiencia</h1>
        <template v-if="form.title">
            <q-form autofocus @reset="handleReset" @submit.prevent="updateExperience(String($route.params.idDoc), { ...experience, ...form})">
                <FormExperience v-model:code="form.code" v-model:title="form.title" v-model:jobTitle="form.jobTitle"
                    v-model:dateStart="form.dateStart" v-model:dateEnd="form.dateEnd" v-model:place="form.place"
                    v-model:is_certificado_profesionalidad="form.is_certificado_profesionalidad"
                    v-model:province="form.province" v-model:comments="form.comments">
                </FormExperience>
                <q-btn-group push class="q-mt-xl">
                    <q-btn icon="edit" :loading="loading" :disable="loading" label="Modificar experiencia" type="submit"
                        color="primary" />
                    <q-btn icon="restart_alt" label="Reiniciar" type="reset" color="secondary" />
                </q-btn-group>
            </q-form>
        </template>
    </q-page>
</template>