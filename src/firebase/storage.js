import { storage } from ".";
import { ref, getDownloadURL, listAll, uploadBytes, deleteObject } from "firebase/storage";



/**
 * 
 * @param {Object} file - Fichero de tipo File o Blob que se quiere subir
 * @param {String} url - URL. If empty, returns root reference.
 * @returns {Object} A Promise containing an UploadResult
 */
export const uploadBlobFile = async (file, url = 'proyectos/imagen.jpg') => {
    const storageRef = ref(storage, url);
    // 'file' comes from the Blob or File API
    return await uploadBytes(storageRef, file);
}


/**
 * Con esta función obtenemos una imagen de cloud storage de firebase
 * @link https://firebase.google.com/docs/storage/web/start?hl=es&authuser=0
 * @param {String} bucket - URL del bucket de Cloud Storage 
 * @returns {String} - URL de la imagen por http(s)
 */
export const getURL = async (bucket = 'profile/xurxo.jpg') => {
    const storageRef = ref(storage, bucket);
    return await getDownloadURL(storageRef)
}

/**
 * Con esta función obtenemos las urls de un conjunto de imágenes de cloud storage de firebase
 * @link https://firebase.google.com/docs/storage/web/list-files
 * @link https://firebase.google.com/docs/storage/web/download-files
 * @param {String} url -  URL. If empty, returns root reference. 
 * @returns {Array} - Array de String con la ruta de descarga HTML de cada imagen
 */
export const listAllUrls = async (url = 'gs://curriculum-vitae-xurxo.appspot.com/animales') => {
    // Create a reference under which you want to list
    const listRef = ref(storage, url);
    // Find all the prefixes and items.
    const results = await listAll(listRef);
    const { items } = results;
    return Promise.all(

        items.map(
            async (item, index) => ({
                index,
                ref: item._location.path_,
                url: await getDownloadURL(item),
                //'data-source': 'https://www.google.es',
            })
        )
    );
}

/**
 * Función para eliminar un fichero en firebase
 * @param {String} fileRef reference to the file to delete
 */
export const deleteFile = async (fileRef = 'images/desert.jpg') => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, fileRef);
    // Delete the file
    await deleteObject(desertRef);
}