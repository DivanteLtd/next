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

const getPrice = (money: Money): number | null => money?.centAmount ? money.centAmount / 100 : null;

export const getOrderStatus = (order: Order): AgnosticOrderStatus | '' => order?.orderState ? orderStatusMap[order.orderState] : '';

export const getOrderItems = (order: Order): LineItem[] => order?.lineItems || [];

export const getOrderPrice = (order: Order): number | null => getPrice(order?.totalPrice);

const transformAddressToString = (address: Address | object): string => Object.entries(address)
  .filter(([property, value]) => value !== null && !['id', '__typename'].includes(property))
  .map(([property, value]) => (
    `${property.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}: ${value}`
  ))
  .join(', ');

export const getOrderBillingAddress = (order: Order): string => transformAddressToString(order?.billingAddress || {});

export const getOrderShippingAddress = (order: Order): string => transformAddressToString(order?.shippingAddress || {});

const orderGetters: UserOrderGetters<Order> = {
  getDate: getOrderDate,
  getId: getOrderId,
  getNumber: getOrderNumber,
  getStatus: getOrderStatus,
  getPrice: getOrderPrice,
  getItems: getOrderItems,
  getBillingAddress: getOrderBillingAddress,
  getShippingAddress: getOrderShippingAddress
};

export default orderGetters;
