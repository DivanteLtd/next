import { AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';
import { ProductVariant, ProductPrice, DiscountedProductPriceValue, LineItem } from './../types/GraphQL';
import { locale, currency, country } from '@vue-storefront/commercetools-api';

const getAttributeValue = (attribute) => {
  switch (attribute.__typename) {
    case 'StringAttribute':
      return attribute.stringValue;
    case 'DateAttribute':
      return attribute.dateValue;
    case 'DateTimeAttribute':
      return attribute.dateTimeValue;
    case 'TimeAttribute':
      return attribute.timeValue;
    case 'NumberAttribute':
      return attribute.numberValue;
    case 'EnumAttribute':
      return attribute.label;
    case 'LocalizedEnumAttribute':
      return attribute.localizedLabel;
    case 'LocalizedStringAttribute':
      return attribute.localizedString;
    case 'MoneyAttribute':
      return attribute.centAmount;
    case 'BooleanAttribute':
      return attribute.booleanValue;
    case 'ReferenceAttribute':
      return { typeId: attribute.typeId,
        id: attribute.id };
    default:
      return null;
  }
};

export const formatAttributeList = (attributes: Array<any>): AgnosticAttribute[] =>
  attributes.map((attr) => {
    const attrValue = getAttributeValue(attr);
    return {
      name: attr.name,
      value: attrValue,
      label: attr.label ? attr.label : (typeof attrValue === 'string') ? attrValue : null
    };
  });

export const getVariantByAttributes = (products: ProductVariant[] | Readonly<ProductVariant[]>, attributes: any): ProductVariant => {
  if (!products || products.length === 0) {
    return null;
  }

  const configurationKeys = Object.keys(attributes);

  return products.find((product) => {
    const currentAttributes = formatAttributeList(product.attributeList);

    return configurationKeys.every((attrName) =>
      currentAttributes.find(({ name, value }) => attrName === name && attributes[attrName] === value)
    );
  });
};

const getPrice = (price: ProductPrice | DiscountedProductPriceValue) => price ? price.value.centAmount / 100 : null;
const getDiscount = (product: ProductVariant | LineItem) => product.price?.discounted;

export const createPrice = (product: ProductVariant | LineItem): AgnosticPrice => {
  if (!product) {
    return { regular: null, special: null };
  }

  const discount = getDiscount(product);
  const regularPrice = getPrice(product.price);
  const specialPrice = discount?.discount.isActive ? getPrice(discount) : null;

  return {
    regular: regularPrice,
    special: specialPrice
  };
};

export const createFormatPrice = (price: number) => {
  if (!price) {
    return null;
  }

  return new Intl.NumberFormat(`${locale}-${country}`, { style: 'currency', currency }).format(price);
};
