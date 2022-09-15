<script setup lang="ts">
    import { ref } from 'vue';
    import { Experience } from 'src/stores/models';
    import { useStoreExperiences } from 'src/stores/experiences';
    import FormExperience from 'src/components/experiences/FormExperience.vue';
    import { storeToRefs } from 'pinia';
    
    //Modelo 
    const {addExperience} = useStoreExperiences();
    const {experience,loading} = storeToRefs(useStoreExperiences());
    
    //Datos con que cargaremos el formulario
    const data: Experience = {
        code: '',
        title: '',
        jobTitle: '',
        dateStart: '',
        dateEnd: '',
        place: '',
        province: '',
        comments: '',
        is_certificado_profesionalidad: false,
    }
    
    const form = ref<Experience>({ ...data })
    
    
    const handleReset = () => {
        form.value = { ...data };
    }   
    </script>
    <template>
        <q-page padding>
            <h1 class="text-h5">Nueva experiencia</h1>
            <q-form autofocus @reset="handleReset" @submit.prevent="addExperience({...experience, ...form})">
                <FormExperience v-model:code="form.code" v-model:title="form.title" v-model:jobTitle="form.jobTitle"
                    v-model:dateStart="form.dateStart" v-model:dateEnd="form.dateEnd" v-model:place="form.place"
                    v-model:province="form.province" v-model:comments="form.comments"
                    v-model:is_certificado_profesionalidad="form.is_certificado_profesionalidad">
                </FormExperience>
                <q-btn-group push class="q-mt-xl">
                    <q-btn icon="add" :loading="loading" :disable="loading" label="Nueva experiencia" type="submit"
                        color="primary" />
                    <q-btn icon="restart_alt" label="Reiniciar" type="reset" color="secondary" />
                </q-btn-group>
            </q-form>
        </q-page>
    </template>