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
// // export const cart: Ref<Cart> = ref<Cart>(null);

// export default function useCart(): UseCart {

//   watch(async () => {
//     if (!cart.value && !loading.value) {
//       loading.value = true;
//       cart.value = await loadCurrentCart();
//       loading.value = false;
//     }
//   });

//   const addToCart = async (variant: ProductVariant, quantity: number) => {
//     loading.value = true;
//     const updateResponse = await apiAddToCart(cart.value, variant, quantity);
//     cart.value = updateResponse.data.cart;
//     loading.value = false;
//   };

//   const removeFromCart = async (product: LineItem) => {
//     loading.value = true;
//     const updateResponse = await apiRemoveFromCart(cart.value, product);
//     cart.value = updateResponse.data.cart;
//     loading.value = false;
//   };

//   const updateQuantity = async (product: LineItem, quantity: number) => {
//     if (quantity > 0) {
//       loading.value = true;
//       const updateResponse = await apiUpdateCartQuantity(
//         cart.value,
//         {
//           ...product,
//           quantity
//         }
//       );
//       cart.value = updateResponse.data.cart;
//       loading.value = false;
//     }
//   };

//   const clearCart = () => console.log('useCart:clearCart');
//   const applyCoupon = () => console.log('useCart:applyCoupon');
//   const removeCoupon = () => console.log('useCart:removeCoupon');
//   const refreshCart = async () => console.log('useCart:refreshCart');
//   const changeQuantity = async (product: LineItem, quantity: number) => console.log('useCart:changeQty', product, quantity);
//   const isOnCart = (product: ProductVariant) => {
//     return computed(() => !product);
//   };

//   return {
//     cart: computed(() => cart.value),
//     isOnCart,
//     addToCart,
//     changeQuantity,
//     refreshCart,
//     removeFromCart,
//     clearCart,
//     updateQuantity,
//     coupon: computed(() => coupon.value),
//     applyCoupon,
//     removeCoupon,
//     loading: computed(() => loading.value)
//   };
// }
