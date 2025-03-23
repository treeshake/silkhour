import { FacetFiltersForm as CustomFacetFiltersForm } from './facet-filters-form';
import { FacetRemove as CustomFacetRemove } from './facet-remove';
import { PriceRange as CustomPriceRange } from './price-range';

/**
 * Adapted from facets.js
 */
// @ts-ignore
FacetFiltersForm.filterData = [];
// @ts-ignore
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
// @ts-ignore
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('custom-facet-filters-form', CustomFacetFiltersForm);
CustomFacetFiltersForm.setListeners();

customElements.define('custom-price-range', CustomPriceRange);
customElements.define('custom-facet-remove', CustomFacetRemove);
