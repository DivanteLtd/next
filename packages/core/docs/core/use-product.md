# useProduct composable

`useProduct` composition API function is responsible, as it's name suggests for interactions with products from your eCommerce platform. This function returns following values:

- `search` - a main querying function that is used to query products from eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.

<Content slot-key="search-params" />

- `products` - the main data object that contains an array of products fetched by `search` method
- `loading` - a reactive object containing information about the loading state of your `search` method

# Getters

You can use following getters along with `useProduct` main data object (`products`):
<Content slot-key="getters-interfaces" />
To use getters simply import `productGetters` object from the package root:
<Content slot-key="getters-import" />

# Usage examples

- Getting a specific product by its slug
```js
const { products, search } = useProduct()

search({ slug })

const product = computed(() => products.value[0])
```

- Overriding default pagination settings for specific call
```js
const { products, search } = useProduct()

search({ slug, perPage: 50 })
```
- Applying filters

TODO

- Displaying a loading state while products are being fetched
<Content slot-key="example-loading" />
