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
    const ringBuilder = new RingBuilderService();
    if (productId && diamondShapeGid) {
      ringBuilder.routeToSelectDiamond(productId, diamondShapeGid);
    }
  };

  return (
    <a href="" onClick={handleClick} className="underline text-black">
      or choose your diamond
    </a>
  );
}
