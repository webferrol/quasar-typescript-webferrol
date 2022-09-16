<template>
    <q-uploader :label="`Foto de perfil (max: ${maxFileSize} bytes)`" @failed="handleFailed" @rejected="handleRejected"
        :factory="onUpload" accept="image/jpeg" :max-file-size="maxFileSize" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotify } from 'src/composables/notify.hook';
import { useProfile } from 'src/composables/profile.hook';
import { errorMessages } from 'src/stores/models';

const {uploadPhoto} = useProfile();
const {error,ok} = useNotify();
const maxFileSize = ref<number>(150000);
/**
 * @description Emitted after files are picked and some do not pass the validation props (accept, max-file-size, max-total-size, filter, etc)
 * @param rejectedEntries 
 */
 const handleRejected = (rejectedEntries: any) => {
    error(`${rejectedEntries.length} imagen(es) no pasa(n) las restricciones: 1. Tamaño máximo (${maxFileSize.value} bytes)`);
}

// Subida de la foto de de usuario al Storage de firestore y guardando la ruta en Authentication
const onUpload = (files:any):any => {
    if (files && files.length) {
        try {
            files.forEach(async (file:any) => {
                await uploadPhoto(file);
            });
            ok(`Foto de imagen subida`);
        }
        catch (p_error: any) {
            error(errorMessages[p_error.code]||p_error.message);
            //console.log(err)
        }
    }
}


//Notificación de error en caso de algún tipo de fallo de subida de imagen
const handleFailed = (err: any) => {
    error(err.message);
}
</script>