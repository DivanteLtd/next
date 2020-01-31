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
    <SfHeader
      active-sidebar="activeSidebar"
      @click:cart="toggleCartSidebar"
      @click:account="onAccountClicked"
      has-mobile-search
      >
      <template #logo>
        <div class="sf-header__top-section">
          <nuxt-link to="/" class="sf-header__logo">
            <SfImage :src="mobileLogo" alt="Vue Storefront Next" class="sf-header__logo-image sf-header__logo-image--mobile"/>
            <SfImage :src="desktopLogo" alt="Vue Storefront Next" class="sf-header__logo-image sf-header__logo-image--desktop"/>
          </nuxt-link>
          <currency-switcher class="sf-header__top-section-currency-switcher" position="right"/>
        </div>
      </template>
      <template #navigation>
        <nuxt-link to="/c/women">
          <SfHeaderNavigationItem>
            WOMEN
          </SfHeaderNavigationItem>
        </nuxt-link>
        <nuxt-link to="/c/men">
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
import uiState from '~/assets/ui-state'
import CurrencySwitcher from '~/components/CurrencySwitcher.vue'

const { toggleCartSidebar, toggleLoginModal } = uiState

export default {
  setup () {
    return {
      toggleCartSidebar,
      toggleLoginModal
    }
  },
  components: {
    SfHeader,
    SfImage,
    SfTopBar,
    CurrencySwitcher
  },
  methods: {
    onAccountClicked() {
      // When need to go to another page or do something else when logged in
      toggleLoginModal()
    }
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

  .sf-header__top-section {
    @media screen and (max-width: $desktop-min) {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .currency-switcher {
      display: none;

      @media screen and (max-width: $desktop-min) {
        display: block;
        margin: auto 0px;
      }
    }
  }
  .sf-header__logo {
    display: block;
  }
  .sf-header__logo-image {
    height: 100%;

    &--mobile {
      @media screen and (min-width: $desktop-min) {
        display: none
      }
    }

    &--desktop {
      @media screen and (max-width: $desktop-min) {
        display: none
      }
    }

  }
</style>
