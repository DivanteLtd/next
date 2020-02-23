import { Ref } from '@vue/composition-api';

// ---------------------------------------------------
// UseProduct
// ---------------------------------------------------

export interface UseProduct<PRODUCT> {
  products: Readonly<Ref<Readonly<Array<PRODUCT>>>>;
  search: (params: {
    slug?: string;
    catId?: string | string[];
    sku?: string | string[];
    [x: string]: any;
  }) => Promise<void>;
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

// ---------------------------------------------------
// UseUser
// ---------------------------------------------------

export interface UseUser
<
  USER
> {
  user: Ref<USER>;
  register: (user: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    [x: string]: any;
  }) => Promise<void>;
  login: (user: {
    username: string;
    password: string;
    [x: string]: any;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: Ref<boolean>;
  error: Ref<any>;
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
  appliedFilters: APPLIED_FILTERS;
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
  loading: Ref<boolean>;
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
  BILLING_DETAILS,
  CHOOSEN_PAYMENT_METHOD,
  CHOOSEN_SHIPPING_METHOD,
  PLACE_ORDER,
> {
  paymentMethods: Ref<PAYMENT_METHODS>;
  shippingMethods: Ref<SHIPPING_METHODS>;
  personalDetails: PERSONAL_DETAILS;
  shippingDetails: SHIPPING_DETAILS;
  billingDetails: BILLING_DETAILS;
  chosenPaymentMethod: CHOOSEN_PAYMENT_METHOD;
  chosenShippingMethod: CHOOSEN_SHIPPING_METHOD;
  placeOrder: PLACE_ORDER;
  loading: Ref<boolean>;
  error: any;
}

export interface UseLocale
<
  LOCALE,
  COUNTRY,
  CURRENCY,
  AVAILABLE_LOCALES,
  AVAILABLE_COUNTRIES,
  AVAILABLE_CURRENCIES,
> {
  locale: LOCALE;
  country: COUNTRY;
  currency: CURRENCY;
  availableLocales: AVAILABLE_LOCALES;
  availableCountries: AVAILABLE_COUNTRIES;
  availableCurrencies: AVAILABLE_CURRENCIES;
  loading: Ref<boolean>;
  error: any;
}

export interface UseContent<CONTENT, SEARCH> {
  content: CONTENT;
  search: SEARCH;
  loading: boolean;
  error: any;
}

export interface UiMediaGalleryItem {
  small: string;
  normal: string;
  big: string;
}

export interface UiCategory {
  label: string;
  slug?: string;
  items: UiCategory[];
}

export interface UiCartProductPrice {
  regular: number;
  special?: number;
}

export interface UiCartProduct {
  title: string;
  id: string;
  image: string;
  price: UiCartProductPrice;
  configuration: AgnosticProductAttribute[];
  qty: string;
}

export interface AgnosticProductAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

