<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStoreExperiences } from 'src/stores/experiences';
import { useNotify } from 'src/composables/notify.hook';
import FormExperience from '../../components/FormExperience.vue';
import { Experience } from 'src/stores/models';
import { storeToRefs } from 'pinia';

//Carga del model
const { getExperience,updateExperience } = useStoreExperiences();
const { isExperience, experience } = storeToRefs(useStoreExperiences());
//Enrutamiento
const route = useRoute();
//Composable de errores
const { error } = useNotify();
//Otras opciones para dar dinamismo al formulario
const disable = ref(false);
const loading = ref(false);//No cargaremos el formulario hasta recibir todos los datos
const form = ref<Experience>({}); //Almacenaremos los datos del store


/**
 * Manipulación del envío del formulario
 */
const handleSubmit = async () => {
    try {
        disable.value = true;
        await updateExperience(String(route.params.idDoc), { ...experience.value, ...form.value });//Hacemos el famoso Spread {...object}
    } catch (err: any) {
        error(err);
    } finally {
        disable.value = false;
    }

}

/**
 * Carga de datos del formulario
 */
(async () => {
    try {
        await getExperience(String(route.params.idDoc));
        form.value = { ...experience.value };
        if (experience.value.dateStart !== undefined)
            form.value.dateStart = experience.value.dateStart.toDate().toISOString().split('T')[0];
        if (experience.value.dateEnd !== undefined)
            form.value.dateEnd = experience.value.dateEnd.toDate().toISOString().split('T')[0]
        if (!isExperience.value)
            throw new Error(`Identificador no existente: ${route.params.idDoc}`);

    } catch (err: any) {
        error(err.message);
    } finally {
        loading.value = true;
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
        <q-form autofocus @reset="handleReset" @submit.prevent="handleSubmit" v-if="loading && isExperience">
            <FormExperience v-model:code="form.code" v-model:title="form.title" v-model:jobTitle="form.jobTitle"
                v-model:dateStart="form.dateStart" v-model:dateEnd="form.dateEnd" v-model:place="form.place"
                v-model:is_certificado_profesionalidad="form.is_certificado_profesionalidad"
                v-model:province="form.province" v-model:comments="form.comments">
            </FormExperience>
            <q-btn-group push class="q-mt-xl">
                <q-btn icon="edit" :loading="disable" :disable="disable" label="Modificar experiencia" type="submit"
                    color="primary" />
                <q-btn icon="restart_alt" label="Reiniciar" type="reset" color="secondary" />
            </q-btn-group>
        </q-form>
    </q-page>
</template>