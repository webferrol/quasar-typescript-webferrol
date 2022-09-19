<template>
    <q-btn round @click="alert = true">
        <q-avatar size="42px">
            <img alt="Linkedin personal" src="../assets/linkedin-225x225.png">
        </q-avatar>
    </q-btn>
    <q-dialog v-model="alert">
        <q-card>
            <q-card-section>
                <q-btn flat no-caps href="https://www.linkedin.com/in/webferrol/" target="_blank">
                    <q-avatar size="42px">
                        <img alt="Linkedin personal" src="../assets/linkedin-225x225.png">
                    </q-avatar>
                    <span class="q-pl-sm">Página personal</span>
                </q-btn>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <vue-qr :size="300" :margin="50" :dotScale="0.6" :logo-src="avatar"
                    text="https://www.linkedin.com/in/webferrol/"></vue-qr>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn outline label="Cerrar" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import vueQr from 'vue-qr/src/packages/vue-qr.vue';
import avatar from '../assets/avatar.jpg';
const alert = ref<boolean>(false);
</script>