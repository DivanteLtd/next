# Extending agnostic price

## Motivation

There is no way to display proper price or part of the price with the current AgnosticPrice type.

I suggest to extend that type with  additional fields:

```ts
interface AgnosticPrice  {
  regular: string;  // original price, formatted (currency sign and format), taxes applied
  special?: string; // special price (discounted/sale), formatted (currency sign and format), taxes applied
  tax?: string; // tax value, formatted (currency sign and format)
  regularWithoutTax?: string; // original price, formatted (currency sign and format), taxes NOT applied
  specialWithoutTax?: string; // special price (discounted/sale), formatted (currency sign and format), taxes NOT applied
  sale?: boolean; // flag that tells you if price is sale, (useful for displaying sale flag)
}
```

other solution:


```ts
interface AgnosticPrice  {
  taxed: {
    regular: string;
    special?: string;
  },
  origin: {
    regular: string;
    special?: string;
  }
  sale?: boolean;
}
```

## Migration process

Replace displaying price in whole default theme (not even implemented yet).
