import getProductApi from './getProduct';
import getCategoryApi from './getCategory';
import addToCartApi from './addToCart';
import removeFromCartApi from './removeFromCart';
import clearCartApi from './clearCart';
import placeOrderApi from './placeOrder';
import getUserApi from './getUser';
import addCouponApi from './addCoupon';
import removeCouponApi from './removeCoupon';
declare function override(overrides: any): void;
declare function setup(newConfig: any): void;
/** just because you can't simply do "export x as y..." */
declare const getProduct: typeof getProductApi;
declare const getCategory: typeof getCategoryApi;
declare const addToCart: typeof addToCartApi;
declare const removeFromCart: typeof removeFromCartApi;
declare const clearCart: typeof clearCartApi;
declare const placeOrder: typeof placeOrderApi;
declare const getUser: typeof getUserApi;
declare const addCoupon: typeof addCouponApi;
declare const removeCoupon: typeof removeCouponApi;
export { getProduct, getCategory, addToCart, removeFromCart, clearCart, placeOrder, getUser, addCoupon, removeCoupon, override, setup };
