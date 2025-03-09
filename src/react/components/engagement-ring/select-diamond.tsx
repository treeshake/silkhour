import { useFetchProductMetaFieldGid } from '../../shared/hooks/product';
import { createProductGid } from '../../shared/utils/shopify';

interface SelectDiamondLinkProps {
  product_id: string;
}

export function SelectDiamond({
  product_id: ringProductId = '',
}: SelectDiamondLinkProps) {
  const diamondShapeGid = useFetchProductMetaFieldGid(
    'custom',
    'diamond_shape',
    createProductGid(ringProductId),
  );

  const handleClick = () => {
    // TODO - Move to RingBuilderService
    const url = new URLSearchParams(window.location.search);
    url.append('sort_by', 'price-ascending');
    url.append('filter.p.m.custom.diamond_shape', diamondShapeGid ?? '');
    url.append('product_id', ringProductId);

    // Build relative path using current location as base
    const basePath = window.location.pathname.split('/').slice(0, -1)[0];
    const href = `${basePath}/collections/lab-diamonds?${url.toString()}`;
    window.history.pushState({}, '', href);
  };

  return (
    <a href="" onClick={handleClick} className="underline">
      or choose your diamond
    </a>
  );
}
