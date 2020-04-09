import {
  getOrderDate,
  getOrderId,
  getOrderNumber,
  getOrderStatus,
  getOrderPrice,
  getOrderItems,
  getOrderNetValue,
  getOrderGrossValue,
  getOrderTaxes,
  getOrderTaxName,
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
        name: '15% incl.',
        amount: generatePrice(3333),
        rate: 0.15
      },
      {
        name: '25% incl.',
        amount: generatePrice(4444),
        rate: 0.25
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
    expect(getOrderNumber(null as any)).toEqual('');
  });

  it('returns status', () => {
    expect(getOrderStatus(order)).toEqual(OrderState.Complete);
  });

  it('returns total gross', () => {
    expect(getOrderPrice(order)).toEqual(123.45);
  });

  it('returns net value', () => {
    expect(getOrderNetValue(order)).toEqual(11.11);
    expect(getOrderNetValue(null as any)).toBeNull();
  });

  it('returns gross value', () => {
    expect(getOrderGrossValue(order)).toEqual(22.22);
    expect(getOrderGrossValue(null as any)).toBeNull();
  });

  it('returns taxes', () => {
    expect(getOrderTaxes(order)).toHaveLength(2);
    expect(getOrderTaxes(null as any)).toHaveLength(0);
  });

  it('returns taxes names', () => {
    const taxes = getOrderTaxes(order);

    expect(getOrderTaxName(taxes[0])).toEqual('15% incl.');
    expect(getOrderTaxName(taxes[1])).toEqual('25% incl.');
    expect(getOrderTaxName({} as any)).toEqual('');
  });

  it('returns tax value', () => {
    const taxes = getOrderTaxes(order);

    expect(getOrderTaxValue(taxes[0])).toEqual(33.33);
    expect(getOrderTaxValue(taxes[1])).toEqual(44.44);
    expect(getOrderTaxValue({} as any)).toBe(null);
  });

  it('returns tax rate', () => {
    const taxes = getOrderTaxes(order);

    expect(getOrderTaxRate(taxes[0])).toEqual(15);
    expect(getOrderTaxRate(taxes[1])).toEqual(25);
    expect(getOrderTaxRate({} as any)).toEqual(0);
  });

  it('returns billing address', () => {
    const address = getOrderBillingAddress(order);

    expect(Object.keys(address)).toHaveLength(4);
    expect(address.id).toEqual('1234');
    expect(address.firstName).toEqual('Vue');
    expect(address.lastName).toEqual('Developer');
    expect(address.__typename).toEqual('Address');
    expect(getOrderBillingAddress(null as any)).toBeNull();
  });

  it('returns shipping address', () => {
    const address = getOrderShippingAddress(order);

    expect(Object.keys(address)).toHaveLength(4);
    expect(address.id).toEqual('5678');
    expect(address.firstName).toEqual('Java');
    expect(address.lastName).toEqual('Script');
    expect(address.__typename).toEqual('Address');
    expect(getOrderShippingAddress(null as any)).toBeNull();
  });

  it('returns transformed billing address values', () => {
    const values = getOrderBillingAddressValues(order);

    expect(Array.isArray(values)).toBeTruthy();
    expect(values).toHaveLength(2);
    expect(values[0].property).toEqual('First Name');
    expect(values[1].property).toEqual('Last Name');
    expect(values[0].value).toEqual('Vue');
    expect(values[1].value).toEqual('Developer');
    expect(getOrderBillingAddressValues({} as any)).toHaveLength(0);
  });

  it('returns transformed shipping address values', () => {
    const values = getOrderShippingAddressValues(order);

    expect(Array.isArray(values)).toBeTruthy();
    expect(values).toHaveLength(2);
    expect(values[0].property).toEqual('First Name');
    expect(values[1].property).toEqual('Last Name');
    expect(values[0].value).toEqual('Java');
    expect(values[1].value).toEqual('Script');
    expect(getOrderShippingAddressValues({} as any)).toHaveLength(0);
  });

  it('returns line items', () => {
    const items = getOrderItems(order);

    expect(Array.isArray(items)).toBeTruthy();
    expect(items).toHaveLength(2);
    expect(items[0].id).toEqual('product-1');
    expect(items[1].id).toEqual('product-2');
    expect(getOrderItems(null as any)).toHaveLength(0);
  });
});
