<script setup lang="ts">
import { ref } from 'vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import avatar from '../assets/avatar.jpg';//Imagen del usuario a mostrar en el QR
const show = ref<boolean>(false);//Constante con la que mostramos/ocultamos la ventana modal
</script>

<template>
    <q-btn round @click="show = true">
        <q-avatar size="42px">
            <img alt="Linkedin personal" src="../assets/linkedin-225x225.png">
        </q-avatar>
    </q-btn>
    <!-- Ventana modal a mostrar si pulsamos el botón de arriba -->
    <q-dialog v-model="show">
        <q-card>
            <q-card-section class="text-center">
                <q-btn color="primary" outline rounded no-caps href="https://www.linkedin.com/in/webferrol/"
                    target="_blank">
                    Ir a <img class="linkedin" src="~assets/linkedin-225x225.png" />
                </q-btn>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <!-- Código QR -->
                <vue-qr :size="300" :margin="50" :dotScale="0.6" :logo-src="avatar"
                    text="https://www.linkedin.com/in/webferrol/"></vue-qr>
                <!-- //Código QR -->
            </q-card-section>

            <q-card-actions align="right">
                <q-btn outline label="Cerrar" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <!-- //Ventana modal a mostrar si pulsamos el botón de arriba -->
</template>

<style scoped>
.linkedin {
    width: 2rem;
    margin-left: .5rem;
}
</style>