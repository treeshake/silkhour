import { Cart } from '@shopify/hydrogen-react';
import { CartLineInput } from '@shopify/hydrogen-react/storefront-api-types';
import { isNil } from 'rambda';
import { useEffect, useState } from 'react';
import { storefrontClient } from '../api/storefront-api';
import { setCookie } from '../utils/cookies';
import { createCartGid, extractGuidValue } from '../utils/shopify';

export function useRetrieveCart(cartToken: string | null) {
  const [cart, setCart] = useState<Cart | undefined | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (isNil(cartToken)) {
          // Create a new cart if cartToken is null
          const { data } = await storefrontClient.request<{ cartCreate: { cart: Cart } }>(
            `mutation CreateCart {
              cartCreate {
                cart {
                  id
                  lines(first: 100) {
                    edges {
                      node {
                        id
                        quantity
                        merchandise {
                          ... on ProductVariant {
                            id
                            title
                            product {
                              id
                              title
                            }
                            priceV2 {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  }
                  estimatedCost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }`,
          );
          setCart(data?.cartCreate?.cart);
          const cartGuid = data?.cartCreate?.cart?.id;
          if (!isNil(cartGuid)) {
            setCookie('cart', extractGuidValue(cartGuid));
          }
          return;
        }
        // Fetch existing cart
        const { data } = await storefrontClient.request<{ cart: Cart }>(
          `query Cart($id: ID!) {
            cart(id: $id) {
              id
              lines(first: 100) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          id
                          title
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }`,
          {
            variables: {
              id: createCartGid(cartToken),
            },
          },
        );
        setCart(data?.cart);
      } catch (error) {
        console.error('Failed to retrieve cart:', error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCart();
  }, [cartToken]);

  return cart;
}

export function useAddItemsToCart() {
  const [cart, setCart] = useState<Cart | undefined | null>(null);
  const [loading, setLoading] = useState(false);
  const addItemsToCart = async (cartId: string, lines: CartLineInput[]) => {
    try {
      setLoading(true);
      const { data } = await storefrontClient.request<{ cart: Cart }>(
        `mutation AddItemsToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              lines(first: 100) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          id
                          title
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }`,
        {
          variables: {
            cartId,
            lines,
          },
        },
      );
      setCart(data?.cart);
      setLoading(false);
    } catch (error) {
      console.error('Failed to add items to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return { cart, addItemsToCart, loading };
}
