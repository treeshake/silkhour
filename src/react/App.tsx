import { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { RingBuilderService } from './components/engagement-ring/services';
import { RootComponent } from './components/root';
import { URLMutationObserver } from './shared/services/url-mutation-observer';
import { getAttributes } from './shared/utils/dom';

function mountReact(
  wrapperSelectors: string[],
  RootComponent: FunctionComponent<{ props: any }>,
) {
  for (const wrapperSelector of wrapperSelectors) {
    const elements = document.querySelectorAll<Element>(wrapperSelector);
    elements.forEach((el) => {
      const props = {
        ...(getAttributes(el, 'prop-') ?? {}),
        wrapperSelector,
      };
      const root = createRoot(el);
      root.render(<RootComponent {...props} />);
    });
  }
}

const ringBuilder = new RingBuilderService();
const observer = new URLMutationObserver({
  variant: ringBuilder.getProductId(),
  product_id: ringBuilder.getVariantId(),
});

observer.listenForChanges(() => {
  mountReact(
    [
      '.react-pagination',
      '.react-select-diamond',
      '.react-add-diamond',
      '.react-complete-your-ring',
    ],
    RootComponent,
  );
});

  // Clean up function
window.addEventListener('beforeunload', () => {
  observer.disconnect();
});