<template>
    <q-page padding>
        <h1 class="text-h5">Perfil de usuario</h1>
        <div class="q-pa-md row">
            <div class="col-12 col-sm-6">
                <div class="q-pa-md">
                    <!-- Formulario de edición del "display name" y del "email" -->
                    <email-display-name 
                    :displayName="user?.displayName" 
                    :email="user?.email"></email-display-name>
                    <!-- //Formulario de edición del "display name" y del "email" -->
                </div>
            </div>
            <div class="col-12 col-sm-6 q-pa-md">               
                <div class="q-mb-sm">
                    <!-- password -->
                    <password-change></password-change>
                    <!-- End password -->  
                </div>
                
                <!-- Foto perfil de usuario -->
                <div class="q-mt-xl">
                    <div class="text-h6">Foto de perfil del usuario</div>
                    <q-list>
                        <q-item>
                           <!--Uploader-->
                           <photo-user></photo-user>
                           <!-- //Uploader -->
                        </q-item>
                        <q-item>
                            <q-item-section avatar>
                                <q-avatar>
                                    <img :src="user?.photoURL ?? 'https://cdn.quasar.dev/img/boy-avatar.png'">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>Imagen del perfil</q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <!-- End Foto perfil de usuario -->
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
//User de Pinia
import { useStoreUsers } from 'src/stores/users';
import { storeToRefs } from 'pinia';
//Componentes
import EmailDisplayName from 'src/components/profile/EmailDisplayName.vue';
import PasswordChange from 'src/components/profile/PasswordChange.vue';
import PhotoUser from 'src/components/profile/PhotoUser.vue';

const { user } = storeToRefs(useStoreUsers());
</script>