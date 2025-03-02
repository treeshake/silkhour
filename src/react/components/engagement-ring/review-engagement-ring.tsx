import { useFetchProduct } from '../../shared/hooks/product';
import { createProductGid } from '../../shared/utils/shopify';

export function ReviewEngagementRing() {
  const product = useFetchProduct(createProductGid('8554824859897'));
  return (
    <div>
      <h3>
        <span className="underline p-5">Complete your Engagement Ring</span>
      </h3>
    </div>
  );
}
