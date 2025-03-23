/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Product, ProductVariant } from '@shopify/hydrogen-react/storefront-api-types';
import { isNil } from 'rambda';
import { useEffect, useState } from 'react';
import { storefrontClient } from '../api/storefront-api';
import { Media } from '../types/product-media';
import { createProductGid, createProductVariantGid } from '../utils/shopify';

export function flattenNodes(data?: { edges?: { node?: { id?: string } }[] }): string[] {
  return (data?.edges?.map((edge) => edge?.node?.id).filter(Boolean) as string[]) ?? [];
}

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
            metafields(identifiers: [
              { namespace: "custom", key: "diamond_shape" },
              { namespace: "custom", key: "diamond_weight" },
              { namespace: "custom", key: "diamond_color" },
              { namespace: "custom", key: "diamond_clarity" },
              { namespace: "custom", key: "diamond_certification" },
              { namespace: "custom", key: "diamond_cut" },
              { namespace: "custom", key: "diamond_fluorescent" },
            ]) {
              namespace
              key
              value
              reference {
                ... on Metaobject {
                  id
                  fields {
                    key
                    value
                  }
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
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
      setProduct(data?.product);
    };

    if (isNil(id)) {
      return;
    }
    fetchProduct();
  }, [id]);

  return product;
}

export function useFetchProductMetaFieldGid(namespace: string, key: string, ownerId: string) {
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

export function useFetchProductByHandle(handle: string | null) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;

      setLoading(true);
      setError(null);

      try {
        const response = await storefrontClient.request(
          `query getProductByHandle($handle: String!) {
              product(handle: $handle) {
                id
                title
                handle
                description
                collections(first: 1) {
                  edges {
                    node {
                      id
                      handle
                      title
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 250) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
          `,
          {
            variables: {
              handle,
            },
          },
        );
        setProduct(response.data.product);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}

export function useFetchCollectionByHandle(handle: string | null) {
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      if (!handle) return;

      setLoading(true);
      setError(null);

      try {
        const response = await storefrontClient.request(
          `query getCollectionByHandle($handle: String!) {
            collection(handle: $handle) {
              id
              handle
              title
              description
              image {
                url
                altText
              }
            }
          }`,
          {
            variables: {
              handle,
            },
          },
        );
        setCollection(response.data.collection);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch collection'));
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [handle]);

  return { collection, loading, error };
}
