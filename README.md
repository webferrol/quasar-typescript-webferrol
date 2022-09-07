# WebFerrol App (quasar-webferrol-typescript)

Portafolio de WebFerrol

## Conceptos de Vue para TypeScript

Cuando utilizamos la función *ref()* de **Vue** podemos indicar el tipo de datos de inicialización tal y cómo se indica en la [documentación](https://vuejs.org/guide/typescript/composition-api.html#typing-ref).

1. Opción uno:
```TypeScript
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

2. O esta otra Opción
```TypeScript
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```