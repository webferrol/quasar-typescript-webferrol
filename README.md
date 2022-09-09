# WebFerrol App (quasar-webferrol-typescript)

Portafolio de WebFerrol

## Conceptos de Vue para TypeScript

Cuando utilizamos la función *ref()* de **Vue** podemos indicar el tipo de datos de inicialización tal y cómo se indica en la [documentación](https://vuejs.org/guide/typescript/composition-api.html#typing-ref).

### Estableciendo tipos en __TypeScript__ con variables reactivas _ref()_

1. Opción uno:
```TypeScript
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

2. Opción dos:
```TypeScript
// resulting type: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

## Conceptos de pinia

### [storeToRefs](https://pinia.vuejs.org/api/modules/pinia.html#storetorefs)

Creates an object of references with all the state, getters, and plugin-added state properties of the store. Similar to toRefs() but specifically designed for Pinia stores so methods and non reactive properties are completely ignored.