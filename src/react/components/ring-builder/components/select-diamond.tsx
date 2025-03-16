import { useFetchProductMetaFieldGid } from '../../../shared/hooks/product';
import { RingBuilderService } from '../services';

interface SelectDiamondLinkProps {
  selected_or_first_available_variant: string;
  product_id: string;
}

export function SelectDiamond({ selected_or_first_available_variant: selectedOrFirstAvailableVariant = '', product_id: productId = '' }: SelectDiamondLinkProps) {
  const diamondShapeGid = useFetchProductMetaFieldGid('custom', 'diamond_shape', productId);
  const handleClick = () => {
    const ring = new RingBuilderService();
    if (productId && diamondShapeGid && selectedOrFirstAvailableVariant) {
      ring.routeToSelectDiamond(productId, selectedOrFirstAvailableVariant, diamondShapeGid);
    }
  };

  return (
    <a href="" onClick={handleClick} className="tw-underline tw-text-black">
      or choose your bespoke diamond
    </a>
  );
}
