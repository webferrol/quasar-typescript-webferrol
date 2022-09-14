import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Timestamp } from "firebase/firestore";
//Firebase
import { db } from 'src/firebase';
import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

//Errors
import { useNotify } from 'src/composables/notify.hook';
//interfaces y types
import { PropertyMaps, Experience } from './models';



export const useStoreExperiences = defineStore('experiences', () => {
  const experiences = ref<Experience[]>([]);
  const experience = ref<Experience>({});
  const loading = ref<boolean>(false);
  const error = ref<any>(null);


  const errorMessages: PropertyMaps = {
    'permission-denied': 'Permisos insuficientes o colección inexistente',
  }

  /**
   * Tamaño del array de experiences
   */
  const getExperiencesLength = computed<number>(() => experiences.value.length);

  /**
   * Obtener y colocar experiencias laborales obtenidos de Cloud Firestore
   * @param p_collection - Colección de Firebase
   * @param p_field - Campo por el que se ordenará la búsqueda de forma descendiente
   */
  const setExperiences = async (p_collection: string, p_field: string) => {
    loading.value = true;
    const { error: $error } = useNotify();
    try {
      const $q = await getDocs(query(
        collection(db, p_collection),
        orderBy(p_field, "desc")));
      if ($q.docs.length) {
        experiences.value = $q.docs.map(doc => doc.data());
        //console.log(experiences.value)
      } else
        throw new Error(`No se encuentra el campo [${p_field}]`);
    } catch (p_error: any) {
      error.value = errorMessages[p_error.code] || p_error.message;
      $error(error.value);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Eliminación de una experiencia laboral
   * @param p_idDoc - Identificador que elimina una experiencia
   */
  const deleteExperience = async (p_idDoc: string) => {
    await deleteDoc(doc(db, 'workExperience', p_idDoc));
    const index = experiences.value.findIndex(el => el.idDoc === p_idDoc);
    if (index > -1) {
      experiences.value.splice(index, 1);
    }
  }

  /**
   * Recuperación de un objeto del array de experiencias del store Pinia
   * @param p_idDoc - Identificador de la experiencia
   */
  const getExperience = async (p_idDoc: string) => {
    const $experience = experiences.value.find(el => el.idDoc === p_idDoc);
    experience.value = $experience || await getDocumentExperience(p_idDoc);
  }

  /**
   * Recuperación de una expeririencia laboral de la base de datos
   * @param p_idDoc - Identificador de una experiencia laboral
   * @returns Un objeto con los campos de la experiencia laboral
   */
  const getDocumentExperience = async (p_idDoc: string): Promise<Experience> => {
    const docRef = doc(db, 'workExperience', p_idDoc);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists())
      return docSnap.data();
    return {};
  }

  /**
   * Actualización de una experiencia laboral
   * @param p_idDoc - Identificador de la experiencia laboral
   * @param p_data - Datos para actualizar la experiencia laboral en Cloud Firestore
   */
  const updateExperience = async (p_idDoc: string, p_data: Experience) => {
    //Reconstruímos el objeto para almacenar sólo los datos que nos interesan
    let { code, title, jobTitle, province, place, comments, dateStart, dateEnd, is_certificado_profesionalidad } = p_data;
    const $data = { code, title, jobTitle, province, place, comments, dateStart, dateEnd, is_certificado_profesionalidad };
    //Preparamos el formato de fecha para us almacenamiento            
    const $dateStart = new Date($data.dateStart);//Convertimos String (dd-mm-aaaa) a Date
    p_data.dateStart = $data.dateStart = Timestamp.fromDate($dateStart);
    const $dateEnd = new Date(p_data.dateEnd);
    p_data.dateEnd = $data.dateEnd = Timestamp.fromDate($dateEnd);
    //Actualización de los campos
    await updateDoc(doc(db, 'workExperience', p_idDoc), $data);
    //Buscamos la experiencia laboral en el modelo del store de Pinia para su actualización también
    const index = experiences.value.findIndex(el => el.idDoc === p_idDoc);
    if (index > -1)
      experiences.value[index] = p_data;
  }

  /**
   * Comprobamos si existe alguna experiencia en el objeto en caso de que no existan propiedades sería nulo
   * @return booleano
   */
  const isExperience = computed((): boolean => Object.keys(experience.value).length !== 0);

  return {
    experiences,
    experience,
    isExperience,
    loading,
    error,
    getExperiencesLength,
    setExperiences,
    updateExperience,
    getExperience,
    deleteExperience,
  }
});
