<template>
   <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar square>
            <img :src="src" :alt="title">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{title}}</q-item-label>
          <q-item-label caption v-if="caption">{{caption}}</q-item-label>
        </q-item-section>
      </q-item>

      <q-card-section>        
        <slot name="header">
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </slot>       
      </q-card-section>
      <q-card-section class="q-pt-none">
        <slot name="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui voluptates sint ducimus doloremque impedit, molestias, quisquam ratione accusamus est perferendis ad quo deleniti a, facilis earum natus dolore. Expedita, aspernatur.</slot>
      </q-card-section>
    </q-card>

</template>

<script setup lang="ts">
interface CardFrameworkProps{
  src?: string;
  title?: string;
  caption?:string|boolean;
}
withDefaults(defineProps<CardFrameworkProps>(),{
  src: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
  title: 'Vue',
});
</script>

<style scoped>
    .my-card{
        width: 30vw;
        min-width: 375px;
        display: inline-block;
    }
</style>