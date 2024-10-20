/**
 * Adapted from facets.js
 */
export class PriceRange extends HTMLElement {
  constructor() {
    super();

    const rangeInputs = document.querySelectorAll<HTMLInputElement>(
      '.price_rang_slider input[type="range"]',
    );
    const range1 = rangeInputs[0];
    const range2 = rangeInputs[1];

    function formatMoney(amount: number, currencySymbol = '$') {
      const formattedAmount = (amount / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return `${currencySymbol}${formattedAmount}`;
    }

    range1.addEventListener('input', function () {
      // @ts-ignore
      this.value = Math.min(this.value, range2.value - 10).toString();
      // @ts-ignore
      this.closest('.facets__display-vertical')?.querySelector(
        '.price_min_text',
      )?.innerHTML = formatMoney(Number(this.value) * 100);
      updateSlider();
    });

    range2.addEventListener('input', function () {
      // @ts-ignore
      this.value = Math.max(this.value, Number(range1.value) - -10).toString();
      // @ts-ignore
      this.closest('.facets__display-vertical')?.querySelector(
        '.price_max_text',
      )?.innerHTML = formatMoney(Number(this.value) * 100);
      updateSlider();
    });

    function updateSlider() {
      document
        .querySelector<HTMLInputElement>('.facets__price .input_min')
        ?.setAttribute('value', range1.value);
      document
        .querySelector<HTMLInputElement>('.facets__price .input_max')
        ?.setAttribute('value', range2.value);
    }

    updateSlider();

    this.querySelectorAll<HTMLInputElement>('input').forEach((element) => {
      element.addEventListener('change', this.onRangeChange.bind(this));
      element.addEventListener('keydown', this.onKeyDown.bind(this));
    });
    this.setMinAndMaxValues();
  }

  onRangeChange(event: Event) {
    this.adjustToValidValues(event.currentTarget as HTMLInputElement);
    this.setMinAndMaxValues();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.metaKey) return;

    const pattern =
      /[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/;
    if (!event.key.match(pattern)) event.preventDefault();
  }

  setMinAndMaxValues() {
    const inputs = this.querySelectorAll<HTMLInputElement>('input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    if (maxInput.value) minInput.setAttribute('data-max', maxInput.value);
    if (minInput.value) maxInput.setAttribute('data-min', minInput.value);
    if (minInput.value === '') maxInput.setAttribute('data-min', '0');
    if (maxInput.value === '')
      minInput.setAttribute(
        'data-max',
        minInput.getAttribute('data-max') || '',
      );
  }

  adjustToValidValues(input: HTMLInputElement) {
    const value = Number(input.value);
    const min = Number(input.getAttribute('data-min'));
    const max = Number(input.getAttribute('data-max'));

    if (value < min) input.value = min.toString();
    if (value > max) input.value = max.toString();
  }
}
