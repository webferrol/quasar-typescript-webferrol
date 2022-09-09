import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "src/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, sendPasswordResetEmail, updatePassword, signOut } from "firebase/auth";


export const useStoreUsers = defineStore('users', () => {
    const user = ref<object | null>(null);
    const error = ref<any>(false);
    const loading = ref<boolean>(false);

     //Mensajes de error con la técnica "Dynamic Property Maps"
  const errorMessages:any = {
    'auth/too-many-requests': 'Demasiados intentos vuelva a intentarlo más tarde',
    'auth/user-not-found':'Usuario o contraseña no válida',
    'auth/invalid-password':'Usuario o contraseña no válida',
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
    * @param {Object}  - Se trata de un objeto desestructurado donde se nos pasa el usuario y la contraseña
    * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
    */
    const signIn = async ({ email, password }:Record<string,string>) => {
        loading.value = true;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (p_error:any) {
           error.value = errorMessages[p_error.code] || p_error.message;
           console.log('Código',p_error.code)
        }  finally{
           loading.value = false;
        }      
    }

    return {
        user,
        error,
        loading,
        signIn,
    }
});