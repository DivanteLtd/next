import { BaseSearch } from '@vue-storefront/commercetools-api/lib/types/Api';
import { pagination } from '@vue-storefront/commercetools-api';

type PaginationArea = 'products' | 'orders';

export default ({ page, perPage }: {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  [x: string]: any;
}, paginationArea?: PaginationArea): Pick<BaseSearch, 'limit' | 'offset'> | undefined => {
  const limit = perPage || pagination[paginationArea]?.pageSize || pagination.global.pageSize;
  return {
    limit,
    offset: page ? ((page - 1) * limit) : 0
  };
};
