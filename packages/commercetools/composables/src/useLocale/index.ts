import { UseLocale } from '@vue-storefront/interfaces'
import { Ref, ref, reactive } from '@vue/composition-api'
import { updateStoreConfig, getProjectProjection } from '@vue-storefront/commercetools-api'

interface UpdateDto {
  language?: string
  country?: string
  currency?: string
}

type Update = (data: UpdateDto) => void
type LoadData = () => Promise<void>

export default function useLocale (): UseLocale<Update, LoadData> {
  const language: Ref<string> = ref('')
  const country: Ref<string> = ref('')
  const currency: Ref<string> = ref('')

  const availableLanguages: Array<string> = reactive([])
  const availableCountries: Array<string> = reactive([])
  const availableCurrencies: Array<string> = reactive([])
  
  const update: Update = (updateDto: UpdateDto) => {
    if (updateDto.language) language.value = updateDto.language
    if (updateDto.country) country.value = updateDto.country
    if (updateDto.currency) currency.value = updateDto.currency

    updateStoreConfig({
      locale: language.value,
      country: country.value,
      currency: currency.value
    })
  }

  const loadData: LoadData = async () => {
    const { data: { project } } = await getProjectProjection()

    if (availableLanguages.length > 0) availableLanguages.length = 0
    if (availableCountries.length > 0) availableCountries.length = 0
    if (availableCurrencies.length > 0) availableCurrencies.length = 0

    availableLanguages.push(...project.languages)
    availableCountries.push(...project.countries)
    availableCurrencies.push(...project.currencies)
  }

  return {
    language,
    country,
    currency,
    availableLanguages,
    availableCountries,
    availableCurrencies,
    update,
    loadData
  }
}
