import { isNil } from 'rambda';
import { useFetchProductMedia } from '../../shared/hooks/product';
import { RingBuilderService } from './services';

export function CompleteYourRingMediaGallery() {
  const ring = new RingBuilderService();
  const [productId, _, __, diamondId] = ring.getCurrentConfiguration();
  const ringProductMedia = useFetchProductMedia(productId!);
  const diamondProductMedia = useFetchProductMedia(diamondId!);
  if (!ring.isConfigurationComplete()) {
    return null;
  }
  const mediaImages = [...ringProductMedia, ...diamondProductMedia].filter((m) => !isNil(m.image));

  return (
    <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-8">
      {mediaImages.map((media) => (
        <div key={media.id}>
          <img
            src={media.image.url}
            alt={media.image.altText || 'Product image'}
            className="tw-w-full tw-h-auto tw-object-cover"
          />
        </div>
      ))}
    </div>
  );
}
