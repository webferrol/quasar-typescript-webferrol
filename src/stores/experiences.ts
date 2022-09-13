import { defineStore } from 'pinia';
import { ref,computed } from 'vue';
//Firebase
import { db } from 'src/firebase';
import { collection, doc, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";

//Errors
import { useNotify } from 'src/composables/notify.hook';
//interfaces y types
import {PropertyMaps,Experience} from './models';



export const useStoreExperiences = defineStore('experiences', () => {
  const experiences = ref<Experience[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);

  
  const errorMessages:PropertyMaps = {
      'permission-denied': 'Permisos insuficientes o colección inexistente',
  }

  /**
   * Tamaño del array de experiences
   */
  const getExperiencesLength = computed<number>(()=>experiences.value.length);

  /**
   * Obtener y colocar experiencias laborales obtenidos de Cloud Firestore
   * @param p_collection - Colección de Firebase
   * @param p_field - Campo por el que se ordenará la búsqueda de forma descendiente
   */
  const setExperiences = async (p_collection: string, p_field: string) => {
    loading.value = true;
    const {error: $error} = useNotify();
    try {
      const $q = await getDocs(query(
        collection(db, p_collection),
        orderBy(p_field,"desc")));
      if ($q.docs.length) {
        experiences.value = $q.docs.map(doc => doc.data());
        //console.log(experiences.value)
      }else
        throw new Error(`No se encuentra el campo [${p_field}]`);
    } catch (p_error:any) {
      error.value = errorMessages[p_error.code] || p_error.message;
      $error(error.value);
    } finally {
      loading.value = false;
    }
  }

  /**
   * 
   * @param p_idDoc - Identificador que elimina una experiencia
   */
  const deleteExperience = async(p_idDoc:string) => {
    await deleteDoc(doc(db, 'workExperience', p_idDoc));
    const index = experiences.value.findIndex(el => el.idDoc === p_idDoc);
    if (index > -1) {
        experiences.value.splice(index, 1);
    }
}

  return {
    experiences,
    loading,
    error,
    getExperiencesLength,
    setExperiences,
    deleteExperience,
  }
});
