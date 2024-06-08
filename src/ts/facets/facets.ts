import { FacetFiltersForm as CustomFacetFiltersForm } from './FacetFiltersForm';
import { PriceRange as CustomPriceRange } from './PriceRange';
import { FacetRemove as CustomFacetRemove } from './FacetRemove';

/**
 * Adapted from facets.js
 */
FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('custom-facet-filters-form', CustomFacetFiltersForm);
CustomFacetFiltersForm.setListeners();

customElements.define('custom-price-range', CustomPriceRange);
customElements.define('custom-facet-remove', CustomFacetRemove);
