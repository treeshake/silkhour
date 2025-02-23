import { CartProvider, ProductProvider, useShop } from '@shopify/hydrogen-react';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';

const client = createStorefrontApiClient({
  // load environment variables according to your framework and runtime
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN as string,
  apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION as string,
  publicAccessToken: process.env.SHOPIFY_PUBLIC_STOREFRONT_TOKEN as string,
});

export function Button() {
  const [toggle, setToggle] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const shop = useShop();

  const product: Partial<Product> = {
    handle: 'round-lab-diamond-engagement-ring',
  };
  return (
    <CartProvider>
      <ProductProvider data={product} initialVariantId={undefined}>
        <DumpProduct id="8721874813177" />
      </ProductProvider>
    </CartProvider>
  );
}

function DumpProduct({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const cartSessionCookie = decodeURIComponent(getCookie('cart') ?? "");
    
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await client.request(
        `query Product {
            product(handle: "round-lab-diamond-engagement-ring") {
              title
              variantsCount {
                count
              }
            }
        }`,
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return product && <pre>{JSON.stringify(product, null, 2)}</pre>;
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}