# Agnostic address type

## Motivation

Sometimes we  need to have access to the address property, such as street name, postcode, country etc.
That is very useful for instance if you want to format these data and display in  the way you want.

```ts
interface AgnosticAddress {
  streetName?: string;
  postcode?: string;
  city?: string:
  streetNumber?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  region?: string;
  title?: string;
}
```

## Migration process

Prety straightforward, there is no address used besides comemrcools orders.
