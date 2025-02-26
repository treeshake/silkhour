import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const storefrontClient = createStorefrontApiClient({
  // load environment variables according to your framework and runtime
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN as string,
  apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION as string,
  publicAccessToken: process.env.SHOPIFY_PUBLIC_STOREFRONT_TOKEN as string,
});

