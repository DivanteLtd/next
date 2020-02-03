<template>
  <div class="sf-topbar">
    <div class="sf-topbar__content">
      <div class="sf-topbar__content__item"></div>
      <div class="sf-topbar__content__item">Download our application. <a href="#">Find out more.</a></div>
      <div class="sf-topbar__content__item selector-container">
        <SfSelect
          v-if="availableLanguages.length > 0"
          :selected="language"
          @change="onLanguageSelect"
      >
        <SfSelectOption
          v-for="availableLanguage in availableLanguages"
          :key="availableLanguage"
          :value="availableLanguage"
        >
          {{LANGUAGES_MAP[availableLanguage] || availableLanguage}}
        </SfSelectOption>
      </SfSelect>
      <SfSelect
          v-if="availableCountries.length > 0"
          :selected="country"
          @change="onCountrySelect"
      >
        <SfSelectOption
          v-for="availableCountry in availableCountries"
          :key="availableCountry"
          :value="availableCountry"
        >
          {{COUNTRIES_MAP[availableCountry] || availableCountry}}
        </SfSelectOption>
      </SfSelect>
      </div>
      
    </div>
  </div>
</template>

<script>
import { useLocale } from '@vue-storefront/commercetools-composables'
import { reactive } from '@vue/composition-api'
import { SfSelect } from "@storefront-ui/vue";

export default {
  setup(props, { isServer }) {
    const { availableLanguages, availableCountries, language, country, loadData, update } = useLocale()

    const LANGUAGES_MAP = {
      'en': 'English',
      'de': 'Deutsch'
    }
    const COUNTRIES_MAP = {
      'DE': 'Germany',
      'AT': 'Austria',
      'US': 'United States',
      'NL': 'Netherlands'
    }

    if (!isServer) {
      loadData().then(() => update({
        language: (localStorage.getItem('language') || 'en').toLowerCase(),
        country: (localStorage.getItem('country') || 'US').toUpperCase(),
        currency: (localStorage.getItem('currency') || 'USD').toUpperCase(),
      }))
    }

    return {
      language,
      country,
      availableLanguages,
      availableCountries,
      update,
      COUNTRIES_MAP,
      LANGUAGES_MAP
    }
  },
  components: {
    SfSelect
  },
  methods: {
    getPreferredLanguage (countryCode) {
      switch (countryCode) {
        case 'DE':
        case 'AT':
          return 'de'
        case 'US':
        case 'NL':
        default:
          return 'en'
      }
    },
    onLanguageSelect (language) {
      this.update({ language })

      localStorage.setItem('language', language)
      
      window.location.reload()
    },
    onCountrySelect(country) {
      const preferredLanguage = this.getPreferredLanguage(country)

      if (this.language !== preferredLanguage) {
        this.update({
          language: preferredLanguage,
          country,
        })

        localStorage.setItem('language', preferredLanguage)
      } else {
        this.update({ country })
      }

      localStorage.setItem('country', country)

      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.sf-topbar {
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  background: #f1f2f3;

  &__content {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;

    @media screen and (min-width: $desktop-min) {
      max-width: 1240px;
      margin: auto;
      
    }

    &__item {
      &.i18n {
        cursor: pointer;
      }
    }
  }

  .selector-container {
    display: flex;

    .sf-select {
      width: 160px;
    }
  }
}
</style>