import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "src/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, sendPasswordResetEmail, updatePassword, signOut } from "firebase/auth";

import { useNotify } from "src/composables/notify.hook";

interface User {
    displayName?: string,
    email?: string,
}

export const useStoreUsers = defineStore('users', () => {
    const user = ref<User|null>(null);
    const loading = ref<boolean[]>([false, false]);//Almacenamos estos valores en un Array por si el componente tiene varias acciones/handles de carga
    const { error, ok } = useNotify();
    const router = useRouter();

    //Mensajes de error con la técnica "Dynamic Property Maps"
    const errorMessages: Record<string, string> = {
        'auth/too-many-requests': 'Demasiados intentos vuelva a intentarlo más tarde',
        'auth/user-not-found': 'Usuario NO registrado o contraseña no válida',
        'auth/invalid-password': 'Usuario NO registrado o contraseña no válida',
    }

    /**
     * Setter para cargar información de usuario
     * @param {Object|null} p_user Objeto con datos el usuario
     */
    const setUser = (p_user: object | null) => {
        user.value = p_user
    }

    /**
     * Método que nos permite autentificar un usuario en la api 
    Autenticación de Firebase
    * @param { object }  - Se trata de un objeto desestructurado donde se nos pasa el usuario y la contraseña
    * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
    */
    const signIn = async ({ email, password, accept }: { email: string, password: string, accept: boolean }) => {
        loading.value[0] = true;
        try {
            if (accept !== true)
                throw new Error('Debes marcar la casilla de verificación');
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            //router.push({ name: 'HomeAdmin' });
            router.push({ name: 'Home' });
        } catch (p_error: any) {
            error(errorMessages[p_error.code] || p_error.message);
            console.log('Código', p_error.code)
        } finally {
            loading.value[0] = false;
        }
    }

    /**
    * Método que nos permite recargar la propiedad "user" del state en caso de refrescar la página.
    */
    const onAuthState = async () => {
        if (user.value !== null)
            return;
        return new Promise(
            (resolve, reject) => {
                const subscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        //console.log(user)
                        // ...
                        setUser(user);
                        resolve(user)
                    } else {
                        // User is signed out
                        resolve(null);
                    }
                },
                    error => reject(error));
                subscribe();
            }
        );
    }


    /**
     * Función para enviar un correo electrónico de restablecimiento de contraseña a un usuario
     * @param { string } email 
     */
    const onSendPasswordResetEmail = async (email: string) => {

        try {
            loading.value[1] = true;
            await sendPasswordResetEmail(auth, email);
            ok(`Se ha enviado a su cuenta de correo ${email} las instrucciones para crear una nueva contraseña. Si no lo encuentra compruebe su bandeja de SPAN`);
        } catch (p_error: any) {
            error(errorMessages[p_error.code] || p_error.message);
            console.log('Código', p_error.code)
        } finally {
            loading.value[1] = false;
        }
    }

    return {
        user,
        loading,
        signIn,
        onAuthState,
        onSendPasswordResetEmail,
    }
});