<template>
  <div class="flag-option">
    <slot name="flag" v-bind="flag">
      <div v-if="flag" class="flag-option__flag">
        <img class="flag-option__flag-img" :src="getFlagPath(flag)" :alt="flag">
      </div>
    </slot>

    <slot name="label" v-bind="{label}">
      <div class="flag-option__label">{{ label }}</div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "FlagOption",
    props: {
      label: {
        type: String,
        default: ""
      },
      flag: {
        type: String,
        default: ""
      }
    },
    methods: {
      getFlagPath (flag) {
        return require(`~/assets/flags/${flag}.svg`)
      }
    }
  };
</script>

<style lang="scss">
  @import "~@storefront-ui/shared/styles/variables";

  .flag-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: $body-font-family-secondary;
    font-size: $font-size-regular-mobile;
    font-weight: $body-font-weight-secondary;
    line-height: 1.6;
    @media screen and (min-width: $desktop-min) {
      font-size: $font-size-regular-desktop;
    }
    &__label {
      flex-grow: 1;
    }
    &__flag {
      display: flex;
      margin-right: $spacer-small;

      &-img {
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid white;
      }
    }
  }
</style>
