import { ShopifyProvider } from "@shopify/hydrogen-react";
import { CountryCode } from "@shopify/hydrogen-react/storefront-api-types";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Button } from "./components/Button";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN as string;
const SHOPIFY_PUBLIC_STOREFRONT_TOKEN = process.env.SHOPIFY_PUBLIC_STOREFRONT_TOKEN as string; // prettier-ignore
const SHOPIFY_STORE_COUNTRY_CODE = process.env.SHOPIFY_STORE_COUNTRY_CODE as CountryCode; // prettier-ignore
const SHOPIFY_STOREFRONT_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION as string; // prettier-ignore

const selectDiamondLink = document.querySelector("#select-diamond-link");

function renderApp() {
  if (selectDiamondLink) {
    const root = createRoot(selectDiamondLink);
    root.render(
      <ShopifyProvider
        countryIsoCode={SHOPIFY_STORE_COUNTRY_CODE ?? "AU"}
        languageIsoCode="EN"
        storefrontToken={SHOPIFY_PUBLIC_STOREFRONT_TOKEN}
        storefrontApiVersion={SHOPIFY_STOREFRONT_API_VERSION}
        storeDomain={SHOPIFY_STORE_DOMAIN}
      >
        <BrowserRouter>
          <Button />
        </BrowserRouter>
      </ShopifyProvider>,
    );
  }
}

renderApp();
