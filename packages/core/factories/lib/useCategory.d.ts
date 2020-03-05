import { UseCategory } from '@vue-storefront/interfaces';
export declare type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> = {
    categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS) => Promise<CATEGORY[]>;
};
export declare function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>): (id: string) => UseCategory<CATEGORY>;
