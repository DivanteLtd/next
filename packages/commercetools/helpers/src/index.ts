import { UiMediaGalleryItem, UiCategory } from '@vue-storefront/interfaces'
import { ProductVariant, Image, Category } from './types/GraphQL'

// Product
export const getProductName = (product: ProductVariant): string => product ? (product as any)._name : ''

export const getProductSlug = (product: ProductVariant): string => product ? (product as any)._slug : ''

export const getProductPrice = (product: ProductVariant): number | null => product ? product.price.value.centAmount / 100 : null

export const getProductGallery = (product: ProductVariant): UiMediaGalleryItem[] =>
  (product ? product.images : [])
  .map((image: Image) => ({
    small: image.url,
    big: image.url,
    normal: image.url
  }))

export const getProductVariants = (products: ProductVariant[], options: any = {}): ProductVariant | ProductVariant[]  => {
  if (!products) {
    return []
  }

  if (options.master) {
    return products.find(product => (product as any)._master)
  }

  return products
}

// Category
export const getCategoryProducts = (category: Category, options: any = {}): ProductVariant[] => {
  if (!category || !(category as any)._products) {
    return []
  }

  const { _products } = category as any

  if (options.master) {
    return _products.filter(v => (v as any)._master)
  }

  return _products
}

export const getCategoryTree = (category: Category): UiCategory | null => {
  const getRoot = (category: Category): Category => (category.parent ? getRoot(category.parent) : category)
  const buildTree = (rootCategory: Category) => ({
    label: rootCategory.name,
    slug: rootCategory.slug,
    items: rootCategory.children.map(buildTree)
  })

  if (!category) {
    return null
  }

  return buildTree(getRoot(category))
}
