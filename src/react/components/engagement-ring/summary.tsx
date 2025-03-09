import { isNil } from 'rambda';
import { useFetchProduct } from '../../shared/hooks/product';
import { createProductGid } from '../../shared/utils/shopify';
import { RingBuilderService } from './services';

export function CompleteYourRing() {
  const ringBuilder = new RingBuilderService();
  const [productId, variantId, diamondId] =
    ringBuilder.getCurrentConfiguration();
  if ((isNil(productId) && isNil(variantId)) || isNil(diamondId)) {
    // Error handling, redirect back to step 1 ?
    return null;
  }
  const ring = useFetchProduct(
    createProductGid(!isNil(variantId) ? variantId! : productId!),
  );
  const diamond = useFetchProduct(createProductGid(diamondId));
  return (
    <div>
      <h3>
        <span className="underline p-5">Complete your Engagement Ring</span>
      </h3>
      <pre>{JSON.stringify(ringBuilder.getCurrentConfiguration(), null, 2)}</pre>
      <pre>{JSON.stringify(ring, null, 2)}</pre>
      <pre>{JSON.stringify(diamond, null, 2)}</pre>
    </div>
  );
}
