import { Metaobject, Product } from '@shopify/hydrogen-react/storefront-api-types';

export function createProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

export function createProductVariantGid(id: string | number) {
  return `gid://shopify/ProductVariant/${id}`;
}

export function createCartGid(id: string | number) {
  return `gid://shopify/Cart/${id}`;
}

export function extractMetafieldValue(product: Product | null, key: string, fieldKey: string) {
  return (product?.metafields?.find((metafield) => metafield?.key === key)?.reference as Metaobject)?.fields?.find(
    (field) => field.key === fieldKey,
  )?.value;
}
