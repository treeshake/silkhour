import { isNil } from 'rambda';
import { useFetchProductMedia } from '../../shared/hooks/product';
import { RingBuilderService } from './services';

export function CompleteYourRingMediaGallery() {
  const ring = new RingBuilderService();
  const [productId, variantId, diamondId] = ring.getCurrentConfiguration();
  const ringProductMedia = useFetchProductMedia(productId!);
  const diamondProductMedia = useFetchProductMedia(diamondId!);

  if ((isNil(productId) && isNil(variantId)) || isNil(diamondId)) {
    // Error handling, redirect back to step 1 ?
    return null;
  }

  const mediaImages = [...ringProductMedia, ...diamondProductMedia].filter(
    (m) => !isNil(m.image),
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-2 sm:py-4 lg:max-w-7xl lg:px-4">
      <div className="grid grid-cols-2 gap-4">
        {mediaImages.map((media) => (
          <div key={media.id}>
            <img
              src={media.image.url}
              alt={media.image.altText || 'Product image'}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
