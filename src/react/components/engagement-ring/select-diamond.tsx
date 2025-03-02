import { RingBuilder } from './types';
import { updateRingBuilder } from './utils';

interface SelectDiamondLinkProps {
  product_id: string;
  diamond_shape: string;
}

export function SelectDiamond({
  product_id: ringProductId = '',
  diamond_shape,
}: SelectDiamondLinkProps) {
  const handleClick = () => {
    const url = new URLSearchParams(window.location.search);
    url.append('sort_by', 'price-ascending');
    url.append('filter.p.m.custom.diamond_shape', 'gid://shopify/Metaobject/41639411961'); // prettier-ignore

    const changes: RingBuilder = {
      ringProductVariantId: url.get('variant') || '',
      ringProductId,
    };
    updateRingBuilder(changes);

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
