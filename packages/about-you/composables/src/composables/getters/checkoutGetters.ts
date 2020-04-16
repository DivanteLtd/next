/* istanbul ignore file */

import { CheckoutGetters} from '@vue-storefront/core';
import { ShippingMethod } from '@vue-storefront/boilerplate-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodId = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodName = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number) => String(price);

const checkoutGetters: CheckoutGetters<ShippingMethod> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getShippingMethodPrice,
  getFormattedPrice
};

export default checkoutGetters;
