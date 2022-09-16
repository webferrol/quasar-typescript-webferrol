import { date } from 'quasar';
import { defineStore } from "pinia";
import { auth } from "src/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, sendPasswordResetEmail, updatePassword, signOut } from "firebase/auth";
import { uploadBlobFile, getURL } from 'src/firebase/storage';
import { User, errorMessages } from './models';


interface StoreUsers {
    user: null | User,
    loading: boolean[],
    error: any,
    ok: any,
}
interface Profile {
    displayName?: string;
    photoURL?: string;
}

export const useStoreUsers = defineStore('users', {
    state: () => {

        return <StoreUsers>{
            user: null,
            loading: [false, false],
            error: null,
            ok: null
        }
    },
    actions: {
        setUser(p_user: any) {
            this.user = p_user
        },
        /**
         * Formulario de acceso al backend
         * @param { Object } signin - Autentificación
         * @param { string } signin.email - Correo electrónico
         * @param { string } signin.password - Contraseña
         * @param { boolean } signin.accept - Casilla de verificación que hay que marcar
         */
        async signIn({ email, password, accept }: { email: string, password: string, accept: boolean }) {
            this.loading[0] = true;
            try {
                if (accept !== true)
                    throw new Error('Debes marcar la casilla de verificación');
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                this.setUser(userCredential.user);
            } catch (p_error: any) {
                this.error = errorMessages[p_error.code] || p_error.message;
                //console.log('Código',typeof p_error,p_error.code)
            } finally {
                this.loading[0] = false;
            }
        },
        /**
         * 
         * @returns void
         */
        async onAuthState() {
            if (this.user !== null)
                return;
            return new Promise(
                (resolve, reject) => {
                    const subscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            // User is signed in, see docs for a list of available properties
                            // https://firebase.google.com/docs/reference/js/firebase.User
                            //console.log(user)
                            // ...
                            //console.log(user)
                            this.setUser(user);
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
        },
        /**
         * 
         * @param {string } email - Correo electrónico
         */
        async onSendPasswordResetEmail(email: string) {

            try {
                this.loading[1] = true;
                await sendPasswordResetEmail(auth, email);
                this.ok = `Se ha enviado a su cuenta de correo ${email} las instrucciones para crear una nueva contraseña. Si no lo encuentra compruebe su bandeja de SPAN`;
            } catch (p_error: any) {
                this.error = errorMessages[p_error.code] || p_error.message;
                //console.log('Código', p_error.code)
            } finally {
                this.loading[1] = false;
            }
        },
        /**
         * Cerrar sesión
         */
        async handleSignOut() {
            try {
                await signOut(auth);
                this.user = null;
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Este método nos permite actualizar la contraseña del usuario registrado
         * @param password - Nueva contraseña
         */
        async onUpdatePassword(password: string) {
            if (auth.currentUser !== null)
                await updatePassword(auth.currentUser, password);
        },
        /**
         * Función que permite cambiar el correo electrónico del usuario logueado
         * @param email - Correo electrónico
         */
        async onUpdateEmail(email: string) {
            if (auth.currentUser !== null)
                await updateEmail(auth.currentUser, email);
        },
        /**
         * 
         * @param p_profile - Perfil de usuario
         * @param p_profile.displayName - Nombre de usuario
         * @param p_profile.email - Correo electrónico
         */
        async onUpdateProfile(p_profile: Profile) {
            if (auth.currentUser !== null) {
                await updateProfile(auth.currentUser, p_profile);
                this.user = { ...this.user, ...p_profile };
            }
        },
        async onUploadProfile(file: any) {
            if(this.user){
                const response = await uploadBlobFile(file, `profiles/${this.user.uid}`);
                const url = await getURL(`profiles/${this.user.uid}`);
                const profile = { photoURL: url };
                await this.onUpdateProfile(profile);
                this.user = { ...this.user, ...profile };
            }
        },
    },
    getters: {
        getLastLoginAt: state => {
            if (state.user?.metadata?.lastLoginAt !== undefined) {
                const timeStamp = Number(state.user.metadata.lastLoginAt)
                return date.formatDate(timeStamp, 'DD-MM-YYYY HH:mm:ss');
            }
            return "";
        },
        getLastSignInTime: state => {
            if (state.user?.metadata?.lastSignInTime !== undefined) {
                return state.user.metadata.lastSignInTime;
            }
            return "";
        }
    }
});