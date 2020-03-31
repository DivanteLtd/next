# Disabling ssr for composables

Some of composables are loading their state during first call eg. `useCart` or `useUser`. This state needs to be supported by ssr as well, which means we are forced to use `onSSR` inside. By that way there is no possiibility do disable such a state sharing in case when we don't need server-side rendering.

In order to achieve something like this can provide following api:

Composables that are loading their state could get an argument that tells whether you want to support ssr or not.

```js
const { products } = useCart({ ssr: true })
const { products } = useCart() // default false

const { user } = useUser({ ssr: true })
const { user } = useUser() // default false
```