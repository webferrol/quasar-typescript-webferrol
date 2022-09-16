/**
 * Usuario que se loguea en la app
 */

interface MetaData {
    lastLoginAt?:number;
    lastSignInTime?:number;
}

export interface User {
    /**
     * Nombre para motrar del usuario autentificado
     */
    displayName?: string;
    /**
     * Correo electrónico del usuario
     */
    email?: string;
    /**
     * Foto del usuario
     */
    photoURL?: string;
    /**
     * Un objeto de Authentication de Firebase que almacena varias propiedades. 
     * metadata = {lastLoginAt, lastSignInTime, ...}
     */
    metadata?: MetaData
    /**
     * Identificador del usuario
     */
    uid?:string;
}

export interface Experience{
    code?: string;
    title?: string;
    jobTitle?: string;
    idDoc?: string;
    comments?: string;
    createAt?: number;
    dateEnd?:any;
    dateStart?: any;
    is_certificado_profesionalidad?: boolean;
    place?: string;
    province?: string;
  }

//Mensajes de error con la técnica "Dynamic Property Maps"
export type PropertyMaps = {
    [key: string]: string;
}
export const errorMessages: PropertyMaps = {
    'auth/too-many-requests': 'Demasiados intentos vuelva a intentarlo más tarde',
    'auth/user-not-found': 'Usuario NO registrado o contraseña no válida',
    'auth/invalid-password': 'Usuario NO registrado o contraseña no válida',
    'auth/wrong-password': 'Usuario NO registrado o contraseña no válida',
    'auth/missing-email': 'La dirección de correo electrónico no es válida',
    'auth/invalid-email': 'La dirección de correo electrónico no es válida',
    'permission-denied': 'Permisos insuficientes o colección inexistente',
    'auth/requires-recent-login': 'Para actualizar el correo electrónico o contraseña debes loguearte de nuevo',
}