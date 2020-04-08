import {
  getOrderDate,
  getOrderId,
  getOrderNumber,
  getOrderStatus,
  getOrderPrice,
  getOrderItems,
  getOrderNetValue,
  getOrderGrossValue,
  getOrderTaxValue,
  getOrderTaxRate,
  getOrderBillingAddress,
  getOrderShippingAddress,
  getOrderBillingAddressValues,
  getOrderShippingAddressValues
} from './../../src/getters/orderGetters';
import { OrderState, Order } from './../../src/types/GraphQL';

const generatePrice = (centAmount: number) => ({
  centAmount,
  currencyCode: 'USD'
});

const order: Order = Object.freeze({
  createdAt: 123456789,
  id: '645ygdf',
  orderNumber: 'abcdef',
  orderState: OrderState.Complete,
  totalPrice: generatePrice(12345),
  taxedPrice: {
    totalNet: generatePrice(1111),
    totalGross: generatePrice(2222),
    taxPortions: [
      {
        amount: generatePrice(3333),
        rate: 0.15
      }
    ]
  },
  billingAddress: {
    id: '1234',
    firstName: 'Vue',
    lastName: 'Developer',
    __typename: 'Address'
  },
  shippingAddress: {
    id: '5678',
    firstName: 'Java',
    lastName: 'Script',
    __typename: 'Address'
  },
  lineItems: [
    {
      id: 'product-1'
    },
    {
      id: 'product-2'
    }
  ]
}) as any;

describe('[commercetools-getters] order getters', () => {
  it('returns default values', () => {
    expect(getOrderDate(null)).toBe('');
    expect(getOrderId(null)).toBe('');
    expect(getOrderStatus(null)).toBe('');
    expect(getOrderPrice(null)).toBe(null);
  });

  it('returns date', () => {
    expect(getOrderDate(order)).toEqual(123456789);
  });

  it('returns order id', () => {
    expect(getOrderId(order)).toEqual('645ygdf');
  });

  it('returns order number', () => {
    const orderWithoutNumber = {
      id: 'just-id'
    } as Order;

    expect(getOrderNumber(order)).toEqual('abcdef');
    expect(getOrderNumber(orderWithoutNumber)).toEqual('just-id');
  });

  it('returns status', () => {
    expect(getOrderStatus(order)).toEqual(OrderState.Complete);
  });

  it('returns total gross', () => {
    expect(getOrderPrice(order)).toEqual(123.45);
  });

  it('returns net value', () => {
    expect(getOrderNetValue(order)).toEqual(11.11);
  });

  it('returns gross value', () => {
    expect(getOrderGrossValue(order)).toEqual(22.22);
  });

  it('returns tax value', () => {
    expect(getOrderTaxValue(order)).toEqual(33.33);
  });

  it('returns tax rate', () => {
    expect(getOrderTaxRate(order)).toEqual(15);
  });

  it('returns billing address', () => {
    const orderWithoutAddress = {} as Order;
    const address = getOrderBillingAddress(order);

    expect(Object.keys(address)).toHaveLength(4);
    expect(address.id).toEqual('1234');
    expect(address.firstName).toEqual('Vue');
    expect(address.lastName).toEqual('Developer');
    expect(address.__typename).toEqual('Address');
    expect(getOrderBillingAddress(orderWithoutAddress)).toBeNull();
  });

  it('returns shipping address', () => {
    const orderWithoutAddress = {} as Order;
    const address = getOrderShippingAddress(order);

    expect(Object.keys(address)).toHaveLength(4);
    expect(address.id).toEqual('5678');
    expect(address.firstName).toEqual('Java');
    expect(address.lastName).toEqual('Script');
    expect(address.__typename).toEqual('Address');
    expect(getOrderShippingAddress(orderWithoutAddress)).toBeNull();
  });

  it('returns transformed billing address values', () => {
    const values = getOrderBillingAddressValues(order);

    expect(Array.isArray(values)).toBeTruthy();
    expect(values).toHaveLength(2);
    expect(values[0].property).toEqual('First Name');
    expect(values[1].property).toEqual('Last Name');
    expect(values[0].value).toEqual('Vue');
    expect(values[1].value).toEqual('Developer');
  });

  it('returns transformed shipping address values', () => {
    const values = getOrderShippingAddressValues(order);

    expect(Array.isArray(values)).toBeTruthy();
    expect(values).toHaveLength(2);
    expect(values[0].property).toEqual('First Name');
    expect(values[1].property).toEqual('Last Name');
    expect(values[0].value).toEqual('Java');
    expect(values[1].value).toEqual('Script');
  });

  it('returns line items', () => {
    const items = getOrderItems(order);

    expect(Array.isArray(items)).toBeTruthy();
    expect(items).toHaveLength(2);
    expect(items[0].id).toEqual('product-1');
    expect(items[1].id).toEqual('product-2');
  });
});
