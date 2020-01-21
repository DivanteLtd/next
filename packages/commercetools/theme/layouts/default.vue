<template>
  <div id="layout" >
    <AppTopBar />
    <AppHeader />
    <nuxt />
    <BottomNavigation />
    <AppFooter />
    <CartSidebar />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppTopBar from '~/components/AppTopBar.vue'
import BottomNavigation from '~/components/BottomNavigation.vue'
import AppFooter from '~/components/AppFooter.vue'
import CartSidebar from '~/components/CartSidebar.vue'
import { useLanguage } from '@vue-storefront/commercetools-composables'

export default {
  components: {
    AppHeader,
    AppTopBar,
    BottomNavigation,
    AppFooter,
    CartSidebar
  },
  setup(props, context) {
    const DEFAULT_LANGUAGE = 'en'
    const { language, detect, change } = useLanguage()

    const detectedLanguage = detect('http://localhost:3000/pl/some-product-slug', null) || DEFAULT_LANGUAGE

    if (language !== detectedLanguage) {
      change(detectedLanguage, 'http://localhost:3000/pl/some-product-slug')
    }
  }
}
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
@import "~@storefront-ui/shared/styles/helpers/visibility";
@import "~@storefront-ui/vue/src/utilities/transitions/transitions";

body {
  padding: 0;
  margin: 0;
}

#layout {
  box-sizing: border-box;
  @media screen and (min-width: $desktop-min) {
    max-width: 1240px;
    margin: auto;
    padding-top: 40px;
  }
}
</style>
