import { ProductInfo } from './product-info';


function main() {
  if (!customElements.get('custom-product-info')) {
    customElements.define('custom-product-info', ProductInfo);
  }
  console.log(customElements);
}

main();