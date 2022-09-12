<template>
    <q-item v-ripple>
        <q-item-section side>
            <q-avatar rounded size="48px">
                <img :src="info.photoURL" />
                <q-badge floating :color="info.badgeColor">{{info.badgeText}}</q-badge>
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label>{{info.displayName}}</q-item-label>
            <q-item-label caption>{{info.email}}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-subtitle2">
            {{ getLastLoginAt }}
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useStoreUsers } from 'src/stores/users';

const { user,getLastLoginAt } = storeToRefs(useStoreUsers());

const info = computed(()=>{
    if(user.value){
        return {
            badgeColor: 'teal',
            badgeText: 'online',
            displayName: user.value.displayName??'Admin',
            email: user.value.email,
            photoURL: user.value.photoURL??'https://cdn.quasar.dev/img/avatar.png',
        }
    }else{
        return {
            badgeColor: 'red',
            badgeText: 'offline',
            displayName: '',
            email: '',
            photoURL: 'https://cdn.quasar.dev/img/avatar.png',
        }
    }
});
</script>