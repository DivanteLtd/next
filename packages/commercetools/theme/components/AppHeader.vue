<template>
  <div>
    <SfTopBar>
      <template #default>
        Download our application. <a href="#">Find out more.</a>
      </template>
      <template #right>
        <currency-switcher position="right"/>
      </template>
    </SfTopBar>
    <SfHeader active-sidebar="activeSidebar">
      <template #logo>
        <nuxt-link to="/" class="sf-header__logo">
          <SfImage :src="mobileLogo" alt="Vue Storefront Next" class="sf-header__logo-image sf-header__logo-image--mobile"/>
          <SfImage :src="desktopLogo" alt="Vue Storefront Next" class="sf-header__logo-image sf-header__logo-image--desktop"/>
        </nuxt-link>
      </template>
      <template #navigation>
        <nuxt-link to="/c/cat">
          <SfHeaderNavigationItem>
            WOMEN
          </SfHeaderNavigationItem>
        </nuxt-link>
        <nuxt-link to="/c/cat">
          <SfHeaderNavigationItem>
            MEN
          </SfHeaderNavigationItem>
        </nuxt-link>
        <nuxt-link to="/c/cat">
          <SfHeaderNavigationItem>
            KIDS
          </SfHeaderNavigationItem>
        </nuxt-link>
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfImage, SfTopBar } from '@storefront-ui/vue'
import CurrencySwitcher from '~/components/CurrencySwitcher.vue'

export default {
  components: {
    SfHeader,
    SfImage,
    SfTopBar,
    CurrencySwitcher
  },
  data () {
    return {
      mobileLogo: require('~/assets/logo-horizontal.jpg'),
      desktopLogo: require('~/assets/logo-square.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@storefront-ui/shared/styles/variables";

.sf-header__logo-image {
  height: 100%;

  @media screen and (min-width: $desktop-min) {
    &--mobile {
      display: none
    }
  }

  @media screen and (max-width: $desktop-min) {
    &--desktop {
      display: none
    }
  }
}
</style>
