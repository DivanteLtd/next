import { UseCart } from '@vue-storefront/interfaces';
import { Ref } from '@vue/composition-api';
export declare type UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON> = {
    cart: Ref<CART>;
    loadCart: () => Promise<CART>;
    addToCart: (currentCart: CART, product: PRODUCT, quantity: any) => Promise<CART>;
    removeFromCart: (currentCart: CART, product: CART_ITEM) => Promise<CART>;
    updateQuantity: (currentCart: CART, product: CART_ITEM, quantity: number) => Promise<CART>;
    clearCart: (currentCart: CART) => Promise<CART>;
    applyCoupon: (currentCart: CART, coupon: string) => Promise<{
        cart: CART;
        coupon: COUPON;
    }>;
    removeCoupon: (currenCart: CART) => Promise<CART>;
    isOnCart: (currentCart: CART, product: PRODUCT) => boolean;
};
export declare function useCartFactory<CART, CART_ITEM, PRODUCT, COUPON>(factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>): () => UseCart<CART, CART_ITEM, PRODUCT, COUPON>;
