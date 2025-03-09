import { useFetchProductMetaFieldGid } from '../../shared/hooks/product';
import { RingBuilderService } from './services';

interface SelectDiamondLinkProps {
  product_id: string;
}

export function SelectDiamond({
  product_id: productId = '',
}: SelectDiamondLinkProps) {
  const diamondShapeGid = useFetchProductMetaFieldGid(
    'custom',
    'diamond_shape',
    productId,
  );

  const handleClick = () => {
    const ring = new RingBuilderService();
    if (productId && diamondShapeGid) {
      ring.routeToSelectDiamond(productId, diamondShapeGid);
    }
  };

  return (
    <a href="" onClick={handleClick} className="tw-underline tw-text-black">
      or choose your diamond
    </a>
  );
}
