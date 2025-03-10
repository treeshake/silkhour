import { RingBuilderService } from './services';

interface AddDiamondProps {
  diamond_id: string;
}

export function AddDiamond({ diamond_id: diamondId }: AddDiamondProps) {
  const ring = new RingBuilderService({ diamondId });
  return (
    <a href={`/pages/complete-your-ring?${ring.appendConfiguration().toString()}`} className="button">
      Select Diamond
    </a>
  );
}
