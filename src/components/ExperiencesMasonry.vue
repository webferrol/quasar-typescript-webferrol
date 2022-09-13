<template>
  <div class="q-pa-md">
    <q-table :loading="loading" loading-label="Esperando la carga de datos..." grid card-class="bg-primary text-white"
      title="Experiencia laboral" :rows="rows" :columns="columns" :filter="filter" row-key="idDoc"
      :rows-per-page-options="[0]" :pagination-label="getPaginationLabel">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card bordered>
            <q-card-section class="bg-primary text-white">
              <q-list>
                <q-item>
                  <q-item-section>
                    <h2 class="text-subtitle1">{{ props.row.title }}</h2>
                    <span>
                      <q-badge style="display: inline-block" color="orange"
                        :label="getDayMonthFullYear(props.row.dateStart)"></q-badge>
                    </span>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label><span class="text-subtitle2">{{ props.row.code }}</span>
                      <q-chip v-if="props.row?.is_certificado_profesionalidad" size="xs" dense class="glossy"
                        color="white" text-color="red" icon="star">
                        Certificado de profesionalidad
                      </q-chip>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>Lugar</q-item-label>
                    <q-item-label caption>{{ props.row.place }}</q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-badge color="teal" :label="props.row.province">
                      <q-icon name="location_on" size="14px" class="q-ml-xs" />
                    </q-badge>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset></q-separator>
                <q-item>
                  <q-item-section>
                    <q-item-label>Puesto</q-item-label>
                    <q-item-label caption>{{ props.row.jobTitle }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset></q-separator>
                <q-item>
                  <q-item-section>
                    <div class="experience text-body1" v-html="props.row.comments"></div>
                  </q-item-section>
                </q-item>
              </q-list>
              <!-- <pre>{{ datos.data }}</pre> -->
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Timestamp } from '@firebase/firestore';

const props = defineProps({
  rows: {
    type: Array,
    default: [],
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});


const filter = ref<string>('')



const columns: any = [
  {
    name: 'title',
    required: true,
    label: 'Título',
    align: 'left',
    field: (row: any) => row.title,
    format: (val: any) => `${val}`,
    sortable: true
  },
  { name: 'code', label: 'Código', field: 'code', sortable: true },
  { name: 'jobTitle', label: 'Cargo', field: 'jobTitle' },
  { name: 'place', label: 'Lugar', field: 'place' },
  { name: 'comments', label: 'Comentarios', field: 'comments' },
  { name: 'province', label: 'Provincia', field: 'province' },
  { name: 'dateStart', label: 'Fecha de inicio', field: 'dateStart' },
  { name: 'dateEnd', label: 'Fecha de finalización', field: 'dateEnd' },
  { name: 'idDoc', required: false, label: 'Identificador', field: 'idDoc' },
]


/**
 * Conversión de Timestamp a un formato string de fecha
 * @param date Fecha en formato Timestamp de Firebase. Ejemplo: Timestamp(seconds=1535760000, nanoseconds=0)
 */
const getDayMonthFullYear = (date: Timestamp): string => date.toDate().toLocaleDateString();

/**
 * Para renderizar en pantalla el número de página
 * @param firstRowIndex 
 * @param endRowIndex 
 * @param totalRowsNumber - Número total de págins
 */
const getPaginationLabel = (firstRowIndex: Number, endRowIndex: Number, totalRowsNumber: Number): string => `${totalRowsNumber} registros`;
</script>



  
<style lang="scss">
.grid-masonry {
  flex-direction: column;
  height: 700px;

  &--2>div {
    &:nth-child(2n + 1) {
      order: 1;
    }

    &:nth-child(2n) {
      order: 2;
    }

    &:before {
      content: '';
      flex: 1 0 100% !important;
      width: 0 !important;
      order: 1;
    }
  }

  &--3>div {
    &:nth-child(3n + 1) {
      order: 1;
    }

    &:nth-child(3n + 2) {
      order: 2;
    }

    &:nth-child(3n) {
      order: 3;
    }

    &:before,
    &:after {
      content: '';
      flex: 1 0 100% !important;
      width: 0 !important;
      order: 2;
    }
  }
}
</style>  