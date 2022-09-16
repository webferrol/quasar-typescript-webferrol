<template>
    <q-form class="q-gutter-md" @submit="handlePassword" @reset="handleReset">
        <div class="text-h6">Cambio de contraseña</div>
        <q-input v-model.trim="form.password" outlined label="Nueva contraseña*"
            :rules="[value => (value.length < 1 || value.length > 5) || 'La contraseña debe de tener por lo menos 6 caracteres']"
            type="password">
            <template v-slot:prepend>
                <q-icon name="password" color="teal" />
            </template>
        </q-input>

        <q-input v-model.trim="form.passwordRepeat" outlined label="Repita contraseña*" type="password"
            :rules="[passwordValidate]">
            <template v-slot:prepend>
                <q-icon name="password" color="teal" />
            </template>
        </q-input>
        <div>
            <q-btn :loading="btnUpdateDisable" :disable="btnUpdateDisable" label="Cambiar" type="submit" color="primary" />
            <q-btn label="Borrar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNotify } from 'src/composables/notify.hook';
import { useProfile } from 'src/composables/profile.hook';
import { errorMessages } from 'src/stores/models';

const {error,ok}= useNotify();
const { updatePassword } = useProfile();
const btnUpdateDisable = ref<boolean>(false);
const form = ref<any>({
    password: '',
    passwordRepeat: '',
});


/**
 * 
 * @param value Comprobamos que coincidan los caracteres en los controles de formulario de tipo password
 */
 const passwordValidate = (value: string) => {
    return value === form.value.password || 'Las contraseñas no coinciden'
}
/**
 * Función que resetean los controles del formulario de las contraseñas
 */
const handleReset = () => {
    form.value.passwordRepeat = '';
    form.value.password = '';
}

const handlePassword = async () => {
    try {
        btnUpdateDisable.value = true;
        if (!form.value.password.length)
            throw new Error('Debe introducir una contraseña nueva');
        else{
            await updatePassword(form.value.password);
            ok(`Cambio de contraseña realizada`);
        }
    } catch (p_error:any) {
        error(errorMessages[p_error.code]||p_error.message);
    } finally {
        btnUpdateDisable.value = false;
    }
}
</script>