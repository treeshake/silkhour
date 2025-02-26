import {
  CartProvider,
  ProductProvider,
  useShop,
} from '@shopify/hydrogen-react';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { storefrontClient } from '../shared/api/storefront-api';

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
