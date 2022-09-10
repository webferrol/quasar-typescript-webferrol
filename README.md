# WebFerrol App (quasar-webferrol-typescript)

Portafolio de WebFerrol en **TypeScript**

## Vanilla❓ TypeScript

1. Declarando objetos literales
[How to Declare Object Literals in TypeScript the Right Way](https://www.realpythonproject.com/how-to-declare-object-literals-in-typescript-the-right-way/)

Aplicando algún ejemplo de la lectura anterios:
```TypeScript
//Mensajes de error con la técnica "Dynamic Property Maps"
const errorMessages: Record<string, string> = {
    'auth/too-many-requests': 'Demasiados intentos vuelva a intentarlo más tarde',
    'auth/user-not-found': 'Usuario NO registrado o contraseña no válida',
    'auth/invalid-password': 'Usuario NO registrado o contraseña no válida',
}
//Luego los podemos mostrar de la siguiente manera
if(error) //📌error📌 en este caso será un objeto cuya propiedad "code" tendrá alguna "key" de 📌errorMessage📌
    const msg = errorMessages[error.code] || error.message
```

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

## Tablas de [Quasar](https://quasar.dev/vue-components/table#qtable-api)

Para mostrar los datos de la tabla en formato _grid_ utilizando _QCard_ ver la documentación de las tablas en la _pestaña Slots_. Consulta el enlace de encabezado para obtener otras configuraciones.
