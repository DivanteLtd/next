<template>
  <SfHeader active-sidebar="activeSidebar" @click:cart="showCartSidebar">
    <template #logo>
      <nuxt-link to="/" class="sf-header__logo">
        <SfImage src="/icons/logo.svg" alt="Vue Storefront Next" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>
    <template #navigation>
      <nuxt-link to="/l/cat">
        <SfHeaderNavigationItem>
          WOMEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/l/cat">
        <SfHeaderNavigationItem>
          MEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/l/cat">
        <SfHeaderNavigationItem>
          {{ isCartSidebarOpen }}
        </SfHeaderNavigationItem>
      </nuxt-link>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue'
import { isCartSidebarOpen } from '../assets/ui-state'

export default {
  components: {
    SfHeader,
    SfImage
  },
  methods: {
    showCartSidebar: () => {
      isCartSidebarOpen.value = true
    }
  },
  setup() {
    return {
      isCartSidebarOpen: isCartSidebarOpen.value
    }
  }
}
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>