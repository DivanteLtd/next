import { UseCategory } from '@vue-storefront/interfaces'
import { ref } from '@vue/composition-api'

export default function useCategory (): UseCategory<any, any, any, any, any> {
  const category = ref(null)
  const search = () => { console.log('useCategory:search') }
  const appliedFilters = ref(null)
  const applyFilter = () => { () => { console.log('useCategory:applyFilter') } }
  const clearFilters = () => { () => { console.log('useCategory:clearFilters') } }
  const loading = ref(false)
  const error = ref(null)

  return {
    category,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error
  }
}