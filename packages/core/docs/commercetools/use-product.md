---
platform: Commercetools
---


<IncludeContent content-key="use-product" />

::: slot search-params
```js
{
  catId?: string | string[];
  skus?: string[];
  slug?: string;
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
}
```
:::

::: slot getters-interfaces
```js
interface ProductGetters {
  getName: (product: ProductVariant) => string;
  getSlug: (product: ProductVariant) => string;
  getPrice: (product: ProductVariant) => AgnosticPrice;
  getGallery: (product: ProductVariant) => AgnosticMediaGalleryItem[];
  getCoverImage: (product: ProductVariant) => string;
  getFiltered: (products: ProductVariant[], filters?: { master?: boolean; attributes?: Record<string, string> }) => ProductVariant[];
  getAttributes: (products: ProductVariant[] | ProductVariant, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getDescription: (product: ProductVariant) => string;
  getCategoryIds: (product: ProductVariant) => string[];
  getId: (product: ProductVariant) => string;
}
```
:::

::: slot getters-import
```js
import { productGetters } from '@vue-storefront/commercetools'

//later in the code
productGetters.getDescription(product)
```
:::

::: slot example-loading
```html
<template>
  <div>
    <div v-if="loading || !products">
      Loading products...
    </div>
    <div v-else>
      <span  v-for="product in products" :key="product.sku">
      {{ product }}
      </span>
    </div>
  </div>
</template>

<script>
import { useProduct } from '@vue-storefront/commercetools'

export default {
  setup (context) {
    const { slug } = context.root.$route.params;
    const { search, loading, products } = useProduct()

    search({ slug })

    return {
      loading,
      products
    }
  }
}
</script>
```
:::
