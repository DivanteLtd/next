import { UseCart } from '@vue-storefront/interfaces';
import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { useCartFactory, UseCartFactoryParams} from '@vue-storefront/factories';
import { ref, Ref } from '@vue/composition-api';

export const cart: Ref<Cart> = ref(null);

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, any> = {
  cart,
  loadCart: async () => {
    return await loadCurrentCart();
  },
  addToCart: async (currentCart: Cart, product: ProductVariant, quantity: any) => {
    const updatedCart = await apiAddToCart(currentCart, product, quantity);
    return updatedCart.data.cart;
  },
  removeFromCart: async (currentCart: Cart, product: LineItem) => {
    const updateResponse = await apiRemoveFromCart(currentCart, product);
    return updateResponse.data.cart;
  },
  updateQuantity: async (currentCart: Cart, product: LineItem, quantity: number) => {
    const updatedCart = await apiUpdateCartQuantity(
      currentCart, { ...product, quantity }
    );
    return updatedCart.data.cart;
  },
  clearCart: async (currentCart: Cart) => {
    return currentCart;
  },
  applyCoupon: async (currentCart: Cart, coupon: string) => {
    return { cart: currentCart, coupon };
  },
  removeCoupon: async (currenCart: Cart) => {
    return currenCart;
  },
  isOnCart: (currentCart: Cart) => {
    console.log('Mocked isOnCart', currentCart);
    return true;
  }
};

const useCart: () => UseCart<Cart, LineItem, ProductVariant, any> = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export default useCart;
