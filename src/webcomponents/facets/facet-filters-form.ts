/**
 * Adapted from facets.js
 */
export class FacetFiltersForm extends HTMLElement {
  debouncedOnSubmit: (...args: any[]) => void;
  static filterData: any[] = [];
  static searchParamsInitial: string;
  static searchParamsPrev: string;

  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    // @ts-ignore
    this.debouncedOnSubmit = debounce((event: any) => {
      this.onSubmitHandler(event);
    }, 800);

    const facetForm = this.querySelector('form');
    facetForm?.addEventListener('input', this.debouncedOnSubmit.bind(this));

    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    // @ts-ignore
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
  }

  static setListeners() {
    const onHistoryChange = (event: any) => {
      const searchParams = event.state
        ? event.state.searchParams
        : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams: any, event?: any, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainerDesktop = document.getElementById(
      'ProductCountDesktop',
    );
    const productGridContainer = document.getElementById(
      'ProductGridContainer',
    );
    const collectionElement =
      productGridContainer?.querySelector('.collection');
    if (collectionElement) {
      collectionElement.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = (element: any) => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl)
        ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
        : FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
  }

  static renderSectionFromFetch(url: any, event: any) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [ // @ts-ignore
          ...FacetFiltersForm.filterData, // @ts-ignore
          { html, url },
        ];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        // @ts-ignore
        if (typeof initializeScrollAnimationTrigger === 'function')
          // @ts-ignore
          initializeScrollAnimationTrigger(html.innerHTML);
      });
  }

  static renderSectionFromCache(filterDataUrl: any, event: any) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
    // @ts-ignore
    if (typeof initializeScrollAnimationTrigger === 'function')
      // @ts-ignore
      initializeScrollAnimationTrigger(html.innerHTML);
  }

  static renderProductGridContainer(html: any) {
    const productGridContainer = document.getElementById(
      'ProductGridContainer',
    );
    if (productGridContainer) {
      const gridContainer = new DOMParser()
        .parseFromString(html, 'text/html')
        .getElementById('ProductGridContainer');
      if (gridContainer) {
        productGridContainer.innerHTML = gridContainer.innerHTML;

        productGridContainer
          .querySelectorAll('.scroll-trigger')
          .forEach((element) => {
            element.classList.add('scroll-trigger--cancel');
          });
      }
    }

    document
      .querySelectorAll('.custom_cllection_main .product_list')
      .forEach((item) => {
        item.addEventListener('click', function (this: HTMLElement) {
          const productMain = this.closest('.product_list_main') as HTMLElement;
          const productContent = productMain.querySelector('.product_list_content') as HTMLElement;
          if (item.classList.contains('opened')) {
            productContent.style.display = 'none';
            item.classList.remove('opened');
          } else {
            productContent.style.display = 'block';
            item.classList.add('opened');
          }
        });
      });
  }

  static renderProductCount(html: any) {
    const countElement = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductCount');
    const count = countElement ? countElement.innerHTML : '';
    const container = document.getElementById('ProductCount');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    if (container) {
      container.innerHTML = count;
      container.classList.remove('loading');
    }
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
    const loadingSpinners = document.querySelectorAll(
      '.facets-container .loading__spinner, custom-facet-filters-form .loading__spinner',
    );
    loadingSpinners.forEach((spinner) => spinner.classList.add('hidden'));
  }

  static renderFilters(html: any, event: any) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
    const facetDetailsElementsFromFetch = parsedHTML.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter',
    );
    const facetDetailsElementsFromDom = document.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter',
    );

    // Remove facets that are no longer returned from the server
    Array.from(facetDetailsElementsFromDom).forEach((currentElement) => {
      if (
        !Array.from(facetDetailsElementsFromFetch).some(
          ({ id }) => currentElement.id === id,
        )
      ) {
        currentElement.remove();
      }
    });

    const matchesId = (element: any) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.id === jsFilter.id : false;
    };

    const facetsToRender = Array.from(facetDetailsElementsFromFetch).filter(
      (element) => !matchesId(element),
    );
    const countsToRender = Array.from(facetDetailsElementsFromFetch).find(
      matchesId,
    );

    facetsToRender.forEach((elementToRender, index) => {
      const currentElement = document.getElementById(elementToRender.id);
      // Element already rendered in the DOM so just update the innerHTML
      if (currentElement) {
        const elementToUpdate = document.getElementById(elementToRender.id);
        if (elementToUpdate) {
          elementToUpdate.innerHTML = elementToRender.innerHTML;
        }
      } else {
        if (index > 0) {
          const { className: previousElementClassName, id: previousElementId } =
            facetsToRender[index - 1];
          // Same facet type (eg horizontal/vertical or drawer/mobile)
          if (elementToRender.className === previousElementClassName) {
            const previousElement = document.getElementById(previousElementId);
            if (previousElement) {
              previousElement.after(elementToRender);
            }
            return;
          }
        }

        if (elementToRender.parentElement) {
          const parentElement = document.querySelector(`#${elementToRender.parentElement.id} .js-filter`);
          if (parentElement) {
            parentElement.before(elementToRender);
          }
        }
      }
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) {
      const closestJSFilterID = event.target.closest('.js-filter').id;

      if (closestJSFilterID) {
        FacetFiltersForm.renderCounts(
          countsToRender,
          event.target.closest('.js-filter'),
        );
        FacetFiltersForm.renderMobileCounts(
          countsToRender,
          document.getElementById(closestJSFilterID),
        );

        const newFacetDetailsElement =
          document.getElementById(closestJSFilterID);
        const newElementSelector = newFacetDetailsElement?.classList.contains(
          'mobile-facets__details',
        )
          ? `.mobile-facets__close-button`
          : `.facets__summary`;
        const newElementToActivate: HTMLElement | null | undefined =
          newFacetDetailsElement?.querySelector(newElementSelector);

        const isTextInput = event.target.getAttribute('type') === 'text';

        if (newElementToActivate && !isTextInput) newElementToActivate.focus();
      }
    }
  }

  static renderActiveFacets(html: any) {
    const activeFacetElementSelectors = [
      '.active-facets-mobile',
      '.active-facets-desktop',
    ];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        targetElement.innerHTML = activeFacetsElement.innerHTML;
      }
    });

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html: any) {
    const mobileElementSelectors = [
      '.mobile-facets__open',
      '.mobile-facets__count',
      '.sorting',
    ];

    mobileElementSelectors.forEach((selector) => {
      const targetElement = document.querySelector(selector);
      const sourceElement = html.querySelector(selector);
      if (targetElement && sourceElement) {
        targetElement.innerHTML = sourceElement.innerHTML;
      }
    });

    // @ts-ignore
    const menuDrawerElement = document
      .getElementById('FacetFiltersFormMobile')
      ?.closest('menu-drawer') as any;
    menuDrawerElement?.bindEvents();
  }

  static renderCounts(source: any, target: any) {
    const targetSummary = target.querySelector('.facets__summary');
    const sourceSummary = source.querySelector('.facets__summary');

    if (sourceSummary && targetSummary) {
      targetSummary.outerHTML = sourceSummary.outerHTML;
    }

    const targetHeaderElement = target.querySelector('.facets__header');
    const sourceHeaderElement = source.querySelector('.facets__header');

    if (sourceHeaderElement && targetHeaderElement) {
      targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML;
    }

    const targetWrapElement = target.querySelector('.facets-wrap');
    const sourceWrapElement = source.querySelector('.facets-wrap');

    if (sourceWrapElement && targetWrapElement) {
      const isShowingMore = Boolean(
        target.querySelector('show-more-button .label-show-more.hidden'),
      );
      if (isShowingMore) {
        sourceWrapElement
          .querySelectorAll('.facets__item.hidden')
          .forEach((hiddenItem: any) =>
            hiddenItem.classList.replace('hidden', 'show-more-item'),
          );
      }

      targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
    }
  }

  static renderMobileCounts(source: any, target: any) {
    const targetFacetsList = target.querySelector('.mobile-facets__list');
    const sourceFacetsList = source.querySelector('.mobile-facets__list');

    if (sourceFacetsList && targetFacetsList) {
      targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
    }
  }

  static updateURLHash(searchParams: any) {
    history.pushState(
      { searchParams },
      '',
      `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`,
    );
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid')?.dataset.id,
      },
    ];
  }

  createSearchParams(form: any) {
    const formData = new FormData(form);
    return new URLSearchParams(formData as any).toString();
  }

  onSubmitForm(searchParams: any, event: any) {
    FacetFiltersForm.renderPage(searchParams, event);
  }

  onSubmitHandler(event: any) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll(
      'custom-facet-filters-form form',
    );
    if (event.srcElement.className == 'mobile-facets__checkbox') {
      const searchParams = this.createSearchParams(
        event.target.closest('form'),
      );
      this.onSubmitForm(searchParams, event);
    } else {
      const forms: any[] = [];
      const isMobile =
        event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach((form) => {
        if (!isMobile) {
          if (
            form.id === 'FacetSortForm' ||
            form.id === 'FacetFiltersForm' ||
            form.id === 'FacetSortDrawerForm'
          ) {
            forms.push(this.createSearchParams(form));
          }
        } else if (form.id === 'FacetFiltersFormMobile') {
          forms.push(this.createSearchParams(form));
        }
      });
      this.onSubmitForm(forms.join('&'), event);
    }
  }

  onActiveFilterClick(event: any) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url =
      event.currentTarget.href.indexOf('?') == -1
        ? ''
        : event.currentTarget.href.slice(
            event.currentTarget.href.indexOf('?') + 1,
          );
    FacetFiltersForm.renderPage(url);
  }
}
