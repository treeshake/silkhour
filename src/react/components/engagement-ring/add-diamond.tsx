
export function AddDiamond({
  stone_product_id: stoneProductId,
}: {
  stone_product_id: string;
}) {
  console.log(stoneProductId);
  return (
    <a href={`/pages/complete-your-ring`} className="button">
      Select Diamond
    </a>
  );
}
