import { UseProduct } from '@vue-storefront/interfaces';
import { usePersistedState } from '@vue-storefront/utils';
import { ref, Ref, computed } from '@vue/composition-api';
import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';

const loadProductVariants = async (params): Promise<ProductVariant[]> => {
  const productResponse = await getProduct(params);
  const enhancedProductResponse = enhanceProduct(productResponse);

  return (enhancedProductResponse.data as any)._variants;
};
// todo: add total products count
export default function useProduct(id: string): UseProduct<ProductVariant> {
  const { state, persistedResource } = usePersistedState(id);

  const products: Ref<ProductVariant[]> = ref(state || []);
  const loading = ref(false);
  const totalProducts = ref(0);

  const search = async (params) => {
    loading.value = true;
    products.value = await persistedResource<ProductVariant[]>(loadProductVariants, params);
    loading.value = false;
  };

  return {
    products: computed(() => products.value),
    search,
    loading: computed(() => loading.value),
    totalProducts: computed(() => totalProducts.value)
  };
}
