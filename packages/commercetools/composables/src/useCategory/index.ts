import { UseCategory } from '@vue-storefront/interfaces';
import { ref, computed } from '@vue/composition-api';
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

export default function useCategory(): UseCategory<Category, any, any> {
  const _categories = ref([]);
  const appliedFilters = ref(null);
  const applyFilter = () => {
    () => {
      console.log('useCategory:applyFilter');
    };
  };
  const clearFilters = () => {
    () => {
      console.log('useCategory:clearFilters');
    };
  };
  const loading = ref(true);
  const error = ref(null);

  const search = async (params) => {
    _categories.value = await loadCategories(params);
    loading.value = false;
  };

  const categories = computed(() => _categories.value);

  return {
    categories,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error
  };
}
