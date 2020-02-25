import { UseCart as BaseUseCart, UiCartProduct } from '@vue-storefront/interfaces';
import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity
} from '@vue-storefront/commercetools-api';
import { Ref, ref, watch, computed } from '@vue/composition-api';
import { ProductVariant, Cart } from './../types/GraphQL';
import { enhanceCart } from './../helpers/internals';
import loadCurrentCart from './currentCart';

export const _cart: Ref<Cart> = ref<Cart>(null);
const _coupon = ref(null);
const error = ref(null);
const loading: Ref<boolean> = ref<boolean>(false);

// TODO: Think how to incorporate this into core (updateItem?)
interface UseCart extends BaseUseCart<Cart, ProductVariant, UiCartProduct, any> {
  updateQuantity: (product: UiCartProduct) => void;
}

export default function useCart(): UseCart {

  watch(async () => {
    if (!_cart.value && !loading.value) {
      loading.value = true;
      _cart.value = await loadCurrentCart();
      loading.value = false;
    }
  });

  const addToCart = async (variant: ProductVariant, quantity: number) => {
    loading.value = true;
    const updateResponse = await apiAddToCart(_cart.value, variant, quantity);
    _cart.value = enhanceCart(updateResponse).data.cart;
    loading.value = false;
  };

  const removeFromCart = async (product: UiCartProduct) => {
    loading.value = true;
    const updateResponse = await apiRemoveFromCart(_cart.value, product);
    _cart.value = enhanceCart(updateResponse).data.cart;
    loading.value = false;
  };

  const updateQuantity = async (product: UiCartProduct) => {
    if (parseInt(product.qty) > 0) {
      loading.value = true;
      const updateResponse = await apiUpdateCartQuantity(_cart.value, product);
      _cart.value = enhanceCart(updateResponse).data.cart;
      loading.value = false;
    }
  };

  const clearCart = () => console.log('useCart:clearCart');
  const applyCoupon = () => console.log('useCart:applyCoupon');
  const removeCoupon = () => console.log('useCart:removeCoupon');

  const cart = computed(() => _cart.value);
  const coupon = computed(() => _coupon.value);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    coupon,
    applyCoupon,
    removeCoupon,
    loading,
    error
  };
}
