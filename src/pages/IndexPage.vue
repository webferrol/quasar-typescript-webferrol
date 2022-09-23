<template>
  <q-page padding>
    <div class="row">
      <q-parallax :height="200">
        <template v-slot:media>
          <img src="~/assets/banner1200x800.jpg" alt="WebFerrol">
        </template>
        <template v-slot:content>
          <h2 class="q-pa-sm text-h6 text-grey-3 text-center text-weight-light bg-blue-8 rounded-borders">
            Tecnologías utilizadas en este Portafolio
          </h2>
        </template>
      </q-parallax>
    </div>
    <div class="q-gutter-sm row justify-center q-pt-md" style="max-width:1440px">
      <card-framework caption="The Progressive JavaScript Framework ">
        <template v-slot:header>
          <h2 class="text-h6">Frontend <strong>framework</strong></h2>
          <h3 class="text-subtitle2">by Evan You</h3>
        </template>
        <template v-slot:content>
          Un ecosistema que se puede adoptar de forma incremental y que se puede escalar entre una librería y un
          <em>framework</em> con todas las funciones.
        </template>
      </card-framework>
      <card-framework src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" title="Quasar"
        caption="Más allá de un framework">
        <template v-slot:header>
          <h2 class="text-h6">El framework todo terreno</h2>
        </template>
        <template v-slot:content>
          <strong>Quasar</strong> es un super framework basado en <strong>VueJS</strong> que permite a los
          desarrolladores web crear de forma rápida <strong>sitios web reponsives</strong> y aplicaciones de diferentes
          sabores: <abbr title="Progresive Web app">PWA</abbr>, <abbr title="Browser Extension">BEX</abbr>.
        </template>
      </card-framework>
      <card-framework :src="firebaseIco" title="Firebase">
        <template v-slot:header>
          <h2 class="text-h6">Make your app the best it can be </h2>
        </template>
        <template v-slot:content>
          Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google and trusted by millions of businesses around the world.
        </template>
      </card-framework>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CardFramework from "../components/CardFramework.vue";
import firebaseIco from "../assets/firebase128x128.ico";
//SEO composable
import { useMetaLabels } from '../composables/meta.hook';
//SEO
useMetaLabels({title: 'Portafolio de WebFerrol',descriptionContent: 'Portafolio personal de Xurxo González Tenreiro realizado con Vue y Firebase',keywordsContent:['Vue','Firebase','Quasar Vue']});

</script>
