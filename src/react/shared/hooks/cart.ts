import { CartLineInput } from '@shopify/hydrogen-react/storefront-api-types';
import { isNil } from 'rambda';
import { useEffect, useState } from 'react';
import { storefrontClient } from '../api/storefront-api';
import { createCartGid } from '../utils/shopify';

export function useRetrieveCart(cartToken: string | null) {
  const [cart, setCart] = useState<unknown>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (isNil(cartToken)) {
          // Create a new cart if cartToken is null
          const { data } = await storefrontClient.request<unknown>(
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
          const newCart = data?.cartCreate?.cart;
          if (newCart) {
            setCart(newCart);
            setCartSessionCookie(newCart.id);
          }
        } else {
          // Fetch existing cart
          const { data } = await storefrontClient.request<unknown>(
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
        }
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
  const [cart, setCart] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const addItemsToCart = async (cartId: string, lines: CartLineInput[]) => {
    try {
      setLoading(true);
      const { data } = await storefrontClient.request<unknown>(
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
      setCart(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to add items to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return { cart, addItemsToCart, loading };
}
