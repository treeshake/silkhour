import DOMPurify from 'dompurify';
import { RingBuilderService } from '../engagement-ring/services';

type PaginationPart = {
  title: number | string;
  url?: string;
  is_link: boolean;
};

type Pagination = {
  current_offset: number;
  current_page: number;
  items: number;
  page_size: number;
  parts: PaginationPart[];
  next?: PaginationPart;
  previous?: PaginationPart;
  pages: number;
};

interface PaginationProps {
  paginate: Pagination;
  icon_caret_svg: string;
  aria_label_previous: string;
  aria_label_next: string;
  aria_label_page: string;
  anchor?: string;
}

/**
 * This is a clone of the Pagination component from liquid, but fixes issue with URL parameters resetting on the pagination <a> tags.
 */
export function Pagination({
  paginate,
  icon_caret_svg: iconCaretSvg,
  aria_label_previous: ariaLabelPrevious,
  aria_label_next: ariaLabelNext,
  aria_label_page: ariaLabelPage,
  anchor,
}: PaginationProps) {
  const sanitizedIconCaretSvg = DOMPurify.sanitize(iconCaretSvg);

  // Get the URL parameters,, this wasn't possible in the shopify liquid version.
  // Note that we don't need the product variant as this is an inbuilt type that shopify recognizes and
  // does NOT strip.
  const ring = new RingBuilderService();
  const ringParams = ring.reconstructURL().toString();
  return (
    <ul className="pagination__list list-unstyled" role="list">
      {paginate.previous && (
        <li>
          <a
            href={`${paginate.previous.url}&${ringParams}${anchor}`}
            className="pagination__item pagination__item--next pagination__item-arrow link motion-reduce"
            aria-label={ariaLabelPrevious}
          >
            <span
              className="svg-wrapper"
              dangerouslySetInnerHTML={{
                __html: sanitizedIconCaretSvg,
              }}
            />
          </a>
        </li>
      )}
      {paginate.parts.map((part, index) => {
        const sanitizedPartTitle = DOMPurify.sanitize(part.title.toString());
        return (
          <li key={index}>
            {part.is_link ? (
              <a
                href={`${part.url}&${ringParams}${anchor}`}
                className="pagination__item link"
                aria-label={`${ariaLabelPage} ${part.title}`}
                dangerouslySetInnerHTML={{
                  __html: sanitizedPartTitle,
                }}
              />
            ) : part.title === paginate.current_page ? (
              <a
                role="link"
                aria-disabled="true"
                className="pagination__item pagination__item--current light"
                aria-current="page"
                aria-label={`${ariaLabelPage} ${part.title}`}
                dangerouslySetInnerHTML={{
                  __html: sanitizedPartTitle,
                }}
              />
            ) : (
              <span
                className="pagination__item"
                dangerouslySetInnerHTML={{
                  __html: sanitizedPartTitle,
                }}
              />
            )}
          </li>
        );
      })}
      {paginate.next && (
        <li>
          <a
            href={`${paginate.next.url}&${ringParams}${anchor}`}
            className="pagination__item pagination__item--prev pagination__item-arrow link motion-reduce"
            aria-label={ariaLabelNext}
          >
            <span
              className="svg-wrapper"
              dangerouslySetInnerHTML={{
                __html: sanitizedIconCaretSvg,
              }}
            />
          </a>
        </li>
      )}
    </ul>
  );
}
