<template>
  <div class="sf-topbar">
    <div class="sf-topbar__content">
      <div class="sf-topbar__content__item"></div>
      <div class="sf-topbar__content__item">Download our application. <a href="#">Find out more.</a></div>
      <div class="sf-topbar__content__item selector-container">
        <SfSelect
          v-model="selectedLanguage"
          @change="onLanguageSelect"
      >
        <SfSelectOption
          v-for="language in languages"
          :key="language.value"
          :value="language.value"
        >
          {{language.label}}
        </SfSelectOption>
      </SfSelect>
      <SfSelect
          v-model="selectedCountry"
          @change="onCountrySelect"
      >
        <SfSelectOption
          v-for="country in countries"
          :key="country.value"
          :value="country.value"
        >
          {{country.label}}
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
    const { getLanguage, setLanguage, getCountry, setCountry, getCountries } = useLocale()
    const countries = reactive([])

    let selectedLanguage = '';
    let selectedCountry = '';

    if (!isServer) {
      selectedLanguage = (localStorage.getItem('language') || 'en').toLowerCase()
      selectedCountry = (localStorage.getItem('country') || 'US').toUpperCase()

      setLanguage(selectedLanguage)
      setCountry(selectedCountry)
    }

    return {
      selectedLanguage,
      selectedCountry,
      countries: getCountries(),
      setLanguage,
      getLanguage,
      setCountry,
      getCountry,
    }
  },
  data () {
    return {
      languages: [
        { value: 'en', label: 'English' },
        { value: 'de', label: 'Deutsch' },
      ]
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
      this.setLanguage(language)
      localStorage.setItem('language', language)
      
      window.location.reload()
    },
    onCountrySelect(country) {
      const preferredLanguage = this.getPreferredLanguage(country)

      this.setCountry(country)
      localStorage.setItem('country', country)

      if (this.getLanguage() !== preferredLanguage) {
        this.setLanguage(preferredLanguage)
        localStorage.setItem('language', preferredLanguage)
      }

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