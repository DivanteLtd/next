import { Ref } from '@vue/composition-api';

export type ComputedProperty<T> = Readonly<Ref<Readonly<T>>>;

export interface UseProduct<PRODUCT> {
  products: ComputedProperty<PRODUCT[]>;
  totalProducts: ComputedProperty<number>;
  search: (params: {
    perPage?: number;
    page?: number;
    sort?: any;
    term?: any;
    filters?: any;
    [x: string]: any;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  [x: string]: any;
}

export interface UseUser
<
  USER,
  UPDATE_USER_PARAMS
> {
  user: ComputedProperty<USER>;
  updatePersonalDetails: (params: UPDATE_USER_PARAMS) => Promise<void>;
  updateUser: (data: USER) => void;
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
  changePassword: (
    currentPassword: string,
    newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: ComputedProperty<boolean>;
}

export interface UseUserOrders<ORDER> {
  orders: ComputedProperty<ORDER[]>;
  totalOrders: ComputedProperty<number>;
  searchOrders: (params?: {
    id?: any;
    page?: number;
    perPage?: number;
    [x: string]: any;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export type UserAddressType = 'billing' | 'shipping';

/** check if we always have those addresses together or we need pagination  */
export interface UseUserAddress<ADDRESS, ADDRESS_TYPE = UserAddressType, SEARCH_PARAMS = { [x: string]: any; }> {
  addresses: ComputedProperty<ADDRESS[]>;
  totalAddresses: ComputedProperty<number>;
  addAddress: (address: ADDRESS, type: ADDRESS_TYPE) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  deleteAddress: (address: ADDRESS) => Promise<void>;
  getBillingAddresses: () => ADDRESS[];
  getShippingAddresses: () => ADDRESS[];
  searchAddresses: (params?: SEARCH_PARAMS) => Promise<void>;
  loading: Ref<boolean>;
}

export interface UseCategory
<
  CATEGORY
> {
  categories: ComputedProperty<CATEGORY[]>;
  search: (params: {
    [x: string]: any;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseCart
<
  CART,
  CART_ITEM,
  PRODUCT,
  COUPON
> {
  cart: ComputedProperty<CART>;
  addToCart: (product: PRODUCT, quantity: number) => Promise<void>;
  isOnCart: (product: PRODUCT) => boolean;
  removeFromCart: (product: CART_ITEM,) => Promise<void>;
  updateQuantity: (product: CART_ITEM, quantity?: number) => Promise<void>;
  clearCart: () => Promise<void>;
  coupon: ComputedProperty<COUPON | null>;
  applyCoupon: (coupon: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  refreshCart: () => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseWishlist
<
  WISHLIST,
  PRODUCT,
  WISHLIST_ITEM,
> {
  wishlist: ComputedProperty<WISHLIST>;
  addToWishlist: (product: PRODUCT, quantity: number) => Promise<void>;
  isOnWishlist: (product: PRODUCT) => ComputedProperty<boolean>;
  removeFromWishlist: (product: WISHLIST_ITEM) => Promise<void>;
  clearWishlist: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
  loading: ComputedProperty<boolean>;
}
export interface UseCompare<PRODUCT> {
  compare: ComputedProperty<PRODUCT[]>;
  addToCompare: (product: PRODUCT) => Promise<void>;
  removeFromCompare: (product: PRODUCT) => Promise<void>;
  clearCompare: () => Promise<void>;
  loading: ComputedProperty<boolean>;
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
  loading: ComputedProperty<boolean>;
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
  loading: ComputedProperty<boolean>;
}

export interface ProductGetters<PRODUCT, PRODUCT_FILTER> {
  getName: (product: PRODUCT) => string;
  getSlug: (product: PRODUCT) => string;
  getPrice: (product: PRODUCT) => AgnosticPrice;
  getGallery: (product: PRODUCT) => AgnosticMediaGalleryItem[];
  getCoverImage: (product: PRODUCT) => string;
  getFiltered: (products: PRODUCT[], filters?: PRODUCT_FILTER) =>
    PRODUCT[];
  getAttributes: (products: PRODUCT[] | PRODUCT, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getDescription: (product: PRODUCT) => string;
  getCategoryIds: (product: PRODUCT) => string[];
  getId: (product: PRODUCT) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface CartGetters<CART, CART_ITEM> {
  getItems: (cart: CART) => CART_ITEM[];
  getItemName: (cartItem: CART_ITEM) => string;
  getItemImage: (cartItem: CART_ITEM) => string;
  getItemPrice: (cartItem: CART_ITEM) => AgnosticPrice;
  getItemQty: (cartItem: CART_ITEM) => number;
  getItemAttributes: (cartItem: CART_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (cartItem: CART_ITEM) => string;
  getTotals: (cart: CART) => AgnosticTotals;
  getShippingPrice: (cart: CART) => number;
  getTotalItems: (cart: CART) => number;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface CategoryGetters<CATEGORY> {
  getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface UserGetters<USER> {
  getFirstName: (customer: USER) => string;
  getLastName: (customer: USER) => string;
  getFullName: (customer: USER) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface CheckoutGetters<SHIPPING_METHOD> {
  getShippingMethodId: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodName: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodDescription: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodPrice: (shippingMethod: SHIPPING_METHOD) => number;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface UserOrderGetters<ORDER> {
  getDate: (order: ORDER) => string;
  getId: (order: ORDER) => string;
  getStatus: (order: ORDER) => string;
  getPrice: (order: ORDER) => number;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface AgnosticMediaGalleryItem {
  small: string;
  normal: string;
  big: string;
}

export interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  [x: string]: unknown;
}

export interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

export interface AgnosticTotals {
  total: number;
  subtotal: number;
  [x: string]: unknown;
}

export interface AgnosticAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

export interface AgnosticProductReview {
  id: string;
  author: string;
  date: Date;
  message: string | null;
  rating: number | null;
}

export interface SearchResult<T> {
  data: T[];
  total: number;
}

// TODO - remove this interface
export enum AgnosticOrderStatus {
  Open = 'Open',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded'
}
