<template>
    <div class="dark">
        <q-input label="Código *" :model-value="code" @update:model-value="newValue => $emit('update:code', newValue)"
            name="code" :rules="[val => val && val.length > 2 || 'Por lo un mínimo de tres caracteres']">
        </q-input>

        <q-input label="Título *" :model-value="title" @update:model-value="newValue => $emit('update:title', newValue)"
            name="title" :rules="[val => val && val.length > 2 || 'Por lo un mínimo de tres caracteres']">
        </q-input>

        <q-checkbox label="Certificado de profesionalidad" :model-value="is_certificado_profesionalidad"
            name="is_certificado_profesionalidad"
            @update:model-value="newValue => $emit('update:is_certificado_profesionalidad', newValue)"></q-checkbox>

        <q-input label="Cargo *" :model-value="jobTitle"
            @update:model-value="newValue => $emit('update:jobTitle', newValue)" name="title"
            :rules="[val => val && val.length > 2 || 'Por lo un mínimo de tres caracteres']">
        </q-input>

        <q-input type="date" :model-value="dateStart"
            @update:model-value="newValue => $emit('update:dateStart', newValue)" stack-label label="Fecha de inicio *"
            :rules="[val => !!val || 'Campo requerido']" />

        <q-input type="date" :model-value="dateEnd" @update:model-value="newValue => $emit('update:dateEnd', newValue)"
            stack-label label="Fecha de finalización *" :rules="[val => !!val || 'Campo requerido']" />

        <q-input label="Lugar" :model-value="place" @update:model-value="newValue => $emit('update:place', newValue)"
            name="place">
        </q-input>

        <q-input list="provinces" :model-value="province"
            @update:model-value="newValue => $emit('update:province', newValue)" label="Provincia" name="province">
        </q-input>
        <datalist id="provinces">
            <option value="Coruña" />
            <option value="Lugo" />
            <option value="Orense" />
            <option value="Pontevedra" />
        </datalist>

        <div class="q-mt-xl">
            <q-editor :toolbar="toolbar" placeholder="Unos breves comentarios" :model-value="comments"
                @update:model-value="newValue => $emit('update:comments', newValue)" min-height="5rem" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['code', 'title', 'jobTitle', 'dateStart', 'dateEnd', 'place', 'province', 'comments', 'is_certificado_profesionalidad']);
const toolbar = [
    ['left', 'center', 'right', 'justify'],
    ['bold', 'italic', 'underline'],
    ['token', 'hr', 'link', 'custom_btn'],
]


</script>