
/**
 * Adapted from facets.js
 */
export class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink?.setAttribute('role', 'button');
    facetLink?.addEventListener('click', this.closeFilter.bind(this));
    facetLink?.addEventListener('keyup', (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
    });
  }

  closeFilter(event: MouseEvent | KeyboardEvent) {
    event.preventDefault();
    const form =
      this.closest('custom-facet-filters-form') ||
      document.querySelector('custom-facet-filters-form');
    if (form) {
      (form as any).onActiveFilterClick(event);
    }
  }
}
