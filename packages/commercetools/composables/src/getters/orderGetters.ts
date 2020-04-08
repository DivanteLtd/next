import { UserOrderGetters, AgnosticOrderStatus } from '@vue-storefront/interfaces';
import { Order, OrderState, LineItem, Money, Address } from './../types/GraphQL';

export const getOrderDate = (order: Order): string => order?.createdAt || '';

export const getOrderId = (order: Order): string => order?.id || '';

export const getOrderNumber = (order: Order): string => order?.orderNumber || getOrderId(order);

const orderStatusMap = {
  [OrderState.Open]: AgnosticOrderStatus.Open,
  [OrderState.Confirmed]: AgnosticOrderStatus.Confirmed,
  [OrderState.Complete]: AgnosticOrderStatus.Complete,
  [OrderState.Cancelled]: AgnosticOrderStatus.Cancelled
};

const getPrice = (money: Money): number | null => money && money.centAmount ? money.centAmount / 100 : null;

export const getOrderStatus = (order: Order): AgnosticOrderStatus | '' => order?.orderState ? orderStatusMap[order.orderState] : '';

export const getOrderItems = (order: Order): LineItem[] => order?.lineItems || [];

export const getOrderPrice = (order: Order): number | null => getPrice(order?.totalPrice);

export const getOrderNetValue = (order: Order): number | null => getPrice(order?.taxedPrice?.totalNet);

export const getOrderGrossValue = (order: Order): number | null => getPrice(order?.taxedPrice?.totalGross);

export const getOrderTaxValue = (order: Order): number | null => getPrice(order?.taxedPrice?.taxPortions[0]?.amount);

export const getOrderTaxRate = (order: Order): number => (order?.taxedPrice?.taxPortions[0]?.rate || 0) * 100;

export const getOrderBillingAddress = (order: Order): Address | null => order?.billingAddress || null;

export const getOrderShippingAddress = (order: Order): Address | null => order?.shippingAddress || null;

type KeyValueAddress = { property: string; value: string }[];

const transformAddressToArray = (address: Address | object): KeyValueAddress => Object.entries(address)
  .filter(([property, value]) => value !== null && !['id', '__typename'].includes(property))
  .map(([property, value]) => ({
    property: (property || '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase()),
    value
  }));

export const getOrderBillingAddressValues = (order: Order): KeyValueAddress => transformAddressToArray(getOrderBillingAddress(order) || {});

export const getOrderShippingAddressValues = (order: Order): KeyValueAddress => transformAddressToArray(getOrderShippingAddress(order) || {});

const orderGetters: UserOrderGetters<Order> = {
  getDate: getOrderDate,
  getId: getOrderId,
  getNumber: getOrderNumber,
  getStatus: getOrderStatus,
  getPrice: getOrderPrice,
  getItems: getOrderItems,
  getNetValue: getOrderNetValue,
  getGrossValue: getOrderGrossValue,
  getTaxValue: getOrderTaxValue,
  getTaxRate: getOrderTaxRate,
  getBillingAddress: getOrderBillingAddress,
  getShippingAddress: getOrderShippingAddress,
  getBillingAddressValues: getOrderBillingAddressValues,
  getShippingAddressValues: getOrderShippingAddressValues
};

export default orderGetters;
