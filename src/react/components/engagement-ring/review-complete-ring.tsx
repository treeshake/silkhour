import { useFetchProduct } from '../../shared/hooks/product';

export function ReviewCompleteRing() {
  const f = useFetchProduct('gid://shopify/Product/8554824859897');
  console.log(f);
  return (
    <div>
      <h3>
        <span className="underline p-5">Complete your Engagement Ring</span>
      </h3>
    </div>
  );
}
