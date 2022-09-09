import { useQuasar } from 'quasar';
/**
 * Con este Objeto exportamos funciones de muestra de mensaje en caso error o acierto y así poder reutiliar el código
 * @returns Funciones con mensajes de error/acierto
 */
export const useNotify = () => {

    const $q: any = useQuasar();
    const error = (message: string) => $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: `${message}`
    });
    const ok = (message: string) => $q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'done',
        message: `${message}`
    });

    return {
        error,
        ok
    }
}