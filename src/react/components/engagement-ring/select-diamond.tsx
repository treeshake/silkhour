import { useFetchProductMetaFieldGid } from '../../shared/hooks/product';
import { createProductGid } from '../../shared/utils/shopify';
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
    createProductGid(productId),
  );

  const handleClick = () => {
    const ringBuilder = new RingBuilderService();
    if (productId && diamondShapeGid) {
      ringBuilder.routeToSelectDiamond(productId, diamondShapeGid);
    }
  };

  return (
    <a href="" onClick={handleClick} className="underline">
      or choose your diamond
    </a>
  );
}
