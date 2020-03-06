<template>
  <transition name="fade">
    <SfTabs
      v-if="editAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab title="Change the address">
        <p class="message">
          Keep your shipping and contact details updated.
        </p>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form id="shipping-details-form" class="form" @submit.prevent="handleSubmit(updateAddress)">
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="firstName"
                  name="firstName"
                  label="First Name"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="lastName"
                  name="lastName"
                  label="Last Name"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
            </div>
            <ValidationProvider rules="required|min:5" v-slot="{ errors }" class="form__element">
              <SfInput
                v-model="streetName"
                name="streetName"
                label="Street Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfInput
              v-model="streetNumber"
              name="streetNumber"
              label="House/Apartment number"
              required
              class="form__element"
            />
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="city"
                  name="city"
                  label="City"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
              <SfInput
                  v-model="state"
                  name="state"
                  label="State/Province"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:4" v-slot="{ errors }" class="form__element">
                <SfInput
                  v-model="postalCode"
                  name="postalCode"
                  label="Zip-code"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider :rules="`required|oneOf:${countries.join(',')}`" v-slot="{ errors }" class="form__element">
                <SfSelect
                  v-model="country"
                  name="country"
                  label="Country"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                >
                  <SfSelectOption
                    v-for="countryOption in countries"
                    :key="countryOption"
                    :value="countryOption"
                  >
                    {{ countryOption }}
                  </SfSelectOption>
                </SfSelect>
              </ValidationProvider>
            </div>
            <ValidationProvider rules="required|min:8" v-slot="{ errors }" class="form__element">
              <SfInput
                v-model="phone"
                name="phone"
                label="Phone number"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfButton class="form__button">Update the address</SfButton>
          </form>
        </ValidationObserver>
      </SfTab>
    </SfTabs>
    <SfTabs v-else key="address-list" :open-tab="1" class="tab-orphan">
      <SfTab title="Shipping details">
        <p class="message">
          Manage all the shipping addresses you want (work place, home address
          ...) This way you won"t have to enter the shipping address manually
          with each order.
        </p>
        <transition-group tag="div" name="fade" class="shipping-list">
          <div
            v-for="(address) in account.shipping"
            :key="address.id"
            class="shipping"
          >
            <div class="shipping__content">
              <p class="shipping__address">
                <span class="shipping__client-name"
                  >{{ address.firstName }} {{ address.lastName }}</span
                ><br />
                {{ address.streetName }} {{ address.streetNumber }}<br />{{
                  address.postalCode
                }}
                {{ address.city }},<br />{{ address.country }}
              </p>
              <p class="shipping__address">
                {{ address.phone }}
              </p>
            </div>
            <div class="shipping__actions">
              <SfIcon
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="mobile-only"
                @click="deleteAddress(address.id)"
              />
              <SfButton @click="changeAddress(address.id)">Change</SfButton>
              <SfButton
                class="shipping__button-delete desktop-only"
                @click="deleteAddress(address.id)"
                >Delete</SfButton
              >
            </div>
          </div>
        </transition-group>
        <SfButton class="action-button" @click="changeAddress(-1)"
          >Add new address</SfButton
        >
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfInput,
  SfButton,
  SfSelect,
  SfIcon
} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, oneOf } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

export default {
  name: 'ShippingDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfSelect,
    SfIcon,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },
  setup({ account }) {
    const editAddress = ref(false);
    const editedAddress = ref(-1);
    const countries = [
      'Austria',
      'Azerbaijan',
      'Belarus',
      'Belgium',
      'Bosnia and Herzegovina',
      'Bulgaria',
      'Croatia',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Estonia',
      'Finland',
      'France',
      'Georgia',
      'Germany',
      'Greece',
      'Hungary',
      'Iceland',
      'Ireland',
      'Italy',
      'Kosovo',
      'Latvia',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macedonia',
      'Malta',
      'Moldova',
      'Monaco',
      'Montenegro',
      'The Netherlands',
      'Norway',
      'Poland',
      'Portugal',
      'Romania',
      'Russia',
      'San Marino',
      'Serbia',
      'Slovakia',
      'Slovenia',
      'Spain',
      'Sweden',
      'Switzerland',
      'Turkey',
      'Ukraine',
      'United Kingdom',
      'Vatican City'
    ];
    const firstName = ref('');
    const lastName = ref('');
    const streetName = ref('');
    const streetNumber = ref('');
    const city = ref('');
    const state = ref('');
    const postalCode = ref('');
    const country = ref('');
    const phone = ref('');

    const changeAddress = (id) => {
      const address = account.shipping.find(shippingAddress => id === shippingAddress.id);

      if (!address) {
        return;
      }

      firstName.value = address.firstName || account.firstName || '';
      lastName.value = address.lastName || account.lastName || '';
      streetName.value = address.streetName || '';
      city.value = address.city || '';
      state.value = address.state || '';
      postalCode.value = address.postalCode || '';
      country.value = address.country || '';
      phone.value = address.contactInfo ? address.contactInfo.phone || '' : '';

      editAddress.value = true;
    };

    const updateAddress = (id) => {
      console.log(`updateAddress: ${id}`);
      // TODO: Integrate with API in other task
      // OLD CODE HERE:
      // const account = { ...this.account };
      // const shipping = {
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   streetNumber: this.streetNumber,
      //   streetName: this.streetName,
      //   city: this.city,
      //   state: this.state,
      //   postalCode: this.postalCode,
      //   country: this.country,
      //   phone: this.phone
      // };
      // const index = this.editedAddress;
      // if (index > -1) {
      //   this.$props.addresses[index] = shipping;
      //   this.editedAddress = -1;
      // } else {
      //   this.$props.addresses.push(shipping);
      // }
      // this.editAddress = false;
      // this.$emit('update:shipping', account);
    };

    const deleteAddress = (id) => {
      console.log(`deleteAddress: ${id}`);
      // TODO: Integrate with API in other task
      // OLD CODE HERE:
      // const account = { ...this.account };
      // this.$props.addresses.splice(index, 1);
      // this.$emit('update:shipping', account);
    };

    return {
      countries,
      firstName,
      lastName,
      streetName,
      streetNumber,
      city,
      state,
      postalCode,
      country,
      phone,
      editAddress,
      editedAddress,
      changeAddress,
      updateAddress,
      deleteAddress
    };
  }
};
</script>
<style lang="scss">
#shipping-details-form {
  .sf-select__selected {
    padding: 0;
    border-bottom: 1px solid #f1f2f3;
  }
}
</style>
<style lang='scss' scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.form {
  &__element {
    display: block;
    margin-bottom: $spacer-extra-big;
  }

  &__button {
    display: block;
  }

  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: $spacer-extra-big;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.message {
  margin: 0 0 $spacer-extra-big 0;
  font-family: $body-font-family-primary;
  font-weight: $body-font-weight-primary;
  line-height: 1.6;
  font-size: $font-size-regular-mobile;
  @include for-desktop {
    font-size: $font-size-regular-desktop;
  }
}
.shipping-list {
  margin-bottom: $spacer-extra-big;
}
.shipping {
  display: flex;
  padding: $spacer-big 0;
  border-top: 1px solid $c-light;
  &:last-child {
    border-bottom: 1px solid $c-light;
  }
  &__content {
    flex: 1;
    color: $c-text;
    font-size: $font-size-small-mobile;
    font-weight: 300;
    line-height: 1.6;
    @include for-desktop {
      font-size: $font-size-small-desktop;
    }
  }
  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
  &__button-delete {
    background-color: $c-light;
    color: $c-text-muted;
    @include for-desktop {
      margin-left: $spacer-big;
    }
  }
  &__address {
    margin: 0 0 $spacer-big 0;
    &:last-child {
      margin: 0;
    }
  }
  &__client-name {
    font-size: $font-size-regular-desktop;
    font-weight: 500;
  }
}
.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }
      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
