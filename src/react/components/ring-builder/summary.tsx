import { CartProvider } from '@shopify/hydrogen-react';
import { isEmpty, isNil } from 'rambda';
import { useEffect } from 'react';
import { flattenNodes, useFetchProduct, useFetchProductVariant } from '../../shared/hooks/product';
import { isLoading, isSuccess } from '../../shared/types/status';
import { LabelledValue } from '../../shared/types/value';
import { formatCurrency } from '../../shared/utils/currency';
import { extractMetafieldValue } from '../../shared/utils/shopify';
import { SpinIfLoading } from '../spinner/spin-if-loading';
import { useAddToCart } from './hooks';
import { RingBuilderService } from './services';

export function CompleteYourRing() {
  const ring = new RingBuilderService();
  if (!ring.isConfigurationComplete()) {
    // Error handling, redirect back to step 1 ?
    return null;
  }

  const [productId, productVariantId, variantId, diamondId] = ring.getCurrentConfiguration(); // prettier-ignore
  return (
    <CompleteYourRingSummary
      productId={productId!}
      variantId={variantId! || productVariantId!}
      diamondId={diamondId!}
    />
  );
}

function CompleteYourRingSummary({
  productId,
  variantId,
  diamondId,
}: {
  productId: string;
  variantId: string;
  diamondId: string;
}) {
  const product = useFetchProduct(productId);
  const variant = useFetchProductVariant(variantId);
  const diamond = useFetchProduct(diamondId);

  const variantGid = variant?.id;
  const diamondVariantGids = flattenNodes(diamond?.variants);

  const metafieldKeysProduct = [{ key: 'diamond_shape', fieldKey: 'value', label: 'Diamond Shape' }];
  const metafieldKeysDiamond = [
    { key: 'diamond_weight', fieldKey: 'value', label: 'Carat' },
    { key: 'diamond_clarity', fieldKey: 'value', label: 'Clarity' },
    { key: 'diamond_color', fieldKey: 'value', label: 'Color' },
    { key: 'diamond_cut', fieldKey: 'name', label: 'Cut' },
    { key: 'diamond_certification', fieldKey: 'value', label: 'Diamond Certification' }, // prettier-ignore
    { key: 'diamond_fluorescent', fieldKey: 'text_options', label: 'Fluorescence' }, // prettier-ignore
  ];

  const productMetafieldValues = metafieldKeysProduct.map(({ key, fieldKey, label }) => ({
    label,
    value: extractMetafieldValue(product, key, fieldKey) ?? 'Unknown',
  }));
  const diamondMetafieldValues = metafieldKeysDiamond.map(({ key, fieldKey, label }) => ({
    label,
    value: extractMetafieldValue(diamond, key, fieldKey) ?? 'Unknown',
  }));
  return (
    <section>
      {product && diamond && variant && (
        <div className="tw-flex tw-flex-col tw-gap-y-8 tw-mt-8 md:tw-mt-0">
          {/* Engagement ring setting */}
          <div>
            <div className="tw-flex tw-justify-between tw-pb-5">
              <h5 className="product-summary-subheading">Setting</h5>
              <h5 className="product-summary-subheading tw-underline hover:tw-cursor-pointer">Change/Edit</h5>
            </div>
            <div className="tw-flex tw-justify-between tw-pb-5">
              <h2 className="product-title-smaller tw-mr-2">{product.title}</h2>
              <h2 className="product-price-smaller tw-whitespace-nowrap">
                {formatCurrency(variant.price.amount, variant.price.currencyCode)}
              </h2>
            </div>
            <div>
              {variant.selectedOptions
                .filter((option) => option.name !== 'Diamond Size')
                .map((option) => (
                  <div key={option.name} className="tw-flex tw-justify-between tw-mb-2">
                    <span>{option.name}:</span>
                    <span>{option.value}</span>
                  </div>
                ))}
              {productMetafieldValues.map(({ label, value }) => (
                <div key={label} className="tw-flex tw-justify-between tw-mb-2">
                  <span>{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diamond selection */}
          <div>
            <div className="tw-flex tw-justify-between tw-pb-5">
              <h5 className="product-summary-subheading">Diamond</h5>
              <h5 className="product-summary-subheading tw-underline hover:tw-cursor-pointer">Change/Edit</h5>
            </div>
            <div className="tw-flex tw-justify-between tw-pb-5">
              <h2 className="product-title-smaller tw-mr-2">{diamond.title}</h2>
              <h2 className="product-price-smaller tw-whitespace-nowrap">
                {formatCurrency(
                  diamond.priceRange.minVariantPrice.amount,
                  diamond.priceRange.minVariantPrice.currencyCode,
                )}
              </h2>
            </div>
            <div>
              {diamondMetafieldValues.map(({ label, value }) => (
                <div key={label} className="tw-flex tw-justify-between tw-mb-2">
                  <span>{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div>
            <div className="tw-flex tw-justify-between">
              <h2 className="product-title-smaller">Total</h2>
              <h2 className="product-title-smaller">
                {formatCurrency(
                  Number(variant.price.amount) + Number(diamond.priceRange.minVariantPrice.amount),
                  diamond.priceRange.minVariantPrice.currencyCode,
                )}
              </h2>
            </div>
          </div>

          {/* Buy buttons */}
          <CartProvider>
            <div className="tw-flex tw-flex-col tw-my-4">
              {!isNil(variantGid) && !isEmpty(diamondVariantGids) && (
                <>
                  <AddToCartButton
                    key="Checkout now button"
                    variantGid={variantGid}
                    diamondVariantGid={diamondVariantGids[0]}
                    diamondMetafieldValues={diamondMetafieldValues}
                    buttonText="Checkout now"
                    redirectUrl="/cart/checkout"
                  />
                  <AddToCartButton
                    key="Add to cart button"
                    variantGid={variantGid}
                    diamondVariantGid={diamondVariantGids[0]}
                    diamondMetafieldValues={diamondMetafieldValues}
                    buttonText="Add to cart"
                    redirectUrl="/cart"
                  />
                </>
              )}
            </div>
          </CartProvider>
        </div>
      )}
      {/* <pre>{JSON.stringify(product, null, 2)}</pre>
      <pre>{JSON.stringify(variant, null, 2)}</pre>
      <pre>{JSON.stringify(diamond, null, 2)}</pre> */}
    </section>
  );
}

interface AddToCartButtonProps {
  variantGid: string;
  diamondVariantGid: string;
  diamondMetafieldValues: LabelledValue[];
  redirectUrl: string;
  buttonText: string;
}

export function AddToCartButton({
  variantGid,
  diamondVariantGid,
  diamondMetafieldValues,
  redirectUrl,
  buttonText,
}: AddToCartButtonProps) {
  const { status, handleAddToCart } = useAddToCart(variantGid, diamondVariantGid, diamondMetafieldValues);
  useEffect(() => {
    if (isSuccess(status)) {
      window.location.assign(redirectUrl);
    }
  }, [status, redirectUrl]);
  return (
    <div className="product-form__buttons">
      <button
        type="submit"
        name="add"
        className="product-form__submit button button--full-width button--primary"
        aria-haspopup="dialog"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleAddToCart}
        disabled={isLoading(status)}
      >
        <SpinIfLoading loading={false}>
          <span>{buttonText.toUpperCase()}</span>
        </SpinIfLoading>
      </button>
    </div>
  );
}
