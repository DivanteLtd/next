import { UseCart } from '@vue-storefront/interfaces';
import { Ref, ref, watch, computed } from '@vue/composition-api';

export type UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON> = {
  cart: Ref<CART>;
  loadCart: () => Promise<CART>;
  addToCart: (currentCart: CART, product: PRODUCT, quantity: any) => Promise<CART>;
  removeFromCart: (currentCart: CART, product: CART_ITEM) => Promise<CART>;
  updateQuantity: (currentCart: CART, product: CART_ITEM, quantity: number) => Promise<CART>;
  clearCart: (currentCart: CART) => Promise<CART>;
  applyCoupon: (currentCart: CART, coupon: string) => Promise<{ cart: CART; coupon: COUPON }>;
  removeCoupon: (currenCart: CART) => Promise<CART>;
  isOnCart: (currentCart: CART, product: PRODUCT) => boolean;
};

export function useCartFactory<CART, CART_ITEM, PRODUCT, COUPON> (factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>) {
  const coupon: Ref<COUPON> = ref(null);
  const loading: Ref<boolean> = ref<boolean>(false);

  return function useCart(): UseCart<CART, CART_ITEM, PRODUCT, COUPON> {
    watch(async () => {
      if (!factoryParams.cart.value && !loading.value) {
        loading.value = true;
        factoryParams.cart.value = await factoryParams.loadCart();
        loading.value = false;
      }
    });

    const addToCart = async (product: PRODUCT, quantity: number) => {
      loading.value = true;
      const updatedCart = await factoryParams.addToCart(factoryParams.cart.value, product, quantity);
      factoryParams.cart.value = updatedCart;
      loading.value = false;
    };

    const removeFromCart = async (product: CART_ITEM) => {
      loading.value = true;
      const updatedCart = await factoryParams.removeFromCart(factoryParams.cart.value, product);
      factoryParams.cart.value = updatedCart;
      loading.value = false;
    };

    const updateQuantity = async (product: CART_ITEM, quantity: number) => {
      if (quantity > 0) {
        loading.value = true;
        const updatedCart = await factoryParams.updateQuantity(factoryParams.cart.value, product, quantity);
        factoryParams.cart.value = updatedCart;
        loading.value = false;
      }
    };

    const refreshCart = async () => {
      factoryParams.cart.value = await factoryParams.loadCart();
    };

    // TODO
    const clearCart = () => console.log('useCart:clearCart');

    const isOnCart = (product: PRODUCT) => {
      return computed(() => factoryParams.isOnCart(factoryParams.cart.value, product));
    };

    const applyCoupon = () => console.log('useCart:applyCoupon');
    const removeCoupon = () => console.log('useCart:removeCoupon');

    return {
      cart: computed(() => factoryParams.cart.value),
      isOnCart,
      addToCart,
      refreshCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      coupon: computed(() => coupon.value),
      applyCoupon,
      removeCoupon,
      loading: computed(() => loading.value)
    };
  };

}
