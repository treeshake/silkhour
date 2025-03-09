export function createProductGid(id: string | number) {
  return `gid://shopify/Product/${id}`;
}

export function createProductVariantGid(id: string | number) {
  return `gid://shopify/ProductVariant/${id}`;
}
