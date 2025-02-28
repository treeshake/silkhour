import { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { RootComponent } from './components/root';
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

mountReact(['.select-diamond', '.add-diamond'], RootComponent);
