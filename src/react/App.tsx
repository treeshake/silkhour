import { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { RingBuilderService } from './components/ring-builder/services';
import { RootComponent } from './components/root';
import { URLMutationObserver } from './shared/services/url-mutation-observer';
import { getAttributes } from './shared/utils/dom';

function mountReact(wrapperSelectors: string[], RootComponent: FunctionComponent<{ props: any }>) {
  for (const wrapperSelector of wrapperSelectors) {
    const elements = document.querySelectorAll<Element>(wrapperSelector);
    elements.forEach((el) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const props = {
        ...(getAttributes(el, 'prop-') ?? {}),
        wrapperSelector,
      };
      const root = createRoot(el);
      root.render(<RootComponent {...props} />);
    });
  }
}

const ring = new RingBuilderService();
const observer = new URLMutationObserver({
  variant: ring.getVariantId(),
  product_id: ring.getProductId(),
  product_variant_id: ring.getProductVariantId(),
  diamond_id: ring.getDiamondId(),
});

observer.listenForChanges(() => {
  mountReact(
    [
      '.react-nav-breadcrumbs',
      '.react-ring-builder-progress',
      '.react-pagination',
      '.react-select-diamond',
      '.react-add-diamond',
      '.react-complete-your-ring-media-gallery',
      '.react-complete-your-ring-summary',
    ],
    RootComponent,
  );
});

// Clean up function
window.addEventListener('beforeunload', () => {
  observer.disconnect();
});
