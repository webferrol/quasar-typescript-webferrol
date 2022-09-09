import { defineStore } from 'pinia';
import { ref,computed } from 'vue';
//Firebase
import { db } from 'src/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

//Errors
import { useNotify } from 'src/composables/notify.hook';


export const useStoreExperiences = defineStore('experiences', () => {
  const experiences = ref<any>([]);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);

  //Mensajes de error con la técnica "Dynamic Property Maps"
  const errorMessages:any = {
      'permission-denied': 'Permisos insuficientes o colección inexistente',
  }

  const getExperiencesLength:any = computed(()=>experiences.value.length);


  const setExperiences = async (p_collection: string, p_field: string) => {
    loading.value = true;
    const {error: $error} = useNotify();
    try {
      const $q = await getDocs(query(
        collection(db, p_collection),
        orderBy(p_field,"desc")));
      if ($q.docs.length) {
        experiences.value = $q.docs.map(doc => doc.data());
      }else
        throw new Error(`No se encuentra el campo [${p_field}]`);
    } catch (p_error:any) {
      error.value = errorMessages[p_error.code] || p_error.message;
      $error(error.value);
    } finally {
      loading.value = false;
    }
  }

  return {
    experiences,
    loading,
    error,
    getExperiencesLength,
    setExperiences,
  }
});
