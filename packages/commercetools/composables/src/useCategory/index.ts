import { UseCategory } from '@vue-storefront/interfaces'
import { ref, Ref } from '@vue/composition-api'
import { getCategory, getProduct } from '@vue-storefront/commercetools-api'
import { enhanceProduct, enhanceCategory, getSsrData } from './../helpers/internals'
import { SsrContext } from '../types/SSR';

interface UseCategorySearchParams {
  slug?: string
}

interface SsrContextData {
  categories: Ref<any[]>,
  loading: Ref<boolean>,
}

const loadCategories = async (params: UseCategorySearchParams) => {
  const categoryResponse = await getCategory(params)
  const rawCategories = categoryResponse.data.categories.results
  const catIds = rawCategories.map(c => c.id)
  const productResponse = await getProduct({ catIds })
  const enhancedCategory = enhanceCategory(categoryResponse, enhanceProduct(productResponse))

  return enhancedCategory.data.categories.results
}

export default function useCategory (ssrContext?: SsrContext<SsrContextData>): UseCategory<any, any, any, any, any> & { ssrData?: SsrContextData } {
  const categories = ref([])
  const appliedFilters = ref(null)
  const applyFilter = () => { () => { console.log('useCategory:applyFilter') } }
  const clearFilters = () => { () => { console.log('useCategory:clearFilters') } }
  const loading = ref(true)
  const error = ref(null)

  const ssrData = getSsrData(ssrContext)

  if (ssrData) {
    ssrData.categories = categories
    ssrData.loading = loading
  }

  const search = async (params: UseCategorySearchParams) => {
    categories.value = await loadCategories(params)
    loading.value = false
  }

  return {
    categories,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error,
    ssrData,
  }
}
