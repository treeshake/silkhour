interface SelectDiamondLinkProps {
  productid: string;
  diamondshape: string;
}

export function SelectDiamond({
  productid,
  diamondshape,
}: SelectDiamondLinkProps) {
  const handleClick = () => {
    const url = new URLSearchParams(window.location.search);
    url.append('sort_by', 'price-ascending');
    url.append('filter.p.m.custom.diamond_shape', 'gid://shopify/Metaobject/41639411961'); // prettier-ignore

    // Store attributes in sessionStorage - not ideal, but pagination and possibly other selections on the collections page is stripping the URL queries
    const engagementRingBuilder = {
      variantId: url.get('variant') || '',
      productId: productid || '',
    };
    sessionStorage.setItem(
      'engagement.ring.builder',
      JSON.stringify(engagementRingBuilder),
    );

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
