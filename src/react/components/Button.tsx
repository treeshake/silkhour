import { ProductProvider, useProduct, useShop } from "@shopify/hydrogen-react";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import React from "react";
import { useLocation, useSearchParams } from "react-router";

export function Button() {
  const [toggle, setToggle] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const shop = useShop();

  const product: Partial<Product> = {
    handle: "round-lab-diamond-engagement-ring",
  };

  console.log(location.pathname);
  return (
    <ProductProvider data={product} initialVariantId={undefined}>
      <DumpProduct />
    </ProductProvider>
  );
}

function DumpProduct() {
  const { product } = useProduct();
  return <pre>{JSON.stringify(product)}</pre>;
}
