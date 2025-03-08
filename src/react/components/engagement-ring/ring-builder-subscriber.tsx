import { useEffect } from 'react';
import { URLMutationObserver } from '../../shared/services/url-mutation-observer';

export function RingBuilderSubscriber() {
  const searchParams = new URLSearchParams(window.location.search);

  // Subscribe to product variant
  const productVariant = searchParams.get('variant') || null;
  const productId = searchParams.get('product_id') || null;
  const observer = new URLMutationObserver({
    variant: productVariant,
    product_id: productId,
  });

  useEffect(() => {
    // Run the listener and cleanup after component unmounts
    observer.listenForChanges();
    return () => {
      // TODO window.unload should be used, component doesn't get a chance to cleanup, since page is refreshed.
      observer.disconnect();
    };
  }, []);

  // Subscribe only component, no render.
  return null;
}
