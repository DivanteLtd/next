<template>
  <div class="sf-topbar">
    <div class="sf-topbar__content">
      <div class="sf-topbar__content__item"></div>
      <div class="sf-topbar__content__item">Download our application. <a href="#">Find out more.</a></div>
      <div @click="toggleLanguage" class="sf-topbar__content__item i18n">{{languageFullName}}</div>
    </div>
  </div>
</template>

<script>
import { useLocale } from '@vue-storefront/commercetools-composables'

export default {
  setup(props, { isServer }) {
    const { language, setLanguage } = useLocale()

    !isServer && setLanguage(localStorage.getItem('language') || 'en')

    return {
      language,
      setLanguage
    }
  },
  methods: {
    toggleLanguage() {
      this.setLanguage(this.language === 'en' ? 'de' : 'en')

      localStorage.setItem('language', this.language)
      window.location.reload()
    },
  },
  computed: {
    languageFullName() {
      return this.language === 'en' ? 'English' : 'Deutsch'
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
}
</style>