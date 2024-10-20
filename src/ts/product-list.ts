export class ProductList {
  constructor() {}

  setupListeners() {
    document
      .querySelectorAll('.custom_cllection_main .product_list')
      .forEach((item) => {
        item.addEventListener('click', function () {
          if (item.classList.contains('opened')) {
            const productContent = item
              .closest('.product_list_main')
              ?.querySelector('.product_list_content') as HTMLElement;
            if (productContent) {
              productContent.style.display = 'none';
            }
            item.classList.remove('opened');
          } else {
            const productContent = item
              .closest('.product_list_main')
              ?.querySelector('.product_list_content') as HTMLElement;
            if (productContent) {
              productContent.style.display = 'block';
            }
            item.classList.add('opened');
          }
        });
      });
  }
}

new ProductList().setupListeners();
