<template>
  <section class="order-details">
    <div v-if="orderId">
      <h2>Order #{{orderGetters.getNumber(order)}}</h2>
      <p>Status: <strong>{{orderGetters.getStatus(order)}}</strong></p>
      <p>Date: <strong>{{orderGetters.getDate(order)}}</strong></p>

      <h3 class="title">Items</h3>
      <SfCollectedProduct
        v-for="product in orderGetters.getItems(order)"
        :key="cartGetters.getItemSku(product)"
        :image="cartGetters.getItemImage(product)"
        :title="cartGetters.getItemName(product)"
        :regular-price="'$' + cartGetters.getItemPrice(product).regular"
        :qty="cartGetters.getItemQty(product)"
        class="ordered-product"
      />

      <h3 class="title">Summary</h3>
      <div class="order-details__summary">
        <div class="order-details__summary__item">
          <span class="property">Net value</span>
          <span class="value">${{orderGetters.getNetValue(order)}}</span>
        </div>
        <div class="order-details__summary__item">
          <span class="property">Gross value</span>
          <span class="value">${{orderGetters.getGrossValue(order)}}</span>
        </div>
        <div class="order-details__summary__item">
          <span class="property">Tax included</span>
          <span class="value">${{orderGetters.getTaxValue(order)}} ({{orderGetters.getTaxRate(order)}}%)</span>
        </div>
      </div>

      <h3 class="title">Order addresses</h3>
      <div class="order-details__addresses">
        <div class="order-details__addresses__item">
          <p class="order-details__addresses__item__title">Billing Address</p>
          <div class="order-details__addresses__item__field" :key="address.property" v-for="address in orderGetters.getBillingAddressValues(order)">
            <span class="property">{{address.property}}</span>
            <span class="value">{{address.value}}</span>
          </div>
        </div>
        <div class="order-details__addresses__item">
          <p class="order-details__addresses__item__title">Shipping Address</p>
          <div class="order-details__addresses__item__field" :key="address.property" v-for="address in orderGetters.getShippingAddressValues(order)">
            <span class="property">{{address.property}}</span>
            <span class="value">{{address.value}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Order not found</p>
    </div>
  </section>
</template>

<script>
import { computed } from '@vue/composition-api';
import { SfCollectedProduct } from '@storefront-ui/vue';
import { useUserOrders, orderGetters, cartGetters } from '<%= options.composables %>';

export default {
  name: 'OrderDetails',
  components: {
    SfCollectedProduct
  },
  props: ['orderId'],
  setup({ orderId }) {
    const { searchOrders, orders } = useUserOrders();

    orderId && searchOrders({ id: orderId });

    return {
      cartGetters,
      orderGetters,
      order: computed(() => orders.value[0] || {})
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.order-details {
  .title {
    margin-top: var(--spacer-extra-big);
    font-size: var(--font-size-big);
    font-weight: 500;
  }

  .property {
    min-width: 10rem;
  }

  &__summary {
    &__item {
      display: flex;
      flex-direction: row;

      .value {
        font-weight: 500;
      }
    }
  }

  @include for-desktop {
    &__addresses {
      display: flex;
      justify-content: space-between;

      &__item {
        flex: 1;
      }
    }
  }

  &__addresses__item {
    &__title {
      font-weight: 500;
    }

    &__field {
      display: flex;
    }
  }

}
</style>

<style lang="scss">
.order-details {
  .ordered-product {
    input {
      pointer-events: none;
    }

    .sf-collected-product__remove {
      display: none;
    }
  }
}
</style>
