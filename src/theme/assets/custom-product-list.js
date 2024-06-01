document
  .querySelectorAll('.custom_cllection_main .product_list')
  .forEach((item) => {
    item.addEventListener('click', function () {
      if (item.classList.contains('opened')) {
        this.closest('.product_list_main').querySelector(
          '.product_list_content',
        ).style.display = 'none';
        item.classList.remove('opened');
      } else {
        this.closest('.product_list_main').querySelector(
          '.product_list_content',
        ).style.display = 'block';
        item.classList.add('opened');
      }
    });
  });
