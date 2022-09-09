<template>
    <q-page padding>
        <h1 class="text-h6">Acceso</h1>
        <div class="row justify-center items-start">
            <div class="col-xs-12 col-sm-8 col-md-6" style="max-width:600px">
                <h2 class="text-h4 text-center text-primary">Sign In</h2>
                <div class="q-pa-md">

                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                        <q-input filled v-model.trim="email" label="Su email *" hint="Correo electrónico" lazy-rules
                            :rules="[isValidEmail]" />

                        <q-input filled type="password" v-model="password" label="Su contraña *" lazy-rules :rules="[
                            val => val && val.length > 0 || 'Escriba su contraseña'
                        ]" />

                        <q-toggle v-model="accept" label="Acepto la licencia y los términos" />

                        <div>
                            <q-btn :loading="loading" label="Acceder" type="submit" color="primary" />
                            <q-btn label="Borrar" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                    <q-btn class="q-mt-sm" @click="handleSendPasswordResetEmail" :loading="loading" flat
                        style="color: #FF0080" label="¿Olvidaste la contraseña?" />
                    <q-btn class="q-mt-sm" :to="{ name: 'Register' }" flat style="color: #FF0080"
                        label="Regístrate como nuevo usuario" />
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStoreUsers } from 'src/stores/users';
import { useNotify } from 'src/composables/notify.hook';
import { storeToRefs } from 'pinia';
const { error: $error } = useNotify();
const {signIn} = useStoreUsers();
const { loading, error } = storeToRefs(useStoreUsers());
const email = ref<string>('');
const password = ref<string>('');
const accept = ref<boolean>(false);

//Botón de envío
const onSubmit = async () => {
    if (accept.value !== true)
            $error('Primero debe aceptar la licencia y los términos');
    else{
        await signIn({ email: email.value, password: password.value });
        if(error.value)
            $error(error.value);
    }
}
    const onReset = () => {};
    const handleSendPasswordResetEmail = () => {}
    /**
     * Función que valida un correo a través de una expresión regular
     * @param {String} email - Supuestamente un dirección de correo electrónico
     * @returns {Bool|String} - Verdadero si pasa el test o String(Mensaje si no lo pasa)
     */
    const isValidEmail = (email: string) => {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(email) || `La dirección de correo "${email}" no es válida`;
    }
</script>