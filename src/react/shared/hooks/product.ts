import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { useEffect, useState } from 'react';
import { storefrontClient } from '../api/storefront-api';

export function useFetchProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await storefrontClient.request(
        `query Product($id: ID!) {
          product(id: $id) {
            id
            title
            handle
            description
            variantsCount {
              count
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }`,
        {
          variables: {
            id,
          },
        },
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return {
    product
  }
}
