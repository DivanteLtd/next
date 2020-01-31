import { UseLocale } from '@vue-storefront/interfaces'
import { updateStoreConfig, locale, country, currency } from '@vue-storefront/commercetools-api'

type SetLanguage = (languageCode: string) => void;
type GetLanguage = () => string;
type SetCountry = (countryCode: string) => void;
type GetCountry = () => string;
type GetCountries = () => { value: string, label: string }[];

export default function useLocale (): UseLocale<SetLanguage, GetLanguage, SetCountry, GetCountry, GetCountries> {
  const setLanguage: SetLanguage = (languageCode: string) => {
    updateStoreConfig({
      locale: languageCode,
      currency,
      country
    })
  }
  const getLanguage: GetLanguage = () => locale
  const setCountry: SetCountry = (countryCode: string) => updateStoreConfig({
    locale,
    currency,
    country: countryCode
  })
  const getCountry: GetCountry = () => country
  // TODO: Mocked country list. Need to do: async GQL request
  const getCountries: GetCountries = () => {
    return [
      { value: 'US', label: 'United States' },
      { value: 'AT', label: 'Austria' },
      { value: 'DE', label: 'Germany' },
      { value: 'NL', label: 'Netherlands' }
    ]
  }

  return {
    setLanguage,
    getLanguage,
    setCountry,
    getCountry,
    getCountries
  }
}
