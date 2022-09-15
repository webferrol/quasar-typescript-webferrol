<script setup lang="ts">
import { ref } from 'vue';
import { date } from 'quasar';
import { copyToClipboard } from 'quasar'
import { useNotify } from 'src/composables/notify.hook';
import { useStoreExperiences } from 'src/stores/experiences';
import SkeletonTable from '../../components/skeletons/SkeletonTable.vue'
import { Experience } from '../../stores/models';


interface DefineProps {
    experiences: Experience[],
    loading: boolean,
}
defineProps<DefineProps>();


const { deleteExperience } = useStoreExperiences();

const { error, ok } = useNotify();


const selected = ref<[]>([]);//Checkbox de QTable
const filter = ref<string>(''); //Filtrado de la tabla. Ver documentación de QTable


const prompt = ref<boolean>(false); //Para mostrar u ocultar QDialog

const idDocRepeat = ref<string>('');//Variable para confirmar experiencia a eliminar
const experience = ref<Experience>({});//Datos de una experiencia para eliminar



const columns: any = [
    { name: 'options', align: 'center', label: 'Opciones', field: 'option', sortable: false },
    { name: 'code', align: 'left', label: 'Código', field: 'code', sortable: true },
    { name: 'title', required: true, label: 'Título', align: 'left', field: 'title', sortable: true },
    { name: 'jobTitle', align: 'center', label: 'Cargo', field: 'jobTitle', sortable: true },
    { name: 'dateStart', label: 'Comienzo', field: (row: Experience) => row.dateStart.seconds, sortable: true },
    { name: 'dateEnd', label: 'Finalización', field: (row: Experience) => row.dateEnd.seconds, sortable: true },
    { name: 'place', label: 'Lugar', field: 'place' },
    { name: 'province', label: 'Provincia', field: 'province', sortable: true },
]

/**
 * Para renderizar en pantalla el número de página
 * @param firstRowIndex 
 * @param endRowIndex 
 * @param totalRowsNumber - Número total de págins
 */
const getPaginationLabel = (firstRowIndex: Number, endRowIndex: Number, totalRowsNumber: Number): string => `${totalRowsNumber} registros`;


/**
 * Captura del botón que abre el modal para eliminar una experiencia
 * @param p_item - Una experiencia con todas sus propiedades
 */
const handleDelete = async (p_item: Experience) => {
    experience.value = p_item;
    prompt.value = true;


}

/**
 * Función que elimina una experiencia
 */
const onDelete = async () => {
    try {
        if (experience.value.idDoc !== idDocRepeat.value)
            throw new Error(`Claves no coincidendes. (${experience.value.idDoc}!=${idDocRepeat.value})`);
        await deleteExperience(experience.value.idDoc);
        prompt.value = false;
        ok("Experiencia eliminada de forma correcta");
    } catch (err: any) {
        error(err.message);
    } finally {
        idDocRepeat.value = '';
    }
    //console.log(p_item)
}


/**
 * Función que copia en el portapapeles un identificador que el usario utilizará para borrar una experiencia
 */
const onCopyToClipboard = async () => {
    try {
        if (experience.value.idDoc !== undefined)
            await copyToClipboard(experience.value.idDoc);
        else
            throw new Error('idDoc es undefined');
    } catch (err: any) {
        error(err.message)
    }
}
</script>
<template>
    <div class="q-pa-md">
        <skeleton-table v-if="loading"></skeleton-table>
        <q-table v-else title="Experiencia laboral" :rows="experiences" :rows-per-page-options="[0]"
            :pagination-label="getPaginationLabel" :columns="columns" row-key="title" selection="multiple"
            v-model:selected="selected" :filter="filter">
            <!-- Options -->
            <template v-slot:top>
                <q-btn color="primary" label="Nueva Experiencia" :to="{ name: 'NewExperience' }" />
                <q-space />
                <q-input borderless dense debounce="300" outlined color="primary" v-model="filter">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <!-- End Options -->
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        <q-checkbox v-model="selected" :val="props.row" />
                    </q-td>
                    <q-td>
                        <q-btn :to="{
                            name: 'EditExperience', params: {
                                idDoc: props.row.idDoc
                            }
                        }" class="q-mr-xs" color="primary" size="sm" label="Modificar" />
                        <q-btn @click="handleDelete(props.row)" color="negative" size="sm" label="Eliminar" />
                    </q-td>
                    <q-td key="code" :props="props">
                        <span v-if="props.row?.is_certificado_profesionalidad"> &reg; </span>{{ props.row.code }}
                    </q-td>
                    <q-td key="title" :props="props">
                        {{ props.row.title }}
                    </q-td>
                    <q-td key="jobTitle" :props="props">
                        {{ props.row.jobTitle }}
                    </q-td>
                    <q-td key="dateStart" :props="props">
                        {{ date.formatDate(props.row.dateStart.toDate(), 'DD-MM-YYYY') }}
                    </q-td>
                    <q-td key="dateEnd" :props="props">
                        {{ date.formatDate(props.row.dateEnd.toDate(), 'DD-MM-YYYY') }}
                    </q-td>
                    <q-td key="place" :props="props">
                        {{ props.row.place }}
                    </q-td>
                    <q-td key="province" :props="props">
                        {{ props.row.province }}
                    </q-td>
                </q-tr>
            </template>
        </q-table>

        <!-- Dialog  -->
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-subtitle1">
                        {{ experience.code }}
                    </div>
                    <div class="text-subtitle2">
                        {{ experience.title }}
                    </div>
                    <div>
                        <q-list bordered class="rounded-borders" style="max-width: 600px">
                            <q-item-label header>Para eliminar repita el código que viene a continuación</q-item-label>

                            <q-item>

                                <q-item-section top>
                                    <q-item-label lines="1">

                                        <span class="text-weight-medium">{{ experience?.idDoc }}</span>
                                    </q-item-label>
                                </q-item-section>

                                <q-item-section top side>
                                    <div class="text-grey-8 q-gutter-xs">
                                        <q-btn @click="onCopyToClipboard" title="Copiar al portapapeles" class="gt-xs"
                                            size="12px" flat dense round icon="content_copy" />
                                    </div>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- End Copy to Clipboard -->
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense v-model="idDocRepeat" autofocus @keyup.enter="prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Aceptar" @click="onDelete" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- End dialog -->
    </div>
</template>