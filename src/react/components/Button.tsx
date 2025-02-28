import {
  CartProvider,
  ProductProvider,
  useShop,
} from '@shopify/hydrogen-react';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import React, { useEffect, useState } from 'react';
import { storefrontClient } from '../shared/api/storefront-api';

export function Button() {
  const [toggle, setToggle] = React.useState(false);
  const shop = useShop();

  const product: Partial<Product> = {
    handle: 'round-lab-diamond-engagement-ring',
  };

  const handleClick = () => {
    const url = new URLSearchParams(window.location.search);
    const variantId = url.get('variant');
    // Build relative path using current location as base
    const basePath = window.location.pathname.split('/').slice(0, -1)[0];
    const href = `${basePath}/collections/lab-diamonds?filter.p.m.custom.diamond_shape=gid://shopify/Metaobject/41639411961&sort_by=price-ascending?ring-variant=${variantId}`;

    // Use history.pushState for SPA-like navigation
    window.history.pushState({}, '', href);
  };

  return (
    <CartProvider>
      <ProductProvider data={product} initialVariantId={undefined}>
        <a href="" onClick={handleClick} className="underline">
          or choose your ideal diamond
        </a>
      </ProductProvider>
    </CartProvider>
  );
}

function DumpProduct({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {}, []);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await storefrontClient.request(
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
