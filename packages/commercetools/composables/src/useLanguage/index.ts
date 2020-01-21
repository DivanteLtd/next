import { UseLanguage } from '@vue-storefront/interfaces'
import { Ref, ref } from '@vue/composition-api'

const language: Ref<string | null> = ref(null);

type Change = (languageCode: string, currentUrl?: string) => void;

type Detect = (url: string, storedLanguage: string | null) => string;

// const getLanguageFromRequest = (): string | null => ''

// /* TODO: @defudef: Include localStorage into TS */
// // @ts-ignore
// const getLanguageFromStorage = () => localStorage !== undefined
//   // @ts-ignore
//   ? localStorage.getItem('vsf-language')
//   : null

export default function useLanguage (): UseLanguage<Change, Detect> {
  const change: Change = (languageCode, currentUrl) => {
    console.log('useLanguage:change')
  }
  const detect: Detect = (url, storedLanguage) => {
    console.log('useLanguage:detect')

    return 'en'
  }

  return {
    language,
    change,
    detect,
  }
}
