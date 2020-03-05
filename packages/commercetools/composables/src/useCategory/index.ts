import { UseCategory } from '@vue-storefront/interfaces';
import { getCategory } from '@vue-storefront/commercetools-api';
import { Category } from './../types/GraphQL';
import { useCategoryFactory } from '@vue-storefront/factories';

const loadCategories = async (params) => {
  const categoryResponse = await getCategory(params);
  return categoryResponse.data.categories.results;
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>({ categorySearch: loadCategories });

export default useCategory;

// export default function useCategory(id: string): UseCategory<Category> {
//   const { state, persistedResource } = usePersistedState(id);
//   const categories: Ref<Category[]> = ref(state || []);
//   const loading = ref(false);

//   const search = async (params) => {
//     if (!state) {
//       loading.value = true;
//     }
//     categories.value = await persistedResource<Category[]>(loadCategories, params);
//     loading.value = false;
//   };

//   return {
//     search,
//     loading: computed(() => loading.value),
//     categories: computed(() => categories.value)
//   };
// }
