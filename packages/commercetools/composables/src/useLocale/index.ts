import { UseLocale } from '@vue-storefront/interfaces'
import { Ref, ref } from '@vue/composition-api'

const language: Ref<string | null> = ref('en');
const country: Ref<string | null> = ref(null);

type SetLanguage = (languageCode: string) => void;
type SetCountry = (countryCode: string) => void;

export default function useLocale (): UseLocale<SetLanguage, SetCountry> {
  const setLanguage: SetLanguage = (languageCode: string) => {
    language.value = languageCode
  }
  const setCountry: SetCountry = (countryCode: string) => console.log('useLocale:setCountry')

  return {
    country,
    language,
    setLanguage,
    setCountry,
  }
}
