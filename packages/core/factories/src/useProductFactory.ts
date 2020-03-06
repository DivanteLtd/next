import { UseProduct } from '@vue-storefront/interfaces';
import { ref, Ref, computed } from '@vue/composition-api';

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<PRODUCT[]>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS>
) {
  return function useProduct(cacheId: string): UseProduct<PRODUCT> {
    console.info(
      'SSR Temporarly disbled for product composable https://github.com/DivanteLtd/next/issues/232',
      cacheId
    );
    // const { state, persistedResource } = usePersistedState(id);

    // const products: Ref<ProductVariant[]> = ref(state || []);\
    const products: Ref<PRODUCT[]> = ref([]);
    const loading = ref(false);
    const totalProducts = ref(0);

    const search = async params => {
      loading.value = true;
      // products.value = await persistedResource<ProductVariant[]>(loadProductVariants, params);
      products.value = await factoryParams.productsSearch(params);
      loading.value = false;
    };

    return {
      products: computed(() => products.value),
      search,
      loading: computed(() => loading.value),
      totalProducts: computed(() => totalProducts.value)
    };
  };
}
