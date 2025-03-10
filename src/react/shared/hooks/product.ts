/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';
import { useEffect, useState } from 'react';
import { storefrontClient } from '../api/storefront-api';
import { Media } from '../types/product-media';
import { createProductGid, createProductVariantGid } from '../utils/shopify';

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
            id: createProductGid(id),
          },
        },
      );
      setProduct(data?.product);
    };

    fetchProduct();
  }, [id]);

  return product;
}

export function useFetchProductMetaFieldGid(
  namespace: string,
  key: string,
  ownerId: string,
) {
  const [productMetafield, setProductMetafield] = useState<string | null>(null);
  useEffect(() => {
    const fetchProductMetafield = async () => {
      const { data } = await storefrontClient.request(
        `query ProductMetafield($namespace: String!, $key: String!, $ownerId: ID!) {
          product(id: $ownerId) {
            ${key}: metafield(namespace: $namespace, key: $key) {
              value
            }
          }
        }`,
        {
          variables: {
            namespace,
            key,
            ownerId: createProductGid(ownerId),
          },
        },
      );
      setProductMetafield(data?.product[key]?.value);
    };

    fetchProductMetafield();
  }, [ownerId, key, namespace]);

  return productMetafield;
}

export function useFetchProductMedia(id: string) {
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data } = await storefrontClient.request(
        `query ProductMedia($id: ID!) {
          product(id: $id) {
            media(first: 20) {
              nodes {
                ... on MediaImage {
                  id
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
                ... on Video {
                  id
                  sources {
                    url
                    mimeType
                    format
                    height
                    width
                  }
                }
                ... on ExternalVideo {
                  id
                  embedUrl
                }
                ... on Model3d {
                  id
                  sources {
                    url
                    mimeType
                    format
                  }
                  previewImage {
                    url
                  }
                }
              }
            }
          }
        }`,
        {
          variables: {
            id: createProductGid(id),
          },
        },
      );
      setMedia(data.product.media.nodes);
    };

    fetchMedia();
  }, [id]);

  return media;
}

export function useFetchProductVariant(variantId: string) {
  const [variant, setVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    const fetchVariant = async () => {
      const { data } = await storefrontClient.request(
        `query ProductVariant($id: ID!) {
          node(id: $id) {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              sku
              availableForSale
              image {
                url
                altText
                width
                height
              }
              product {
                id
                title
                description
                handle
                vendor
                productType
                tags
              }
              selectedOptions {
                name
                value
              }
              compareAtPrice {
                amount
                currencyCode
              }
              weight
              weightUnit
            }
          }
        }`,
        {
          variables: {
            id: createProductVariantGid(variantId),
          },
        },
      );
      setVariant(data?.node);
    };

    fetchVariant();
  }, [variantId]);

  return variant;
}

export function useFetchAllProductMetafields(productId: string) {
  const [metafields, setMetafields] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchMetafields = async () => {
      const { data } = await storefrontClient.request(
        `query ProductMetafields($id: ID!, $identifiers: [HasMetafieldsIdentifier!]!) {
          product(id: $id) {
            metafields(identifiers: $identifiers) {
              id
              namespace
              key
              value
            }
          }
        }`,
        {
          variables: {
            id: createProductGid(productId),
            identifiers: [{ namespace: "*", key: "*" }],
          },
        },
      );
      const metafieldsData = data?.product?.metafields.reduce(
        (acc: Record<string, any>, node: { id: string; namespace: string; key: string; value: any }) => {
          acc[`${node.namespace}:${node.key}`] = { id: node.id, value: node.value };
          return acc;
        },
        {},
      );
      setMetafields(metafieldsData);
    };

    fetchMetafields();
  }, [productId]);

  return metafields;
}
