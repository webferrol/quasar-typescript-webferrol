import { useStoreUsers } from '../stores/users';

export const useProfile = () => {
    const {onUpdateProfile,onUpdateEmail, onUpdatePassword, onUploadProfile} = useStoreUsers();
    /**
    * Función que valida un correo electrónico mediante expresión regular
    * @param email Correo electrónico para evaluar
    * @returns Verdadero si es un correo válido o mensaje de error
    */
    const isValidEmail = (email: string): boolean | string => {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(email) || `La dirección de correo "${email}" no es válida`;
    }

    // Actualización del campo displayName del usuario Authentication de Firebase
    const updateDisplayName = async (p_displayName:string) => {
        await onUpdateProfile({'displayName': p_displayName })
    }

    const updateEmail =async (p_email:string) => {
        await onUpdateEmail(p_email);
    }

    const updatePassword = async (p_password:string) => {
        await onUpdatePassword(p_password);
    }

    const uploadPhoto = async (file:object) => {
        await onUploadProfile(file);
    }

    return {
        isValidEmail,
        updateDisplayName,
        updateEmail,
        updatePassword,
        uploadPhoto,
    }
}