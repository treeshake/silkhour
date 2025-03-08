import { ShopifyProvider } from '@shopify/hydrogen-react';
import { CountryCode } from '@shopify/hydrogen-react/storefront-api-types';
import { BrowserRouter } from 'react-router';
import { AddDiamond } from './engagement-ring/add-diamond';
import { ReviewEngagementRing } from './engagement-ring/review-engagement-ring';
import { RingBuilderSubscriber } from './engagement-ring/ring-builder-subscriber';
import { SelectDiamond } from './engagement-ring/select-diamond';
import { Pagination } from './pagination';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN as string;
const SHOPIFY_PUBLIC_STOREFRONT_TOKEN = process.env.SHOPIFY_PUBLIC_STOREFRONT_TOKEN as string; // prettier-ignore
const SHOPIFY_STORE_COUNTRY_CODE = process.env.SHOPIFY_STORE_COUNTRY_CODE as CountryCode; // prettier-ignore
const SHOPIFY_STOREFRONT_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION as string; // prettier-ignore

export function RootComponent({ wrapperSelector, ...rest }: any) {
  return (
    <ShopifyProvider
      countryIsoCode={SHOPIFY_STORE_COUNTRY_CODE ?? 'AU'}
      languageIsoCode="EN"
      storefrontToken={SHOPIFY_PUBLIC_STOREFRONT_TOKEN}
      storefrontApiVersion={SHOPIFY_STOREFRONT_API_VERSION}
      storeDomain={SHOPIFY_STORE_DOMAIN}
    >
      <BrowserRouter>
        {wrapperSelector === '.react-pagination' && <Pagination {...rest} />}
        {wrapperSelector === '.react-ring-builder-subscriber' && <RingBuilderSubscriber {...rest} />}
        {wrapperSelector === '.react-select-diamond' && <SelectDiamond {...rest} />}
        {wrapperSelector === '.react-add-diamond' && <AddDiamond {...rest} />}
        {wrapperSelector === '.react-review-complete-ring' && <ReviewEngagementRing {...rest} />}
      </BrowserRouter>
    </ShopifyProvider>
  );
}
