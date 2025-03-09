import { isNil } from 'rambda';
import {
  useFetchProduct,
  useFetchProductVariant,
} from '../../shared/hooks/product';
import { formatCurrency } from '../../shared/utils/currency';
import { extractMetafieldValue } from '../../shared/utils/shopify';
import { RingBuilderService } from './services';

export function CompleteYourRing() {
  const ring = new RingBuilderService();
  const [productId, variantId, diamondId] = ring.getCurrentConfiguration(); // prettier-ignore
  if ((isNil(productId) && isNil(variantId)) || isNil(diamondId)) {
    // Error handling, redirect back to step 1 ?
    return null;
  }
  const product = useFetchProduct(productId!);

  const variant = useFetchProductVariant(variantId!);
  const diamond = useFetchProduct(diamondId);

  const metafieldKeysProduct = [
    { key: 'diamond_shape', fieldKey: 'value', label: 'Shape' },
  ];

  const metafieldKeysDiamond = [
    { key: 'diamond_weight', fieldKey: 'value', label: 'Weight' },
    { key: 'diamond_color', fieldKey: 'value', label: 'Color' },
    { key: 'diamond_clarity', fieldKey: 'value', label: 'Clarity' },
    { key: 'diamond_certification', fieldKey: 'value', label: 'Diamond Certification' }, // prettier-ignore
    { key: 'diamond_cut', fieldKey: 'name', label: 'Cut' },
    { key: 'diamond_fluorescent', fieldKey: 'text_options', label: 'Fluorescence' }, // prettier-ignore
  ];

  const productMetafieldValues = metafieldKeysProduct.map(
    ({ key, fieldKey, label }) => ({
      label,
      value: extractMetafieldValue(product, key, fieldKey) ?? 'Unknown',
    }),
  );
  const diamondMetafieldValues = metafieldKeysDiamond.map(
    ({ key, fieldKey, label }) => ({
      label,
      value: extractMetafieldValue(diamond, key, fieldKey) ?? 'Unknown',
    }),
  );

  return (
    <section>
      {product && diamond && variant && (
        <div className="flex flex-col gap-4">
          <div className="pb-15">
            <div className="flex justify-between pb-5">
              <h5 className="product-summary-subheading">Setting</h5>
              <h5 className="product-summary-subheading underline hover:cursor-pointer">
                Change/Edit
              </h5>
            </div>
            <div className="flex justify-between pb-5">
              <h2 className="product-title-smaller">{product.title}</h2>
              <h2 className="product-price-smaller">
                {formatCurrency(
                  variant.price.amount,
                  variant.price.currencyCode,
                )}
              </h2>
            </div>
            <div>
              {variant.selectedOptions
                .filter((option) => option.name !== 'Diamond Size')
                .map((option) => (
                  <div key={option.name} className="flex justify-between mb-2">
                    <span>{option.name}:</span>
                    <span>{option.value}</span>
                  </div>
                ))}
              {productMetafieldValues.map(({ label, value }) => (
                <div key={label} className="flex justify-between mb-2">
                  <span>{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-15">
            <div className="flex justify-between pb-5">
              <h5 className="product-summary-subheading">Diamond</h5>
              <h5 className="product-summary-subheading underline hover:cursor-pointer">
                Change/Edit
              </h5>
            </div>
            <div className="flex justify-between pb-5">
              <h2 className="product-title-smaller">{diamond.title}</h2>
              <h2 className="product-price-smaller">
                {formatCurrency(
                  diamond.priceRange.minVariantPrice.amount,
                  diamond.priceRange.minVariantPrice.currencyCode,
                )}
              </h2>
            </div>
            <div>
              {diamondMetafieldValues.map(({ label, value }) => (
                <div key={label} className="flex justify-between mb-2">
                  <span>{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-15">
            <div className="flex justify-between">
              <h2 className="product-title-smaller">Total</h2>
              <h2 className="product-title-smaller">
                {formatCurrency(
                  Number(variant.price.amount) +
                    Number(diamond.priceRange.minVariantPrice.amount),
                  diamond.priceRange.minVariantPrice.currencyCode,
                )}
              </h2>
            </div>
          </div>
        </div>
      )}
      <pre>{JSON.stringify(ring.getCurrentConfiguration(), null, 2)}</pre>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <pre>{JSON.stringify(variant, null, 2)}</pre>
      <pre>{JSON.stringify(diamond, null, 2)}</pre>
    </section>
  );
}
