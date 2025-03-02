import { ShopifyProvider } from '@shopify/hydrogen-react';
import { CountryCode } from '@shopify/hydrogen-react/storefront-api-types';
import { BrowserRouter } from 'react-router';
import { AddDiamond } from './engagement-ring/add-diamond';
import { ReviewCompleteRing } from './engagement-ring/review-complete-ring';
import { SelectDiamond } from './engagement-ring/select-diamond';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN as string;
const SHOPIFY_PUBLIC_STOREFRONT_TOKEN = process.env.SHOPIFY_PUBLIC_STOREFRONT_TOKEN as string; // prettier-ignore
const SHOPIFY_STORE_COUNTRY_CODE = process.env.SHOPIFY_STORE_COUNTRY_CODE as CountryCode; // prettier-ignore
const SHOPIFY_STOREFRONT_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION as string; // prettier-ignore

export function RootComponent({ wrapperSelector, ...rest }: any) {
  console.log(wrapperSelector);
  return (
    <ShopifyProvider
      countryIsoCode={SHOPIFY_STORE_COUNTRY_CODE ?? 'AU'}
      languageIsoCode="EN"
      storefrontToken={SHOPIFY_PUBLIC_STOREFRONT_TOKEN}
      storefrontApiVersion={SHOPIFY_STOREFRONT_API_VERSION}
      storeDomain={SHOPIFY_STORE_DOMAIN}
    >
      <BrowserRouter>
        {wrapperSelector === '.select-diamond' && <SelectDiamond {...rest} />}
        {wrapperSelector === '.add-diamond' && <AddDiamond {...rest} />}
        {wrapperSelector === '.review-complete-ring' && <ReviewCompleteRing {...rest} />}
      </BrowserRouter>
    </ShopifyProvider>
  );
}
