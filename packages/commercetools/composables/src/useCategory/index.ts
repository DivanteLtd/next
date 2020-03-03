import { UseCategory } from '@vue-storefront/interfaces';
import { usePersistedState } from '@vue-storefront/utils';
import { ref, Ref, computed } from '@vue/composition-api';
import { getCategory, getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct, enhanceCategory } from './../helpers/internals';
import { Category } from './../types/GraphQL';

const loadCategories = async (params) => {
  const categoryResponse = await getCategory(params);
  const rawCategories = categoryResponse.data.categories.results;
  const catIds = rawCategories.map((c) => c.id);
  const productResponse = await getProduct({ catIds });
  const enhancedCategory = enhanceCategory(categoryResponse, enhanceProduct(productResponse));

  return enhancedCategory.data.categories.results;
};

export default function useCategory(id: string): UseCategory<Category> {
  const { state, persistedResource } = usePersistedState(id);
  const categories: Ref<Category[]> = ref(state || []);
  const loading = ref(false);

  const search = async (params) => {
    if (!state) {
      loading.value = true;
    }
    categories.value = await persistedResource<Category[]>(loadCategories, params);
    loading.value = false;
  };

  return {
    search,
    loading: computed(() => loading.value),
    categories: computed(() => categories.value)
  };
}
