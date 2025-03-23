import { isNil } from 'rambda';
import { useFetchCollectionByHandle, useFetchProductByHandle } from '../../shared/hooks/product';
import { classNames } from '../../shared/utils/dom';

export function Breadcrumbs() {
  const productHandle = window.location.pathname.includes('product')
    ? (window.location.pathname.split('/').pop() ?? null)
    : null;
  const collectionHandle = window.location.pathname.includes('collections')
    ? (window.location.pathname.split('/').pop() ?? null)
    : null;
  return (
    <div className="page-width">
      <div className="tw-my-8">
        <BreadcrumbNavigation collectionHandle={collectionHandle} productHandle={productHandle} />
      </div>
    </div>
  );
}

interface BreadcrumbNavigationProp {
  productHandle: string | null;
  collectionHandle: string | null;
}

interface Crumb {
  name: string;
  href: string;
}

function BreadcrumbNavigation({ productHandle, collectionHandle }: BreadcrumbNavigationProp) {
  const { product } = useFetchProductByHandle(productHandle);
  const { collection } = useFetchCollectionByHandle(collectionHandle);
  const crumbs: Crumb[] = [{ name: 'Home', href: '/' }];
  if (!isNil(product)) {
    // Extract the collection, to build the first crumb.
    const collectionNode = product?.collections?.edges[0]?.node;
    if (!isNil(collectionNode)) {
      crumbs.push({
        name: collectionNode.title,
        href: `/collections/${collectionNode.handle}`,
      });
    }
    crumbs.push({
      name: product.title,
      href: `/product/${product.handle}`,
    });
  }
  if (!isNil(collection)) {
    crumbs.push({
      name: collection.title,
      href: `/collections/${collection.handle}`,
    });
  }

  // Various pages
  if (window.location.pathname.includes('complete-your-engagement-ring')) {
    crumbs.push({
      name: 'Complete Your Engagement Ring',
      href: '#'
    });
  }

  return (
    crumbs.length > 1 && (
      <nav aria-label="Breadcrumb" className="tw-flex">
        <ol role="list" className="tw-flex tw-items-center tw-space-x-2">
          {crumbs.map((crumb, idx) => (
            <li key={crumb.name}>
              <div className="tw-flex tw-items-center">
                {idx !== 0 && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="tw-size-6">
                    <path
                      fillRule="evenodd"
                      d="M15.256 3.042a.75.75 0 0 1 .449.962l-6 16.5a.75.75 0 1 1-1.41-.513l6-16.5a.75.75 0 0 1 .961-.449Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <a
                  href={crumb.href}
                  className={classNames(
                    'tw-font-medium tw-text-[12px] hover:tw-text-gray-700 hover:tw-underline',
                    idx === crumbs.length - 1 ? 'tw-underline' : '',
                    idx !== 0 ? 'tw-ml-2' : ''
                  )}
                >
                  {crumb.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    )
  );
}
