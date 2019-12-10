interface ProductSearchVariables {
  where?: string
  sort?: string[]
  limit?: number
  offset?: number
  skus?: string[]
  locale?: string,
  currency?: string
}

interface ProductSearch {
  variables?: ProductSearchVariables
  customQuery?: string
}

export { ProductSearch }
