<template>
  <SfSelect
    v-model="selected"
    :label="showLabel ? 'Currency' : ''"
    class="currency-switcher"
    :class="{'currency-switcher--position-right': position === 'right'}">
      <SfSelectOption v-for="(option, key) in options" :key="key" :value="option.value">
        <FlagOption :flag="option.flag" :label="option.label"></FlagOption>
      </SfSelectOption>
  </SfSelect>
</template>

<script>
  import { SfSelect } from '@storefront-ui/vue'
  import FlagOption from '~/components/FlagOption.vue'

  export default {
    props: {
      position: {
        type: String,
        default: 'left',
        validator: value => ['left', 'right'].includes(value)
      },
    },
    data () {
      return {
        selected: "",
        options: [
          { value: "USD", flag: "us", label: "USD" },
          { value: "EUR", flag: "eu", label: "EUR" }
        ]
      };
    },
    computed: {
      showLabel () {
        return !this.selected
      }
    },
    components: {
      SfSelect,
      FlagOption
    },
  }
</script>

<style lang="scss">
  @import "~@storefront-ui/shared/styles/variables";

  .currency-switcher {
    margin-top: 0;

    &--position-right {
      .sf-select__label {
        right: 0;
      }
      .sf-select__dropdown {
        @media screen and (min-width: $desktop-min) {
          left: initial;
        }
      }
    }

    .sf-select__selected {
      padding: 0;
    }

    /** @todo: change to variables when https://github.com/DivanteLtd/storefront-ui/issues/680 gets merged **/
    .sf-overlay {
      z-index: 2;
    }
    .sf-select__dropdown {
      z-index: 2;
    }
  }
</style>
