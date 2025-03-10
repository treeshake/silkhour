import { CartLineInput } from '@shopify/hydrogen-react/storefront-api-types';
import { isNil } from 'rambda';
import { useState } from 'react';
import { useAddItemsToCart, useRetrieveCart } from '../../shared/hooks/cart';
import { IStatus, STATUS } from '../../shared/types/status';
import { getCartSessionCookie } from '../../shared/utils/cookies';

export function useAddToCart(variantGid: string, diamondVariantGid: string) {
  const cartToken = getCartSessionCookie();
  const cart = useRetrieveCart(cartToken);
  const { addItemsToCart } = useAddItemsToCart();
  const [status, setStatus] = useState<IStatus>(STATUS.UNINITIALISED);
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isNil(cart)) {
      // Error handling here...
      return;
    }
    const lineItems: CartLineInput[] = [
      {
        merchandiseId: diamondVariantGid,
        quantity: 1,
      },
      {
        merchandiseId: variantGid,
        quantity: 1,
      },
    ];
    try {
      setStatus(STATUS.LOADING);
      await addItemsToCart(cart.id!, lineItems);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setStatus(STATUS.ERROR);
    } finally {
      setStatus(STATUS.SUCCESS);
    }
  };

  return {
    cart,
    status,
    handleAddToCart,
  };
}
