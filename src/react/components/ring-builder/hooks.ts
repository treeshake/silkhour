import { CartLineInput, Product } from '@shopify/hydrogen-react/storefront-api-types';
import { isNil } from 'rambda';
import { useState } from 'react';
import { useAddItemsToCart, useRetrieveCart } from '../../shared/hooks/cart';
import { IStatus, STATUS } from '../../shared/types/status';
import { LabelledValue } from '../../shared/types/value';
import { getCartSessionCookie } from '../../shared/utils/cookies';
import { Step } from './types';

export function useAddToCart(variantGid: string, diamondVariantGid: string, diamondMetafieldValues: LabelledValue[]) {
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
    const diamondAttributes = diamondMetafieldValues.map(({ label, value }) => ({
      key: label,
      value: value,
    }));

    const lineItems: CartLineInput[] = [
      {
        merchandiseId: diamondVariantGid,
        quantity: 1,
        attributes: diamondAttributes,
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

const steps: Step[] = [
  {
    id: '1',
    name: 'Ring Setting',
    description: 'Select and customize your setting',
    href: '/collections/engagement-ring',
    status: 'current',
  },
  { id: '2', name: 'Diamond', description: 'Select your diamond', href: '#', status: 'upcoming' },
  { id: '3', name: 'Review', description: 'Confirm and finalise your ring', href: '#', status: 'upcoming' },
];
export function useRingBuilderNavigation(product: Product | null, diamond: Product | null, diamondPageHref: string | null) {
  let [settingStep, diamondStep, reviewStep] = steps;

  if (!isNil(product)) {
    settingStep.status = 'complete';
    settingStep.description = product?.title ?? '';
    diamondStep.status = 'current';
  }
  if (!isNil(diamond) && !isNil(diamondPageHref)) {
    settingStep.status = 'complete';
    diamondStep.status = 'complete';
    diamondStep.description = diamond?.title ?? '';
    diamondStep.href = diamondPageHref;
    reviewStep.status = 'current';
  }

  return {
    steps: [settingStep, diamondStep, reviewStep],
  };
}
