<template>
    <q-form class="q-gutter-md" @submit="handleProfile">
        <!-- Email -->
        <div>
            <div class="text-h6">Correo electrónico</div>
            <div>
                <q-toggle @change="emailDisable = !emailDisable" v-model="emailDisable" checked-icon="check" color="red"
                    label="Editar Correo" unchecked-icon="clear" />
            </div>
            <div>

                <q-input v-model="form.email" label="Email de Usuario*" :disable="!emailDisable" lazy-rules
                    :rules="[isValidEmail]" />
            </div>
        </div>
        <!-- End Email -->
        <!-- Perfil de usuario -->
        <div>
            <div class="text-h6">Nombre de perfil</div>
            <q-input v-model.trim="form.displayName" filled label="Nombre" hint="Nombre y apellidos del usuario"
                :disable="emailDisable" lazy-rules :rules="[
                value => value.length > 3 || 'Introduzca por lo menos 4 caracteres']" />
        </div>
        <!-- End perfil de usuario -->
        <q-btn :loading="btnUpdateDisable" :disable="btnUpdateDisable" label="Actualizar" type="submit" color="primary" />
    </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotify } from 'src/composables/notify.hook';
import { useProfile } from 'src/composables/profile.hook';
import { errorMessages } from 'src/stores/models';

const { isValidEmail, updateDisplayName, updateEmail } = useProfile();
const { error, ok } = useNotify();

const emailDisable = ref<boolean>(false);
const btnUpdateDisable = ref<boolean>(false);

const props = defineProps(['displayName', 'email']);

const form = ref({
    displayName: props.displayName,
    email: props.email,
});

const updateTheEmail = async () => {
    try {
        btnUpdateDisable.value = true;
        if (form.value.email === props.email)
            throw new Error('El "Correo electrónico" no ha sido modificado');
        else{
            await updateEmail(form.value.email);
            ok(`El correo de ${form.value.email} ha sido actualizado.`)
        }
    }catch(p_error:any){
        error(errorMessages[p_error.code]||p_error.message);
    } finally{
        btnUpdateDisable.value = false;
    }
}

/**
 * Actualización del nombre de usuario
 */
const updateTheDisplayName = async () => {
    try {
        btnUpdateDisable.value = true;
        if (form.value.displayName === props.displayName)
            throw new Error('El "Nombre de perfil" no ha sido modificado');
        else {
            await updateDisplayName(form.value.displayName);
            ok('Nombre del perfil de usuario actualizado.');
        }
    } catch (p_error:any) {
        error(errorMessages[p_error.code]||p_error.message);
    } finally{
        btnUpdateDisable.value = false;
    }
}

/**
 * Donde empiezan las acciones
 * Si el control de formulario checkbox es seleccionado actualizaremos el Correo electrónico en caso contrario actualizamos el nombre de usuario
 */
const handleProfile = () => {
    if (emailDisable.value)
        updateTheEmail();
    else
        updateTheDisplayName();
}
</script>