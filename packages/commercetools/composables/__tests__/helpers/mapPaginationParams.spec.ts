import mapPaginationParams from '../../src/helpers/mapPaginationParams';

jest.mock('@vue-storefront/commercetools-api', () => ({
  pagination: {
    global: { pageSize: 20 },
    products: { pageSize: 30 }
  }
}));

describe('[commercetools-composables] mapPaginationParams', () => {
  it('maps pagination params to format expected by CT gql API', () => {
    const input = { perPage: 20, page: 3 };
    expect(mapPaginationParams(input)).toEqual({ limit: 20, offset: 40 });
  });

  it('returns zero offset when page number is missing', () => {
    const input = { perPage: 2 };
    expect(mapPaginationParams(input)).toEqual({ limit: 2, offset: 0 });
  });

  it('returns default limit when page size is missing', () => {
    const input = { page: 2 };
    expect(mapPaginationParams(input)).toEqual({ limit: 20, offset: 20 });
  });

  it('returns default page size for given context', () => {
    const input = { page: 3 };
    expect(mapPaginationParams(input, 'products')).toEqual({ limit: 30, offset: 60 });
  });
});
