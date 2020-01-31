import { Ref } from '@vue/composition-api'

export interface UseProduct<PRODUCT, SEARCH> {
  products: Ref<Array<PRODUCT>>;
  search: SEARCH,
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

export interface UseCategory
<
  CATEGORY,
  SEARCH,
  APPLIED_FILTERS,
  APPLY_FILTER,
  CLEAR_FILTERS,
> {
  categories: Ref<Array<CATEGORY>>;
  search: SEARCH;
  appliedFilters: Ref<APPLIED_FILTERS>;
  applyFilter: APPLY_FILTER;
  clearFilters: CLEAR_FILTERS;
  loading: Ref<boolean>;
  error: Ref<any>;
}

export interface UseCart
<
  CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  COUPON,
  APPLY_COUPON,
  REMOVE_COUPON,
> {
  cart: CART;
  addToCart: ADD_TO_CART;
  removeFromCart: REMOVE_FROM_CART;
  clearCart: CLEAR_CART;
  coupon: COUPON;
  applyCoupon: APPLY_COUPON;
  removeCoupon: REMOVE_COUPON;
  loading: Ref<boolean>;
  error: any;
}

export interface UseWishlist
<
  WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
> {
  wishlist: WISHLIST;
  addToWishlist: ADD_TO_WISHLIST;
  removeFromWishlist: REMOVE_FROM_WISHLIST;
  clearWishlist: CLEAR_WISHLIST;
  loading: boolean;
  error: any;
}

export interface UseCompare
<
  COMPARE,
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  CLEAR_COMPARE,
> {
  compare: COMPARE;
  addToCompare: ADD_TO_COMPARE;
  removeFromCompare: REMOVE_FROM_COMPARE;
  clearCompare: CLEAR_COMPARE;
  loading: boolean;
  error: any;
}

export interface UseCheckout
<
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  PERSONAL_DETAILS,
  SHIPPING_DETAILS,
  CHOOSEN_PAYMENT_METHOD,
  CHOOSEN_SHIPPING_METHOD,
  SET_PERSONAL_DETAILS,
  SET_PAYMENT_METHOD,
  SET_SHIPPING_METHOD,
  PLACE_ORDER,
> {
  paymentMethods: PAYMENT_METHODS
  shippingMethods: SHIPPING_METHODS
  personalDetails: PERSONAL_DETAILS
  shippingDetails: SHIPPING_DETAILS
  choosenPaymentMethod: CHOOSEN_PAYMENT_METHOD
  choosenShippingMethod: CHOOSEN_SHIPPING_METHOD
  setPersonalDetails: SET_PERSONAL_DETAILS
  setPaymentMethod: SET_PAYMENT_METHOD
  setShippingMethod: SET_SHIPPING_METHOD
  placeOrder: PLACE_ORDER
  loading: Ref<boolean>
  error: any;
}

export interface UseContent<CONTENT, SEARCH> {
  content: CONTENT,
  search: SEARCH,
  loading: boolean,
  error: any
}

export interface UseLocale<SET_LANGUAGE, GET_LANGUAGE, SET_COUNTRY, GET_COUNTRY, GET_COUNTRIES> {
  setLanguage: SET_LANGUAGE,
  getLanguage: GET_LANGUAGE,
  setCountry: SET_COUNTRY,
  getCountry: GET_COUNTRY,
  getCountries: GET_COUNTRIES
}

export interface UiMediaGalleryItem {
  small: string
  normal: string
  big: string
}

export interface UiCategory {
  label: string
  slug?: string
  items: UiCategory[]
}

export interface UiCartProductConfiguration {
  name: string
  value: string
}

export interface UiCartProductPrice {
  regular: number
}

export interface UiCartProduct {
  title: string
  id: string
  image: string
  price: UiCartProductPrice
  configuration: UiCartProductConfiguration[]
  qty: string
}

export interface AgnosticProductAttribute {
  name: string,
  value: string | Object
  label: string
}