import { ShopifyProvider } from '@shopify/hydrogen-react';
import { CountryCode } from '@shopify/hydrogen-react/storefront-api-types';
import { StrictMode } from 'react';
import { AddDiamond } from './engagement-ring/add-diamond';
import { CompleteYourRingMediaGallery } from './engagement-ring/media-gallery';
import { SelectDiamond } from './engagement-ring/select-diamond';
import { CompleteYourRing } from './engagement-ring/summary';
import { Pagination } from './pagination';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN as string;
const SHOPIFY_PUBLIC_STOREFRONT_TOKEN = process.env.SHOPIFY_PUBLIC_STOREFRONT_TOKEN as string; // prettier-ignore
const SHOPIFY_STORE_COUNTRY_CODE = process.env.SHOPIFY_STORE_COUNTRY_CODE as CountryCode; // prettier-ignore
const SHOPIFY_STOREFRONT_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION as string; // prettier-ignore

export function RootComponent({ wrapperSelector, ...rest }: any) {
  return (
    <StrictMode>
      <ShopifyProvider
        countryIsoCode={SHOPIFY_STORE_COUNTRY_CODE ?? 'AU'}
        languageIsoCode="EN"
        storefrontToken={SHOPIFY_PUBLIC_STOREFRONT_TOKEN}
        storefrontApiVersion={SHOPIFY_STOREFRONT_API_VERSION}
        storeDomain={SHOPIFY_STORE_DOMAIN}
      >
          {wrapperSelector === '.react-pagination' && <Pagination {...rest} />}
          {wrapperSelector === '.react-select-diamond' && <SelectDiamond {...rest} />}
          {wrapperSelector === '.react-add-diamond' && <AddDiamond {...rest} />}
          {wrapperSelector === '.react-complete-your-ring-media-gallery' && <CompleteYourRingMediaGallery {...rest} />}
          {wrapperSelector === '.react-complete-your-ring-summary' && <CompleteYourRing {...rest} />}
      </ShopifyProvider>
    </StrictMode>
  );
}
