import { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
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

const obs = new URLMutationObserver({});
obs.listenForChanges(() => {
  mountReact(
    [
      '.react-pagination',
      '.react-ring-builder-subscriber',
      '.react-select-diamond',
      '.react-add-diamond',
      '.react-review-complete-ring',
    ],
    RootComponent,
  );
});
