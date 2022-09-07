import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';


export const useStoreExperiences = defineStore('experiences', (): object => {
  const experiences: Ref<object> = ref([1, 2]);

  return {
    experiences,
  }
});
